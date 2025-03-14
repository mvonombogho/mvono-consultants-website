'use client';

import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, ChevronDown, MoreHorizontal, Search, 
  Download, Filter, Tag, Calendar, DollarSign, ArrowUpRight,
  Clock, CheckCircle, XCircle, Trash2, Edit, Target,
  User, FileText, X, Phone, Mail, Building, AlertCircle,
  MessageSquare, BarChart2, ArrowRight
} from 'lucide-react';
import { gsap } from 'gsap';

// Sample data for the sales pipeline
const SAMPLE_OPPORTUNITIES = [
  {
    id: 1,
    name: "Lafarge Annual Safety Audit",
    client: "Lafarge Kenya",
    value: 450000,
    stage: "PROPOSAL",
    probability: 70,
    expectedCloseDate: "2025-04-15",
    assignedTo: "Donald Mbogho",
    lastActivity: "Sent proposal draft for review",
    lastActivityDate: "2025-03-10",
    notes: "Client is interested in comprehensive safety audit. Need to follow up on the proposal we sent.",
    tags: ["Safety Audit", "Manufacturing"],
    createdAt: "2025-03-01"
  },
  {
    id: 2,
    name: "Radisson Blu Fire Safety Training",
    client: "Radisson Blu Nairobi",
    value: 180000,
    stage: "DISCOVERY",
    probability: 40,
    expectedCloseDate: "2025-05-20",
    assignedTo: "Jane Wanjiku",
    lastActivity: "Initial meeting to discuss requirements",
    lastActivityDate: "2025-03-05",
    notes: "The hotel is looking to train staff on fire safety protocols. Need to schedule a follow-up meeting to discuss specifics.",
    tags: ["Training", "Hospitality"],
    createdAt: "2025-03-02"
  },
  {
    id: 3,
    name: "Tata Chemicals Environmental Assessment",
    client: "Tata Chemicals Magadi",
    value: 750000,
    stage: "NEGOTIATION",
    probability: 85,
    expectedCloseDate: "2025-03-30",
    assignedTo: "Donald Mbogho",
    lastActivity: "Final negotiation on contract terms",
    lastActivityDate: "2025-03-12",
    notes: "Client is eager to begin the environmental assessment. We're finalizing the contract terms.",
    tags: ["Environmental", "Chemical"],
    createdAt: "2025-02-15"
  },
  {
    id: 4,
    name: "KTDA Plant System Audit Package",
    client: "KTDA Holdings",
    value: 980000,
    stage: "WON",
    probability: 100,
    expectedCloseDate: "2025-02-28",
    assignedTo: "Donald Mbogho",
    lastActivity: "Contract signed and implementation scheduled",
    lastActivityDate: "2025-02-28",
    notes: "Comprehensive audit package for 5 tea processing plants. Implementation to begin next month.",
    tags: ["Plant Audit", "Manufacturing", "Food Processing"],
    createdAt: "2025-01-20"
  },
  {
    id: 5,
    name: "Saint Gobain Safety Compliance",
    client: "Saint Gobain Kenya",
    value: 320000,
    stage: "LOST",
    probability: 0,
    expectedCloseDate: "2025-03-10",
    assignedTo: "Jane Wanjiku",
    lastActivity: "Client informed they went with a competitor",
    lastActivityDate: "2025-03-10",
    notes: "They went with a competitor who offered a more competitive price. Need to follow up in 6 months.",
    tags: ["Compliance", "Construction"],
    createdAt: "2025-02-10"
  },
];

// Pipeline stages with their properties
const PIPELINE_STAGES = {
  DISCOVERY: { label: 'Discovery', color: 'bg-blue-500', icon: Search },
  QUALIFICATION: { label: 'Qualification', color: 'bg-indigo-500', icon: Target },
  PROPOSAL: { label: 'Proposal', color: 'bg-yellow-500', icon: Edit },
  NEGOTIATION: { label: 'Negotiation', color: 'bg-orange-500', icon: Clock },
  WON: { label: 'Won', color: 'bg-green-500', icon: CheckCircle },
  LOST: { label: 'Lost', color: 'bg-red-500', icon: XCircle },
};

