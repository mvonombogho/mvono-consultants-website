"use client";

import { useState, useEffect } from 'react';
import { BadgePercent, Clipboard, PieChart, Users, BarChart, Zap, FileCheck, TrendingUp } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { Card, CardContent } from '@/components/ui/card';

type CategoryData = {
  name: string;
  count: number;
  icon: React.ReactNode;
  color: string;
};

const ServiceCategoryDisplay = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);

  // Predefined icons and colors for categories
  const categoryIcons: Record<string, { icon: React.ReactNode; color: string }> = {
    'Training Services': { 
      icon: <Users size={24} />,
      color: 'bg-blue-100 text-blue-700'
    },
    'Safety Services': { 
      icon: <FileCheck size={24} />,
      color: 'bg-red-100 text-red-700'
    },
    'Inspection Services': { 
      icon: <Clipboard size={24} />,
      color: 'bg-amber-100 text-amber-700'
    },
    'Energy Services': { 
      icon: <Zap size={24} />,
      color: 'bg-green-100 text-green-700'
    },
    'Environmental Services': { 
      icon: <BarChart size={24} />,
      color: 'bg-emerald-100 text-emerald-700'
    },
    'Specialized Services': { 
      icon: <BadgePercent size={24} />,
      color: 'bg-purple-100 text-purple-700'
    },
  };

  // Default icon for categories not in our predefined list
  const defaultIcon = { 
    icon: <PieChart size={24} />,
    color: 'bg-gray-100 text-gray-700'
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch('/api/services/categories');
        if (!response.ok) throw new Error('Failed to fetch category data');
        
        const data = await response.json();
        
        // Transform data into our format with icons
        const transformedData = data.map((category: {name: string; count: number}) => ({
          name: category.name,
          count: category.count,
          icon: categoryIcons[category.name]?.icon || defaultIcon.icon,
          color: categoryIcons[category.name]?.color || defaultIcon.color,
        }));
        
        setCategoryData(transformedData);
      } catch (error) {
        console.error('Error fetching category data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load service category data',
          variant: 'destructive',
        });
        
        // Set some sample data to show the UI
        const sampleData = Object.entries(categoryIcons).map(([name, { icon, color }]) => ({
          name,
          count: Math.floor(Math.random() * 8) + 1,
          icon,
          color,
        }));
        
        setCategoryData(sampleData);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [toast]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-32 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {categoryData.map((category) => (
        <Card key={category.name} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className={`flex items-center p-6 ${category.color} rounded-t-lg`}>
              <div className="mr-4">
                {category.icon}
              </div>
              <div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-2xl font-bold">{category.count}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {category.count === 1 ? '1 service' : `${category.count} services`}
                </span>
                {category.count > 0 ? (
                  <span className="text-xs flex items-center text-green-600">
                    <TrendingUp size={14} className="mr-1" />
                    Active
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">No services</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceCategoryDisplay;