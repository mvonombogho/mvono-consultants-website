// Main Component
const LeadDetailPage = ({ params }) => {
  const router = useRouter();
  const [lead, setLead] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch lead data
  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/leads/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            toast.error('Lead not found');
            router.push('/leads');
            return;
          }
          throw new Error('Failed to fetch lead');
        }
        
        const data = await response.json();
        setLead(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchLead();
    fetchUsers();
  }, [params.id, router]);

  const handleActivityCreated = (newActivity) => {
    setLead((prevLead) => ({
      ...prevLead,
      activities: [newActivity, ...prevLead.activities],
    }));
  };

  const handleLeadUpdated = (updatedLead) => {
    setLead(updatedLead);
  };

  const handleDeleteLead = async () => {
    try {
      setDeleteLoading(true);
      const response = await fetch(`/api/leads/${params.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete lead');
      }
      
      toast.success('Lead deleted successfully');
      router.push('/leads');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const formatPriority = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <span className="text-muted-foreground">None</span>;
    }
  };

  const formatSource = (source) => {
    return source
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-bold">Lead not found</h2>
        <Button onClick={() => router.push('/leads')}>Back to Leads</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push('/leads')}
            className="h-8 w-8 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold leading-tight">{lead.name}</h1>
          <LeadStatusBadge status={lead.status} />
        </div>
        
        <div className="flex items-center space-x-2">
          <EditLeadDialog 
            lead={lead} 
            users={users} 
            onLeadUpdated={handleLeadUpdated} 
          />
          
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will permanently delete this lead and all its activities.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
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