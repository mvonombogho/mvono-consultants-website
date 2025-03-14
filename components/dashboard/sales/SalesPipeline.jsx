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