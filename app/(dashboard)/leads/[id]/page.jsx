              
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