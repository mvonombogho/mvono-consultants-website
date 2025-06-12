"use client";

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { 
  TrendingUp, 
  PieChart, 
  Users, 
  Target, 
  Calendar, 
  Mail, 
  Plus, 
  Search,
  Filter 
} from 'lucide-react';
import { MarketingCampaignCard } from '@/components/marketing/MarketingCampaignCard';
import { CustomerSegmentCard } from '@/components/marketing/CustomerSegmentCard';
import { MarketingMetricsChart } from '@/components/marketing/MarketingMetricsChart';
import { EmailStatsWidget } from '@/components/marketing/EmailStatsWidget';
import { CampaignModal } from '@/components/marketing/CampaignModal';
import { SegmentModal } from '@/components/marketing/SegmentModal';

const MarketingDashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [segments, setSegments] = useState([]);
  const [emailStats, setEmailStats] = useState({
    sent: 0,
    opened: 0,
    clicked: 0,
    totalRate: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showSegmentModal, setShowSegmentModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch campaigns
        const campaignsResponse = await fetch('/api/marketing/campaigns');
        const campaignsData = await campaignsResponse.json();
        setCampaigns(campaignsData);
        
        // Fetch segments
        const segmentsResponse = await fetch('/api/marketing/segments');
        const segmentsData = await segmentsResponse.json();
        setSegments(segmentsData);
        
        // Fetch email stats
        const emailStatsResponse = await fetch('/api/marketing/email-stats');
        const emailStatsData = await emailStatsResponse.json();
        setEmailStats(emailStatsData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching marketing data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter campaigns based on search query and status filter
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle campaign creation/edit
  const handleCampaignSubmit = async (campaignData) => {
    try {
      if (selectedCampaign) {
        // Update existing campaign
        const response = await fetch(`/api/marketing/campaigns/${selectedCampaign.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(campaignData)
        });
        
        if (response.ok) {
          const updatedCampaign = await response.json();
          setCampaigns(campaigns.map(c => c.id === updatedCampaign.id ? updatedCampaign : c));
          setSelectedCampaign(null);
        }
      } else {
        // Create new campaign
        const response = await fetch('/api/marketing/campaigns', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(campaignData)
        });
        
        if (response.ok) {
          const newCampaign = await response.json();
          setCampaigns([...campaigns, newCampaign]);
        }
      }
      
      setShowCampaignModal(false);
    } catch (error) {
      console.error('Error saving campaign:', error);
    }
  };

  // Handle segment creation/edit
  const handleSegmentSubmit = async (segmentData) => {
    try {
      if (selectedSegment) {
        // Update existing segment
        const response = await fetch(`/api/marketing/segments/${selectedSegment.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(segmentData)
        });
        
        if (response.ok) {
          const updatedSegment = await response.json();
          setSegments(segments.map(s => s.id === updatedSegment.id ? updatedSegment : s));
          setSelectedSegment(null);
        }
      } else {
        // Create new segment
        const response = await fetch('/api/marketing/segments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(segmentData)
        });
        
        if (response.ok) {
          const newSegment = await response.json();
          setSegments([...segments, newSegment]);
        }
      }
      
      setShowSegmentModal(false);
    } catch (error) {
      console.error('Error saving segment:', error);
    }
  };

  // Edit campaign
  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setShowCampaignModal(true);
  };

  // Edit segment
  const handleEditSegment = (segment) => {
    setSelectedSegment(segment);
    setShowSegmentModal(true);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Marketing Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage campaigns, segments, and email marketing</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => {
                setSelectedCampaign(null);
                setShowCampaignModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
            <Button 
              onClick={() => {
                setSelectedSegment(null);
                setShowSegmentModal(true);
              }}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Users className="mr-2 h-4 w-4" />
              New Segment
            </Button>
          </div>
        </div>

        {/* Marketing Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 font-medium">Active Campaigns</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {loading ? '...' : campaigns.filter(c => c.status === 'active').length}
                </h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 font-medium">Customer Segments</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {loading ? '...' : segments.length}
                </h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 font-medium">Emails Sent</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {loading ? '...' : emailStats.sent}
                </h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 font-medium">Open Rate</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {loading ? '...' : `${emailStats.totalRate}%`}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Marketing Metrics Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Campaign Performance</h2>
          <div className="h-80">
            <MarketingMetricsChart data={campaigns} loading={loading} />
          </div>
        </div>

        {/* Campaigns and Segments Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Marketing Campaigns</h2>
                <div className="mt-3 sm:mt-0 flex items-center space-x-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search campaigns..."
                      className="pl-10 pr-4"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Filter className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-gray-500">Loading campaigns...</p>
                </div>
              ) : filteredCampaigns.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-64 text-center">
                  <p className="text-gray-500 mb-4">No campaigns found</p>
                  <Button 
                    onClick={() => {
                      setSelectedCampaign(null);
                      setShowCampaignModal(true);
                    }}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Campaign
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCampaigns.map(campaign => (
                    <MarketingCampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      onEdit={() => handleEditCampaign(campaign)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Customer Segments</h2>
              
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <p className="text-gray-500">Loading segments...</p>
                </div>
              ) : segments.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-32 text-center">
                  <p className="text-gray-500 mb-4">No segments created yet</p>
                  <Button 
                    onClick={() => {
                      setSelectedSegment(null);
                      setShowSegmentModal(true);
                    }}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Segment
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {segments.map(segment => (
                    <CustomerSegmentCard
                      key={segment.id}
                      segment={segment}
                      onEdit={() => handleEditSegment(segment)}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Email Performance</h2>
              <EmailStatsWidget stats={emailStats} loading={loading} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Campaign Modal */}
      {showCampaignModal && (
        <CampaignModal
          campaign={selectedCampaign}
          segments={segments}
          onClose={() => {
            setShowCampaignModal(false);
            setSelectedCampaign(null);
          }}
          onSubmit={handleCampaignSubmit}
        />
      )}
      
      {/* Segment Modal */}
      {showSegmentModal && (
        <SegmentModal
          segment={selectedSegment}
          onClose={() => {
            setShowSegmentModal(false);
            setSelectedSegment(null);
          }}
          onSubmit={handleSegmentSubmit}
        />
      )}
    </AdminLayout>
  );
};

export default MarketingDashboardPage;
