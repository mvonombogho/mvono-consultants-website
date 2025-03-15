import React from 'react';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Edit, BarChart2, Mail, AlertTriangle } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  description: string;
  objective: string;
  campaignType: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: number;
  actualSpent: number;
  ROI: number;
  createdAt: string;
  updatedAt: string;
}

interface MarketingCampaignCardProps {
  campaign: Campaign;
  onEdit: () => void;
}

export const MarketingCampaignCard = ({ campaign, onEdit }: MarketingCampaignCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-purple-100 text-purple-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'social':
        return <BarChart2 className="h-4 w-4" />;
      default:
        return <BarChart2 className="h-4 w-4" />;
    }
  };

  const isExpiringSoon = () => {
    const endDate = new Date(campaign.endDate);
    const today = new Date();
    const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return campaign.status === 'active' && daysLeft <= 7 && daysLeft > 0;
  };

  const calculateProgress = () => {
    const startDate = new Date(campaign.startDate);
    const endDate = new Date(campaign.endDate);
    const today = new Date();
    
    if (today < startDate) return 0;
    if (today > endDate) return 100;
    
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return Math.round((daysElapsed / totalDays) * 100);
  };

  const progressPercent = calculateProgress();

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-800 mr-3">{campaign.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(campaign.status)}`}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{campaign.description}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="text-gray-500 hover:text-gray-700"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          <div>
            <p className="text-xs text-gray-500">Type</p>
            <div className="flex items-center mt-1">
              {getCampaignTypeIcon(campaign.campaignType)}
              <span className="text-sm font-medium text-gray-700 ml-1">
                {campaign.campaignType.charAt(0).toUpperCase() + campaign.campaignType.slice(1)}
              </span>
            </div>
          </div>
          
          <div>
            <p className="text-xs text-gray-500">Budget</p>
            <p className="text-sm font-medium text-gray-700 mt-1">
              {campaign.budget ? formatCurrency(campaign.budget) : 'N/A'}
            </p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500">Start Date</p>
            <p className="text-sm font-medium text-gray-700 mt-1">
              {formatDate(new Date(campaign.startDate))}
            </p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500">End Date</p>
            <p className="text-sm font-medium text-gray-700 mt-1">
              {formatDate(new Date(campaign.endDate))}
            </p>
          </div>
        </div>
        
        {/* Progress bar for active campaigns */}
        {campaign.status === 'active' && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs font-medium text-gray-700">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Warning for soon expiring campaigns */}
        {isExpiringSoon() && (
          <div className="mt-3 flex items-center text-yellow-600 bg-yellow-50 px-3 py-2 rounded-md">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span className="text-xs">Campaign ending soon</span>
          </div>
        )}
        
        {/* ROI indicator for completed campaigns */}
        {campaign.status === 'completed' && campaign.ROI !== null && (
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Actual Spent</p>
              <p className="text-sm font-medium text-gray-700">
                {formatCurrency(campaign.actualSpent)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">ROI</p>
              <p className={`text-sm font-medium ${campaign.ROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {campaign.ROI >= 0 ? '+' : ''}{campaign.ROI}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
