import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Clock, ArrowRight } from 'lucide-react';
import { ClientStatement } from './types';
import { formatDate, formatCurrency, getStatusColor } from './utils';

type StatementCardProps = {
  statement: ClientStatement;
  onClick: (statement: ClientStatement) => void;
};

export const StatementCard = ({ statement, onClick }: StatementCardProps) => {
  return (
    <Card
      key={statement.id}
      className="overflow-hidden group hover:border-primary/40 transition-all duration-300"
      onClick={() => onClick(statement)}
    >
      <div className="cursor-pointer">
        <CardHeader className="bg-muted/30 px-5 py-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-base font-medium">
                  {statement.client.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground truncate max-w-xs">
                  {statement.client.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={`${getStatusColor(statement.status)} capitalize`}
              >
                {statement.status}
              </Badge>
              {statement.invoices.some(inv => inv.status === 'overdue') && (
                <Badge
                  variant="secondary"
                  className="bg-red-100 text-red-800"
                >
                  Overdue
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                <Clock className="h-3.5 w-3.5" />
                <span>Statement Period:</span>
              </div>
              <p className="text-sm font-medium">
                {formatDate(statement.statementPeriod.from)} - {formatDate(statement.statementPeriod.to)}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Opening Balance</span>
              <span className="font-medium">{formatCurrency(statement.openingBalance, statement.currency)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Closing Balance</span>
              <span className="font-medium">{formatCurrency(statement.closingBalance, statement.currency)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t mt-2">
              <span className="text-sm font-medium">Total Due</span>
              <span className={`font-bold ${statement.totalDue > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {formatCurrency(statement.totalDue, statement.currency)}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-5 py-3 bg-muted/20 flex justify-between">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{statement.invoices.length} invoice(s)</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1 text-primary hover:text-primary hover:bg-primary/5 -mr-2"
            onClick={(e) => {
              e.stopPropagation();
              onClick(statement);
            }}
          >
            View Details <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
