import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, X, Download, Send, Loader2 } from 'lucide-react';
import { ClientStatement } from './types';
import { formatDate, formatCurrency, getStatusColor, calculateAgingSummary } from './utils';

type StatementModalProps = {
  statement: ClientStatement;
  isOpen: boolean;
  onClose: () => void;
  onSend: () => Promise<void>;
  onGeneratePdf: () => void;
  isSending: boolean;
};

export const StatementModal = ({
  statement,
  isOpen,
  onClose,
  onSend,
  onGeneratePdf,
  isSending,
}: StatementModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);

  // Modal animations
  useEffect(() => {
    if (isOpen && modalRef.current && modalBackdropRef.current) {
      // Animate backdrop
      gsap.fromTo(
        modalBackdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Animate modal
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
      );
    }
  }, [isOpen]);

  const closeModal = () => {
    if (modalRef.current && modalBackdropRef.current) {
      // Animate out
      gsap.to(modalRef.current, {
        opacity: 0, y: 20, scale: 0.95, duration: 0.3, ease: "power2.in",
        onComplete: () => {
          onClose();
        }
      });

      gsap.to(modalBackdropRef.current, {
        opacity: 0, duration: 0.3, ease: "power2.in"
      });
    } else {
      onClose();
    }
  };

  return (
    isOpen ? (
      <>
        <div
          ref={modalBackdropRef}
          className="fixed inset-0 bg-black/50 z-50"
          onClick={closeModal}
        />
        <div
          ref={modalRef}
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[90vh] overflow-auto rounded-lg bg-background shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-20 bg-background border-b flex justify-between items-center p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">
                  {statement.client.name} Statement
                </h2>
                <p className="text-sm text-muted-foreground">
                  {formatDate(statement.statementPeriod.from)} - {formatDate(statement.statementPeriod.to)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={closeModal}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-6">
            {/* Client Info */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Client Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="font-medium">{statement.client.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{statement.client.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium">{statement.client.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contact Person</p>
                  <p className="font-medium">{statement.client.contactPerson || 'N/A'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Address</p>
                  <p className="font-medium">{statement.client.address || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Statement Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Statement Summary</h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y border-b">
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Statement Date</p>
                    <p className="font-medium">{formatDate(statement.generatedDate)}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Opening Balance</p>
                    <p className="font-medium">
                      {formatCurrency(statement.openingBalance, statement.currency)}
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Closing Balance</p>
                    <p className="font-medium">
                      {formatCurrency(statement.closingBalance, statement.currency)}
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Total Due</p>
                    <p className={`font-bold ${statement.totalDue > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {formatCurrency(statement.totalDue, statement.currency)}
                    </p>
                  </div>
                </div>
                
                {statement.totalDue > 0 && (
                  <div className="p-4 bg-muted/30">
                    <h4 className="text-sm font-medium mb-2">Aging Summary</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {Object.entries(calculateAgingSummary(statement)).map(([age, amount]) => (
                        <div key={age} className="bg-background rounded p-2 text-center">
                          <p className="text-xs text-muted-foreground mb-1">{age === 'current' ? 'Current' : age}</p>
                          <p className={`text-sm font-medium ${amount > 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                            {formatCurrency(amount, statement.currency)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Invoices */}
            <div>
              <h3 className="text-lg font-medium mb-3">Invoice Details</h3>
              <div className="border rounded-lg overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Invoice Number</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Due Date</th>
                      <th className="text-right p-3 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-right p-3 text-sm font-medium text-muted-foreground">Paid</th>
                      <th className="text-right p-3 text-sm font-medium text-muted-foreground">Balance</th>
                      <th className="text-center p-3 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {statement.invoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-3 text-sm font-medium">{invoice.invoiceNumber}</td>
                        <td className="p-3 text-sm">{formatDate(invoice.date)}</td>
                        <td className="p-3 text-sm">{formatDate(invoice.dueDate)}</td>
                        <td className="p-3 text-sm text-right">
                          {formatCurrency(invoice.amount, statement.currency)}
                        </td>
                        <td className="p-3 text-sm text-right">
                          {formatCurrency(invoice.paid, statement.currency)}
                        </td>
                        <td className="p-3 text-sm font-medium text-right">
                          {formatCurrency(invoice.amount - invoice.paid, statement.currency)}
                        </td>
                        <td className="p-3 text-center">
                          <Badge 
                            variant="secondary"
                            className={`${getStatusColor(invoice.status)} capitalize text-xs`}
                          >
                            {invoice.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                    
                    {/* Totals Row */}
                    <tr className="bg-muted/30 font-medium">
                      <td colSpan={3} className="p-3 text-sm text-right">Totals:</td>
                      <td className="p-3 text-sm text-right">
                        {formatCurrency(
                          statement.invoices.reduce((sum, inv) => sum + inv.amount, 0),
                          statement.currency
                        )}
                      </td>
                      <td className="p-3 text-sm text-right">
                        {formatCurrency(
                          statement.invoices.reduce((sum, inv) => sum + inv.paid, 0),
                          statement.currency
                        )}
                      </td>
                      <td className="p-3 text-sm font-medium text-right">
                        {formatCurrency(
                          statement.invoices.reduce((sum, inv) => sum + (inv.amount - inv.paid), 0),
                          statement.currency
                        )}
                      </td>
                      <td className="p-3"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="sticky bottom-0 p-4 border-t bg-background flex justify-between items-center gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={onGeneratePdf}
            >
              <Download className="h-4 w-4" /> Download PDF
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="gap-2"
                onClick={closeModal}
              >
                Cancel
              </Button>
              {statement.status === 'draft' && (
                <Button
                  className="gap-2 bg-primary text-white hover:bg-primary/90"
                  onClick={onSend}
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Statement
                    </>
                  )}
                </Button>
              )}
              {statement.status === 'sent' && (
                <Button
                  className="gap-2 bg-primary text-white hover:bg-primary/90"
                  onClick={onSend}
                >
                  <Send className="h-4 w-4" /> Resend
                </Button>
              )}
            </div>
          </div>
        </div>
      </>
    ) : null
  );
};
