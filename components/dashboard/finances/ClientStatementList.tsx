"use client";

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, Download, Send, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

type ClientStatement = {
  id: string;
  clientId: string;
  clientName: string;
  statementNumber: string;
  date: Date;
  startDate: Date;
  endDate: Date;
  balance: number;
  status: 'paid' | 'overdue' | 'current';
};

type Props = {
  clients: any[];
};

export default function ClientStatementList({ clients }: Props) {
  const [selectedStatements, setSelectedStatements] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Mock data for statements - in a real app this would come from the API
  const statements: ClientStatement[] = [
    {
      id: 'stmt-1',
      clientId: clients[0]?.id || 'client-1',
      clientName: clients[0]?.name || 'Acme Corporation',
      statementNumber: 'STMT-2025-0042',
      date: new Date(),
      startDate: new Date(2025, 1, 1),
      endDate: new Date(2025, 1, 28),
      balance: 2300.00,
      status: 'current',
    },
    {
      id: 'stmt-2',
      clientId: clients[1]?.id || 'client-2',
      clientName: clients[1]?.name || 'Globex Inc',
      statementNumber: 'STMT-2025-0041',
      date: new Date(2025, 1, 20),
      startDate: new Date(2025, 0, 1),
      endDate: new Date(2025, 0, 31),
      balance: 4750.50,
      status: 'overdue',
    },
    {
      id: 'stmt-3',
      clientId: clients[2]?.id || 'client-3',
      clientName: clients[2]?.name || 'Initech LLC',
      statementNumber: 'STMT-2025-0038',
      date: new Date(2025, 1, 12),
      startDate: new Date(2024, 11, 1),
      endDate: new Date(2024, 11, 31),
      balance: 0.00,
      status: 'paid',
    },
  ];

  const toggleSelectAll = () => {
    if (selectedStatements.length === statements.length) {
      setSelectedStatements([]);
    } else {
      setSelectedStatements(statements.map(stmt => stmt.id));
    }
  };

  const toggleSelectStatement = (id: string) => {
    if (selectedStatements.includes(id)) {
      setSelectedStatements(selectedStatements.filter(stmtId => stmtId !== id));
    } else {
      setSelectedStatements([...selectedStatements, id]);
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedStatements = [...statements].sort((a, b) => {
    let comparison = 0;
    switch (sortColumn) {
      case 'statementNumber':
        comparison = a.statementNumber.localeCompare(b.statementNumber);
        break;
      case 'clientName':
        comparison = a.clientName.localeCompare(b.clientName);
        break;
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'balance':
        comparison = a.balance - b.balance;
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      default:
        comparison = 0;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleBulkAction = (action: string) => {
    if (selectedStatements.length === 0) {
      toast.error('No statements selected');
      return;
    }

    switch (action) {
      case 'email':
        toast.success(`${selectedStatements.length} statement(s) emailed to clients`);
        break;
      case 'download':
        toast.success(`${selectedStatements.length} statement(s) downloaded`);
        break;
      default:
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'current':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b transition-colors bg-muted/50">
                  <th className="h-12 px-4">
                    <Checkbox
                      checked={selectedStatements.length === statements.length}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all statements"
                    />
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('statementNumber')}>
                    <div className="flex items-center">
                      Statement #
                      {sortColumn === 'statementNumber' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('clientName')}>
                    <div className="flex items-center">
                      Client
                      {sortColumn === 'clientName' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('date')}>
                    <div className="flex items-center">
                      Generated Date
                      {sortColumn === 'date' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('date')}>
                    <div className="flex items-center">
                      Period
                      {sortColumn === 'period' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium cursor-pointer" onClick={() => handleSort('balance')}>
                    <div className="flex items-center justify-end">
                      Balance
                      {sortColumn === 'balance' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium cursor-pointer" onClick={() => handleSort('status')}>
                    <div className="flex items-center">
                      Status
                      {sortColumn === 'status' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedStatements.map((statement) => (
                  <tr key={statement.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      <Checkbox
                        checked={selectedStatements.includes(statement.id)}
                        onCheckedChange={() => toggleSelectStatement(statement.id)}
                        aria-label={`Select statement ${statement.statementNumber}`}
                      />
                    </td>
                    <td className="p-4 align-middle font-medium">{statement.statementNumber}</td>
                    <td className="p-4 align-middle">{statement.clientName}</td>
                    <td className="p-4 align-middle">{format(new Date(statement.date), 'MMM dd, yyyy')}</td>
                    <td className="p-4 align-middle">
                      {format(new Date(statement.startDate), 'MMM dd')} - {format(new Date(statement.endDate), 'MMM dd, yyyy')}
                    </td>
                    <td className="p-4 align-middle text-right">
                      KES {statement.balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </td>
                    <td className="p-4 align-middle">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(statement.status)}`}>
                        {statement.status.charAt(0).toUpperCase() + statement.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Link href={`/dashboard/finances/statements/${statement.id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => toast.success(`${statement.statementNumber} downloaded`)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast.success(`${statement.statementNumber} emailed to client`)}>
                              <Send className="mr-2 h-4 w-4" />
                              Email to Client
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.print()}>
                              <Download className="mr-2 h-4 w-4" />
                              Print Statement
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedStatements.length > 0 && (
          <div className="flex items-center justify-between py-4 px-4">
            <p className="text-sm text-muted-foreground">
              {selectedStatements.length} of {statements.length} row(s) selected
            </p>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('email')}>
                <Send className="mr-2 h-4 w-4" />
                Email Selected
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('download')}>
                <Download className="mr-2 h-4 w-4" />
                Download Selected
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}