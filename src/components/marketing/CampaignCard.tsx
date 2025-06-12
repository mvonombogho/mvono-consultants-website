'use client'

import { useRouter } from 'next/navigation'
import { FaCalendarAlt, FaChartLine, FaEnvelope, FaHashtag } from 'react-icons/fa'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { formatDistanceToNow, format, isAfter, isBefore } from 'date-fns'

// Status badge colors
const statusColors = {
  draft: 'bg-gray-200 text-gray-800',
  scheduled: 'bg-blue-100 text-blue-800',
  active: 'bg-green-100 text-green-800',
  completed: 'bg-purple-100 text-purple-800',
  cancelled: 'bg-red-100 text-red-800'
}

// Campaign type icons
const campaignTypeIcons = {
  email: <FaEnvelope size={14} />,
  social: <FaHashtag size={14} />,
  event: <FaCalendarAlt size={14} />,
  content: <FaChartLine size={14} />,
  print: <FaChartLine size={14} />,
  default: <FaChartLine size={14} />
}

interface CampaignCardProps {
  campaign: {
    id: string
    name: string
    description: string
    status: string
    campaignType: string
    startDate: Date
    endDate: Date
    budget: number
    actualSpent: number
    metrics: Record<string, number>
  }
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const router = useRouter()
  const now = new Date()
  const isActive = isBefore(campaign.startDate, now) && isAfter(campaign.endDate, now)
  
  // Calculate progress percentage for active campaigns
  const calculateProgress = () => {
    if (campaign.status !== 'active') return 0
    
    const totalDuration = campaign.endDate.getTime() - campaign.startDate.getTime()
    const elapsed = now.getTime() - campaign.startDate.getTime()
    
    return Math.min(Math.floor((elapsed / totalDuration) * 100), 100)
  }

  // Format budget and spent values
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <Card 
      className="overflow-hidden border hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => router.push(`/admin/marketing/campaigns/${campaign.id}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge 
            className={`${statusColors[campaign.status as keyof typeof statusColors] || 'bg-gray-100'} capitalize`}
          >
            {campaign.status}
          </Badge>
          <Badge 
            variant="outline"
            className="flex items-center gap-1.5"
          >
            {campaignTypeIcons[campaign.campaignType as keyof typeof campaignTypeIcons] || campaignTypeIcons.default}
            <span className="capitalize">{campaign.campaignType}</span>
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2 line-clamp-1">{campaign.name}</CardTitle>
        <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex flex-col">
              <span className="text-gray-500">Start Date</span>
              <span className="font-medium">{format(campaign.startDate, 'MMM d, yyyy')}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-gray-500">End Date</span>
              <span className="font-medium">{format(campaign.endDate, 'MMM d, yyyy')}</span>
            </div>
          </div>
          
          {campaign.status === 'active' && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Progress</span>
                <span>{calculateProgress()}%</span>
              </div>
              <Progress value={calculateProgress()} />
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-gray-500">Budget: </span>
              <span className="font-medium">{formatCurrency(campaign.budget)}</span>
            </div>
            <div>
              <span className="text-gray-500">Spent: </span>
              <span className="font-medium">{formatCurrency(campaign.actualSpent)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between">
        <div className="text-sm flex gap-3">
          {campaign.metrics && Object.entries(campaign.metrics).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="text-xs text-gray-500 capitalize">{key}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}
