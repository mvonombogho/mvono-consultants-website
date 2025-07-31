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
        items: true
      }
    });

    if (!invoice) {
      return new NextResponse('Invoice not found', { status: 404 });
    }

    if (!invoice.client.email) {
      return new NextResponse('Client has no email address', { status: 400 });
    }

    // Compose email subject and body
    const subject = `Invoice #${invoice.invoiceNumber} from Mvono Consultants`;
    
    // Create a simple HTML representation of the invoice
    // In a real implementation, you would use a proper HTML template
    const invoiceTable = `
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Unit Price</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Amount</th>
        </tr>
        ${invoice.items.map(item => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.description}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">KES ${item.unitPrice.toFixed(2)}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">KES ${item.amount.toFixed(2)}</td>
          </tr>
        `).join('')}
        <tr>
          <td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>Subtotal:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">KES ${invoice.subtotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>Tax:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">KES ${invoice.taxAmount.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>Total:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>KES ${invoice.totalAmount.toFixed(2)}</strong></td>
        </tr>
      </table>
    `;

    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <h2>Invoice #${invoice.invoiceNumber}</h2>
        <p>Dear ${invoice.client.name},</p>
        
        ${customMessage ? `<p>${customMessage}</p>` : `<p>Please find attached your invoice from Mvono Consultants. The invoice is due on ${new Date(invoice.dueDate).toLocaleDateString()}.`}
        
        <div style="margin: 20px 0;">
          <h3>Invoice Details</h3>
          <p><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</p>
          <p><strong>Issue Date:</strong> ${new Date(invoice.issueDate).toLocaleDateString()}</p>
          <p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
          ${invoice.lpoReference ? `<p><strong>LPO Reference:</strong> ${invoice.lpoReference}</p>` : ''}
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Items</h3>
          ${invoiceTable}
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Payment Information</h3>
          <p>Please make payment to the following account:</p>
          <p><strong>Bank:</strong> [Bank Name]</p>
          <p><strong>Account Name:</strong> Mvono Consultants</p>
          <p><strong>Account Number:</strong> [Account Number]</p>
        </div>
        
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
        messageType: 'invoice',
        clientId: invoice.clientId,
        senderId: session.user.id,
        sentDate: new Date()
      }
    });

    // Update invoice status to 'sent' if it was in draft
    if (invoice.status === 'draft') {
      await prisma.invoice.update({
        where: {
          id: invoiceId
        },
        data: {
          status: 'sent'
        }
      });
    }

    // In a real implementation, this would integrate with an email service
    // For now, we'll just simulate the email sending and return success
    // TODO: Implement actual email sending with a service like SendGrid, Mailgun, etc.

    return NextResponse.json({
      success: true,
      message: 'Invoice email sent',
      emailMessage
    });
  } catch (error) {
    console.error('[INVOICE_EMAIL_SEND]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
