// UI Render Components for ClientStatements

export const ClientStatementsUI = () => {
  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Client Statements</h1>
          <p className="text-muted-foreground mt-1">
            Manage and generate statements for your clients
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push('/admin/finance/create-statement')}
            className="bg-primary hover:bg-primary/90 text-white transition-all"
          >
            <FileText className="mr-2 h-4 w-4" />
            New Statement
          </Button>
        </div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="space-y-4">
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
            <TabsList className="bg-muted/60">
              <TabsTrigger value="all" className="relative overflow-hidden transition-all group">
                <span className="relative z-10">All Statements</span>
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-data-[state=active]:translate-y-0 transition-transform duration-300"></div>
              </TabsTrigger>
              <TabsTrigger value="draft" className="relative overflow-hidden transition-all group">
                <span className="relative z-10">Drafts</span>
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-data-[state=active]:translate-y-0 transition-transform duration-300"></div>
              </TabsTrigger>
              <TabsTrigger value="sent" className="relative overflow-hidden transition-all group">
                <span className="relative z-10">Sent</span>
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-data-[state=active]:translate-y-0 transition-transform duration-300"></div>
              </TabsTrigger>
              <TabsTrigger value="overdue" className="relative overflow-hidden transition-all group">
                <span className="relative z-10">With Overdue</span>
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-data-[state=active]:translate-y-0 transition-transform duration-300"></div>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search statements..."
                  className="pl-8 bg-background pr-4 focus-visible:ring-primary/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="border-muted-foreground/20"
              >
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div
            ref={filtersRef}
            className="overflow-hidden h-0 opacity-0"
          >
            <div className="bg-background rounded-lg border p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="allPaid">Fully Paid</SelectItem>
                    <SelectItem value="partiallyPaid">Partially Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Period</label>
                <Select value={periodFilter} onValueChange={setPeriodFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Time</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end col-span-1 sm:col-span-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStatusFilter('');
                    setPeriodFilter('');
                  }}
                  className="flex-1 gap-1 text-sm"
                >
                  <RefreshCcw className="h-3.5 w-3.5" /> Reset Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Statements List */}
          <TabsContent value="all" className="mt-0">
            <div ref={containerRef} className="space-y-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                  <p className="text-muted-foreground">Loading statements...</p>
                </div>
              ) : filteredStatements.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-muted/30 rounded-lg border border-dashed">
                  <FileText className="h-10 w-10 text-muted-foreground/60 mb-3" />
                  <h3 className="text-lg font-medium mb-1">No statements found</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-4">
                    {searchTerm || statusFilter || periodFilter
                      ? "No statements match your current filters. Try adjusting your search criteria."
                      : "You haven't created any client statements yet."}
                  </p>
                  {!searchTerm && !statusFilter && !periodFilter && (
                    <Button
                      onClick={() => router.push('/admin/finance/create-statement')}
                      className="bg-primary/90 hover:bg-primary text-white transition-all"
                    >
                      <FileText className="mr-2 h-4 w-4" /> Create Your First Statement
                    </Button>
                  )}
                </div>
              ) : (
                filteredStatements.map((statement) => (
                  <Card
                    key={statement.id}
                    className="overflow-hidden group hover:border-primary/40 transition-all duration-300"
                    onClick={() => viewStatement(statement)}
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
                              <Calendar className="h-3.5 w-3.5" />
                              <span>Statement Period:</span>
                            </div>
                            <p className="text-sm font-medium">
                              {formatDate(statement.statementPeriod.from)} - {formatDate(statement.statementPeriod.to)}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                              <Mail className="h-3.5 w-3.5" />
                              <span>Generated:</span>
                            </div>
                            <p className="text-sm font-medium">
                              {formatDate(statement.generatedDate)}
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
                            viewStatement(statement);
                          }}
                        >
                          View Details <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Duplicate the TabsContent for other tabs */}
          <TabsContent value="draft" className="mt-0">
            <div ref={containerRef} className="space-y-4">
              {/* Same content structure as 'all' tab */}
            </div>
          </TabsContent>
          
          <TabsContent value="sent" className="mt-0">
            <div ref={containerRef} className="space-y-4">
              {/* Same content structure as 'all' tab */}
            </div>
          </TabsContent>
          
          <TabsContent value="overdue" className="mt-0">
            <div ref={containerRef} className="space-y-4">
              {/* Same content structure as 'all' tab */}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Statement Modal */}
      {isModalOpen && (
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
            {selectedStatement && (
              <>
                <div className="sticky top-0 z-20 bg-background border-b flex justify-between items-center p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <h2 className="text-lg font-semibold">
                        {selectedStatement.client.name} Statement
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(selectedStatement.statementPeriod.from)} - {formatDate(selectedStatement.statementPeriod.to)}
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
                        <p className="font-medium">{selectedStatement.client.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Email</p>
                        <p className="font-medium">{selectedStatement.client.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Phone</p>
                        <p className="font-medium">{selectedStatement.client.phone || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Contact Person</p>
                        <p className="font-medium">{selectedStatement.client.contactPerson || 'N/A'}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground mb-1">Address</p>
                        <p className="font-medium">{selectedStatement.client.address || 'N/A'}</p>
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
                          <p className="font-medium">{formatDate(selectedStatement.generatedDate)}</p>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-muted-foreground mb-1">Opening Balance</p>
                          <p className="font-medium">
                            {formatCurrency(selectedStatement.openingBalance, selectedStatement.currency)}
                          </p>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-muted-foreground mb-1">Closing Balance</p>
                          <p className="font-medium">
                            {formatCurrency(selectedStatement.closingBalance, selectedStatement.currency)}
                          </p>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-muted-foreground mb-1">Total Due</p>
                          <p className={`font-bold ${selectedStatement.totalDue > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {formatCurrency(selectedStatement.totalDue, selectedStatement.currency)}
                          </p>
                        </div>
                      </div>
                      
                      {selectedStatement.totalDue > 0 && (
                        <div className="p-4 bg-muted/30">
                          <h4 className="text-sm font-medium mb-2">Aging Summary</h4>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {Object.entries(calculateAgingSummary(selectedStatement)).map(([age, amount]) => (
                              <div key={age} className="bg-background rounded p-2 text-center">
                                <p className="text-xs text-muted-foreground mb-1">{age === 'current' ? 'Current' : age}</p>
                                <p className={`text-sm font-medium ${amount > 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                                  {formatCurrency(amount, selectedStatement.currency)}
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
                          {selectedStatement.invoices.map((invoice) => (
                            <tr key={invoice.id} className="hover:bg-muted/30 transition-colors">
                              <td className="p-3 text-sm font-medium">{invoice.invoiceNumber}</td>
                              <td className="p-3 text-sm">{formatDate(invoice.date)}</td>
                              <td className="p-3 text-sm">{formatDate(invoice.dueDate)}</td>
                              <td className="p-3 text-sm text-right">
                                {formatCurrency(invoice.amount, selectedStatement.currency)}
                              </td>
                              <td className="p-3 text-sm text-right">
                                {formatCurrency(invoice.paid, selectedStatement.currency)}
                              </td>
                              <td className="p-3 text-sm font-medium text-right">
                                {formatCurrency(invoice.amount - invoice.paid, selectedStatement.currency)}
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
                                selectedStatement.invoices.reduce((sum, inv) => sum + inv.amount, 0),
                                selectedStatement.currency
                              )}
                            </td>
                            <td className="p-3 text-sm text-right">
                              {formatCurrency(
                                selectedStatement.invoices.reduce((sum, inv) => sum + inv.paid, 0),
                                selectedStatement.currency
                              )}
                            </td>
                            <td className="p-3 text-sm font-medium text-right">
                              {formatCurrency(
                                selectedStatement.invoices.reduce((sum, inv) => sum + (inv.amount - inv.paid), 0),
                                selectedStatement.currency
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
                    onClick={generatePdf}
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
                    {selectedStatement.status === 'draft' && (
                      <Button
                        className="gap-2 bg-primary text-white hover:bg-primary/90"
                        onClick={sendStatement}
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
                    {selectedStatement.status === 'sent' && (
                      <Button
                        className="gap-2 bg-primary text-white hover:bg-primary/90"
                        onClick={() => {
                          toast({
                            title: 'Statement Resent',
                            description: `Statement has been resent to ${selectedStatement.client.name}`,
                          });
                        }}
                      >
                        <Send className="h-4 w-4" /> Resend
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
