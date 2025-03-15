'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaChartLine, FaEnvelope, FaUsers, FaPlus, FaFilter, FaSearch } from 'react-icons/fa'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import CampaignCard from '@/components/marketing/CampaignCard'
import EmptyState from '@/components/ui/EmptyState'
import MarketingStats from '@/components/marketing/MarketingStats'
import { useToast } from '@/components/ui/toast'

// Mock data for initial development
const mockCampaigns = [
  {
    id: '1',
    name: 'Q1 Safety Webinar Series',
    description: 'Webinar series focused on workplace safety best practices',
    status: 'active',
    campaignType: 'email',
    startDate: new Date(2025, 2, 1),
    endDate: new Date(2025, 4, 30),
    metrics: { opens: 245, clicks: 89, leads: 12 },
    budget: 15000,
    actualSpent: 8500,
  },
  {
    id: '2',
    name: 'Fire Safety Month',
    description: 'Promotion for fire safety audits during Fire Safety Month',
    status: 'scheduled',
    campaignType: 'social',
    startDate: new Date(2025, 4, 1),
    endDate: new Date(2025, 4, 31),
    metrics: { impressions: 0, engagement: 0, leads: 0 },
    budget: 25000,
    actualSpent: 0,
  },
  {
    id: '3',
    name: 'Energy Audit Promotion',
    description: 'Special offer on energy audits for manufacturing clients',
    status: 'completed',
    campaignType: 'email',
    startDate: new Date(2025, 0, 15),
    endDate: new Date(2025, 1, 28),
    metrics: { opens: 531, clicks: 203, leads: 37 },
    budget: 18000,
    actualSpent: 17200,
  },
]

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState(mockCampaigns)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const router = useRouter()
  const { toast } = useToast()

  // Fetch campaigns data (would replace mock in production)
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true)
        // In production, this would be an API call
        // const response = await fetch('/api/campaigns')
        // const data = await response.json()
        // setCampaigns(data)
        
        // Using mock data for now
        setTimeout(() => {
          setCampaigns(mockCampaigns)
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error('Error fetching campaigns:', error)
        toast({
          title: 'Error',
          description: 'Failed to load marketing campaigns',
          variant: 'destructive',
        })
        setIsLoading(false)
      }
    }

    fetchCampaigns()
  }, [toast])

  // Filter campaigns based on search term and filter
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filter === 'all') return matchesSearch
    return matchesSearch && campaign.status === filter
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Marketing</h1>
          <p className="text-muted-foreground">
            Manage your marketing campaigns, customer segments, and email templates
          </p>
        </div>
        <Button 
          onClick={() => router.push('/admin/marketing/campaigns/new')}
          className="sm:w-auto w-full"
        >
          <FaPlus className="mr-2" /> New Campaign
        </Button>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="segments">Customer Segments</TabsTrigger>
          <TabsTrigger value="emails">Email Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <MarketingStats />

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm"
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

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, i) => (
                <Card key={i} className="h-56 animate-pulse">
                  <CardContent className="p-0">
                    <div className="h-full bg-gray-200 rounded-lg"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<FaChartLine size={48} />}
              title="No campaigns found"
              description={searchTerm ? "No campaigns match your search criteria" : "Create your first marketing campaign"}
              action={
                <Button onClick={() => router.push('/admin/marketing/campaigns/new')}>
                  <FaPlus className="mr-2" /> New Campaign
                </Button>
              }
            />
          )}
        </TabsContent>

        <TabsContent value="segments">
          <EmptyState
            icon={<FaUsers size={48} />}
            title="Customer Segments"
            description="Group your clients based on specific criteria to target them effectively"
            action={
              <Button onClick={() => router.push('/admin/marketing/segments/new')}>
                <FaPlus className="mr-2" /> Create Segment
              </Button>
            }
          />
        </TabsContent>

        <TabsContent value="emails">
          <EmptyState
            icon={<FaEnvelope size={48} />}
            title="Email Templates"
            description="Create and manage reusable email templates for various marketing purposes"
            action={
              <Button onClick={() => router.push('/admin/marketing/emails/new')}>
                <FaPlus className="mr-2" /> New Template
              </Button>
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
