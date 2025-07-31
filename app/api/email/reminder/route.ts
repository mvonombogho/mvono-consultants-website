import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { invoiceId, customMessage } = body;

    if (!invoiceId) {
      return new NextResponse('Invoice ID is required', { status: 400 });
    }

    // Get invoice details
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: invoiceId
      },
      include: {
        client: true,
        payments: true
      }
    });

    if (!invoice) {
      return new NextResponse('Invoice not found', { status: 404 });
    }

    if (!invoice.client.email) {
      return new NextResponse('Client has no email address', { status: 400 });
    }

    // Calculate amount paid and balance
    const totalPaid = invoice.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const balance = invoice.totalAmount - totalPaid;

    if (balance <= 0) {
      return new NextResponse('Invoice is already fully paid', { status: 400 });
    }

    // Compose email subject and body
    const subject = `Payment Reminder: Invoice #${invoice.invoiceNumber}`;
    
    // Check if invoice is overdue
    const now = new Date();
    const dueDate = new Date(invoice.dueDate);
    const isOverdue = now > dueDate;
    
    const overdueText = isOverdue 
      ? `This invoice is overdue by ${Math.ceil((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))} days.` 
      : `This invoice is due on ${dueDate.toLocaleDateString()}.`;

    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <h2>Payment Reminder for Invoice #${invoice.invoiceNumber}</h2>
        <p>Dear ${invoice.client.name},</p>
        
        ${customMessage ? `<p>${customMessage}</p>` : `
        <p>This is a friendly reminder regarding the outstanding balance on invoice #${invoice.invoiceNumber}.</p>
        <p>${overdueText}</p>
        `}
        
        <div style="margin: 20px 0;">
          <h3>Payment Summary</h3>
          <p><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</p>
          <p><strong>Issue Date:</strong> ${new Date(invoice.issueDate).toLocaleDateString()}</p>
          <p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
          <p><strong>Total Amount:</strong> KES ${invoice.totalAmount.toFixed(2)}</p>
          <p><strong>Amount Paid:</strong> KES ${totalPaid.toFixed(2)}</p>
          <p><strong>Balance Due:</strong> KES ${balance.toFixed(2)}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Payment Information</h3>
          <p>Please make payment to the following account:</p>
          <p><strong>Bank:</strong> [Bank Name]</p>
          <p><strong>Account Name:</strong> Mvono Consultants</p>
          <p><strong>Account Number:</strong> [Account Number]</p>
        </div>
        
        <p>If you have already made the payment, please disregard this reminder.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        
        <p>Thank you for your business,</p>
        <p>Mvono Consultants</p>
      </div>
    `;

    // Create email message record
    const emailMessage = await prisma.emailMessage.create({
      data: {
        subject,
        body: emailBody,
        status: 'sent',
        messageType: 'reminder',
        clientId: invoice.clientId,
        senderId: session.user.id,
        sentDate: new Date()
      }
    });

    // In a real implementation, this would integrate with an email service
    // For now, we'll just simulate the email sending and return success
    // TODO: Implement actual email sending with a service like SendGrid, Mailgun, etc.

    return NextResponse.json({
      success: true,
      message: 'Payment reminder email sent',
      emailMessage
    });
  } catch (error) {
    console.error('[PAYMENT_REMINDER_SEND]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
