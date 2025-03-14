'use client';

import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, ChevronDown, MoreHorizontal, Search, 
  Download, Filter, Tag, Calendar, DollarSign, ArrowUpRight,
  Clock, CheckCircle, XCircle, Trash2, Edit, Target
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

  useEffect(() => {
    // Animate in the pipeline stages and summary
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

  const handleOpenDetail = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsDetailOpen(true);
    
    // Animate in the details panel
    gsap.fromTo(
      detailsRef.current,
      { x: 300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  };

  const handleCloseDetail = () => {
    gsap.to(detailsRef.current, {
      x: 300, 
      opacity: 0, 
      duration: 0.3, 
      ease: 'power2.in',
      onComplete: () => setIsDetailOpen(false)
    });
  };

  const handleOpenAddOpportunity = () => {
    setIsAddOpportunityOpen(true);
    
    // Animate in the form
    gsap.fromTo(
      formRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  };

  const handleCloseAddOpportunity = () => {
    gsap.to(formRef.current, {
      y: -50, 
      opacity: 0, 
      duration: 0.3, 
      ease: 'power2.in',
      onComplete: () => setIsAddOpportunityOpen(false)
    });
  };

  const handleAddOpportunity = (e) => {
    e.preventDefault();
    
    const currentDate = new Date().toISOString().split('T')[0];
    
    const newOpportunityWithDetails = {
      ...newOpportunity,
      id: opportunities.length + 1,
      value: parseFloat(newOpportunity.value) || 0,
      lastActivity: "Created opportunity",
      lastActivityDate: currentDate,
      createdAt: currentDate,
      tags: newOpportunity.tags.length ? newOpportunity.tags : [`${newOpportunity.stage}`]
    };
    
    setOpportunities([newOpportunityWithDetails, ...opportunities]);
    
    // Reset form
    setNewOpportunity({
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
    
    handleCloseAddOpportunity();
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (!newOpportunity.tags.includes(newTag)) {
        setNewOpportunity({
          ...newOpportunity,
          tags: [...newOpportunity.tags, newTag]
        });
      }
      e.target.value = '';
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewOpportunity({
      ...newOpportunity,
      tags: newOpportunity.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleUpdateOpportunityStage = (id, newStage) => {
    const updatedOpportunities = opportunities.map(opp => {
      if (opp.id === id) {
        // Update probability based on stage
        let probability = opp.probability;
        switch (newStage) {
          case 'DISCOVERY': probability = 20; break;
          case 'QUALIFICATION': probability = 40; break;
          case 'PROPOSAL': probability = 60; break;
          case 'NEGOTIATION': probability = 80; break;
          case 'WON': probability = 100; break;
          case 'LOST': probability = 0; break;
          default: break;
        }
        
        return { 
          ...opp, 
          stage: newStage,
          probability,
          lastActivity: `Moved to ${PIPELINE_STAGES[newStage].label} stage`,
          lastActivityDate: new Date().toISOString().split('T')[0]
        };
      }
      return opp;
    });
    
    setOpportunities(updatedOpportunities);
    
    if (selectedOpportunity && selectedOpportunity.id === id) {
      // Update the selected opportunity if it's currently open in the details panel
      const updatedStage = PIPELINE_STAGES[newStage];
      setSelectedOpportunity({
        ...selectedOpportunity,
        stage: newStage,
        probability: newStage === 'WON' ? 100 : newStage === 'LOST' ? 0 : selectedOpportunity.probability,
        lastActivity: `Moved to ${updatedStage.label} stage`,
        lastActivityDate: new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleDeleteOpportunity = (id) => {
    setOpportunities(opportunities.filter(opp => opp.id !== id));
    if (isDetailOpen && selectedOpportunity && selectedOpportunity.id === id) {
      handleCloseDetail();
    }
  };

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
