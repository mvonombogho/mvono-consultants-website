      
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