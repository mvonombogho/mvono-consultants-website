import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Users, Target, Eye, Mail } from 'lucide-react';

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  criteria: string;
  segmentSize: number;
  isActive: boolean;
  tags: string;
  createdAt: string;
  updatedAt: string;
}

interface CustomerSegmentCardProps {
  segment: CustomerSegment;
  onEdit: () => void;
}

export const CustomerSegmentCard = ({ segment, onEdit }: CustomerSegmentCardProps) => {
  // Parse criteria JSON (safely)
  const getCriteriaList = () => {
    try {
      if (!segment.criteria) return [];
      const criteria = JSON.parse(segment.criteria);
      return Object.entries(criteria).map(([key, value]) => `${key}: ${value}`);
    } catch (error) {
      console.error('Error parsing segment criteria:', error);
      return [];
    }
  };

  // Parse tags into array
  const getTags = () => {
    if (!segment.tags) return [];
    return segment.tags.split(',').map(tag => tag.trim()).filter(Boolean);
  };

  return (
    <div className={`bg-white rounded-lg border ${segment.isActive ? 'border-gray-200' : 'border-gray-200 bg-gray-50'} overflow-hidden hover:shadow-md transition-shadow`}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-md font-semibold text-gray-800">{segment.name}</h3>
              {!segment.isActive && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  Inactive
                </span>
              )}
            </div>
            {segment.description && (
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{segment.description}</p>
            )}
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
        
        <div className="flex items-center mt-3">
          <div className="bg-indigo-100 p-1.5 rounded-full">
            <Users className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <span className="text-sm font-medium text-gray-700 ml-2">
            {segment.segmentSize} {segment.segmentSize === 1 ? 'Client' : 'Clients'}
          </span>
        </div>
        
        {/* Criteria */}
        {getCriteriaList().length > 0 && (
          <div className="mt-3">
            <div className="flex items-center mb-1.5">
              <Target className="h-3.5 w-3.5 text-gray-500 mr-1" />
              <span className="text-xs font-medium text-gray-500">Criteria</span>
            </div>
            <ul className="pl-5 space-y-1">
              {getCriteriaList().slice(0, 3).map((criterion, index) => (
                <li key={index} className="text-xs text-gray-600 list-disc">
                  {criterion}
                </li>
              ))}
              {getCriteriaList().length > 3 && (
                <li className="text-xs text-gray-400 italic">
                  +{getCriteriaList().length - 3} more
                </li>
              )}
            </ul>
          </div>
        )}
        
        {/* Tags */}
        {getTags().length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {getTags().map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs px-2.5 py-1 h-auto border-gray-200 text-gray-600 hover:text-gray-800"
          >
            <Eye className="h-3 w-3 mr-1" />
            View Clients
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs px-2.5 py-1 h-auto border-gray-200 text-gray-600 hover:text-gray-800"
          >
            <Mail className="h-3 w-3 mr-1" />
            Send Email
          </Button>
        </div>
      </div>
    </div>
  );
};