const SalesPipeline = () => {
  const [opportunities, setOpportunities] = useState(SAMPLE_OPPORTUNITIES);
  const [filteredOpportunities, setFilteredOpportunities] = useState(SAMPLE_OPPORTUNITIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [isAddOpportunityOpen, setIsAddOpportunityOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [newOpportunity, setNewOpportunity] = useState({
    name: '',
    client: '',
    value: '',
    stage: 'DISCOVERY',
    probability: 20,
    expectedCloseDate: '',
    assignedTo: 'Donald Mbogho',
    notes: '',
    tags: []
  });
  const [newActivity, setNewActivity] = useState('');
  
  // For animation
  const stageRefs = {
    DISCOVERY: React.useRef(null),
    QUALIFICATION: React.useRef(null),
    PROPOSAL: React.useRef(null),
    NEGOTIATION: React.useRef(null),
    WON: React.useRef(null),
    LOST: React.useRef(null),
  };
  const detailsRef = React.useRef(null);
  const formRef = React.useRef(null);
  const summaryRef = React.useRef(null);
  
  // This state holds the activity for the selected opportunity
  const [activities, setActivities] = useState([
    {
      id: 1,
      opportunityId: 1,
      date: "2025-03-10",
      type: "NOTE",
      content: "Sent proposal draft for review",
      user: "Donald Mbogho"
    },
    {
      id: 2,
      opportunityId: 1,
      date: "2025-03-08",
      type: "STAGE_CHANGE",
      content: "Moved from Discovery to Proposal",
      user: "Donald Mbogho"
    },
    {
      id: 3,
      opportunityId: 1,
      date: "2025-03-02",
      type: "CREATED",
      content: "Opportunity created",
      user: "Donald Mbogho"
    }
  ]);

  useEffect(() => {
    // Animate in the pipeline stages and summary when component mounts
    gsap.fromTo(
      Object.values(stageRefs).map(ref => ref.current),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
    );

    gsap.fromTo(
      summaryRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.4 }
    );
  }, []);

  useEffect(() => {
    // Filter opportunities based on search term and stage filter
    let results = opportunities;
    
    if (searchTerm) {
      results = results.filter(opp => 
        opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.notes.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (stageFilter !== 'ALL') {
      results = results.filter(opp => opp.stage === stageFilter);
    }
    
    setFilteredOpportunities(results);
  }, [searchTerm, stageFilter, opportunities]);

  // Calculate pipeline metrics
  const pipelineMetrics = {
    totalValue: opportunities.reduce((sum, opp) => sum + opp.value, 0),
    weightedValue: opportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0),
    opportunityCount: opportunities.length,
    wonCount: opportunities.filter(opp => opp.stage === 'WON').length,
    lostCount: opportunities.filter(opp => opp.stage === 'LOST').length,
    winRate: opportunities.length > 0 
      ? (opportunities.filter(opp => opp.stage === 'WON').length / 
         (opportunities.filter(opp => opp.stage === 'WON').length + 
          opportunities.filter(opp => opp.stage === 'LOST').length) * 100) || 0
      : 0,
    averageDealSize: opportunities.length > 0 
      ? opportunities.reduce((sum, opp) => sum + opp.value, 0) / opportunities.length 
      : 0
  };

  // Get opportunities by stage for the kanban view
  const getOpportunitiesByStage = (stage) => {
    return filteredOpportunities.filter(opp => opp.stage === stage);
  };
  
  // Get activities for the selected opportunity
  const getOpportunityActivities = (opportunityId) => {
    return activities.filter(activity => activity.opportunityId === opportunityId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full overflow-hidden flex flex-col">
      {/* Header with component title and actions */}
      {/* Pipeline metrics summary section */}
      {/* Search filters and stage selectors */}
      {/* Kanban board to show opportunities by stage */}
      {/* Opportunity details sidebar */}
      {/* Add opportunity modal */}
    </div>
  );
};

export default SalesPipeline;