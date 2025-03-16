                
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