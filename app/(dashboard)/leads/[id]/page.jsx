              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleteLoading}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteLead}
                  disabled={deleteLoading}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {deleteLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Basic Info Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Lead Information</CardTitle>
              <CardDescription>Basic information about this lead.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Contact Details</h3>
                    <div className="space-y-2">
                      {lead.email && (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`mailto:${lead.email}`} className="text-sm hover:underline">
                            {lead.email}
                          </a>
                        </div>
                      )}
                      
                      {lead.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={`tel:${lead.phone}`} className="text-sm hover:underline">
                            {lead.phone}
                          </a>
                        </div>
                      )}
                      
                      {lead.company && (
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{lead.company}</span>
                        </div>
                      )}
                      
                      {lead.industry && (
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{lead.industry}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Lead Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Source: {formatSource(lead.source)}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm flex items-center">
                          Priority: {formatPriority(lead.priority)}
                        </span>
                      </div>
                      
                      {lead.estimatedValue && (
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">
                            Estimated Value: {formatCurrency(lead.estimatedValue, 'KES')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Assignment & Dates</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          Assigned to: {lead.assignedTo ? lead.assignedTo.name : 'Unassigned'}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          Created: {formatDate(lead.createdAt)}
                        </span>
                      </div>
                      
                      {lead.lastContact && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">
                            Last Contact: {formatDate(lead.lastContact)}
                          </span>
                        </div>
                      )}
                      
                      {lead.nextContactDate && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">
                            Next Contact: {formatDate(lead.nextContactDate)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {lead.notes && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes</h3>
                    <p className="text-sm whitespace-pre-wrap">{lead.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4">
              {lead.status !== 'converted' && lead.status !== 'closed-lost' && (
                <ConvertToClientDialog
                  lead={lead}
                  onLeadUpdated={handleLeadUpdated}
                />
              )}
            </CardFooter>
          </Card>
          
          {/* Recent Activities Card */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Recent interactions with this lead.</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveTab('activities')}
              >
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {lead.activities && lead.activities.length > 0 ? (
                <div className="divide-y">
                  {lead.activities.slice(0, 3).map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground mb-4">No activities recorded yet</p>
                  <NewActivityDialog leadId={lead.id} onActivityCreated={handleActivityCreated} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activities" className="space-y-6">
          {/* Activities Tab Content */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>
                  All interactions with this lead in chronological order.
                </CardDescription>
              </div>
              <NewActivityDialog leadId={lead.id} onActivityCreated={handleActivityCreated} />
            </CardHeader>
            <CardContent>
              {lead.activities && lead.activities.length > 0 ? (
                <div className="divide-y">
                  {lead.activities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground mb-4">No activities recorded yet</p>
                  <NewActivityDialog leadId={lead.id} onActivityCreated={handleActivityCreated} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadDetailPage;