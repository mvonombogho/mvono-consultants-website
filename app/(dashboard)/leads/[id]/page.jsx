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