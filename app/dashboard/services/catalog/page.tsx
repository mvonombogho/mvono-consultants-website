"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Search, Filter, Zap } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import ServiceCardView from '@/components/dashboard/services/ServiceCardView';
import ServiceTableView from '@/components/dashboard/services/ServiceTableView';

export default function ServiceCatalogPage() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  useEffect(() => {
    // In a real implementation, we would fetch from the API
    const fetchServices = async () => {
      try {
        // Mock data
        const mockServices = [
          {
            id: 'service-1',
            name: 'Environmental Impact Assessment',
            description: 'Comprehensive assessment of environmental impact for construction and industrial projects.',
            category: 'Environmental',
            price: 180000,
            duration: '3-4 weeks',
            isActive: true,
            lastUpdated: '2025-01-15',
          },
          {
            id: 'service-2',
            name: 'Occupational Safety Audit',
            description: 'Detailed workplace safety assessment to identify hazards and ensure compliance with safety regulations.',
            category: 'Safety',
            price: 120000,
            duration: '1-2 weeks',
            isActive: true,
            lastUpdated: '2025-02-01',
          },
          {
            id: 'service-3',
            name: 'Fire Safety Audit',
            description: 'Comprehensive evaluation of fire safety measures, protocols, and equipment in buildings and facilities.',
            category: 'Safety',
            price: 95000,
            duration: '1 week',
            isActive: true,
            lastUpdated: '2025-01-22',
          },
          {
            id: 'service-4',
            name: 'Energy Audit',
            description: 'Detailed assessment of energy consumption patterns and recommendations for energy efficiency improvements.',
            category: 'Energy',
            price: 150000,
            duration: '2-3 weeks',
            isActive: true,
            lastUpdated: '2025-01-10',
          },
          {
            id: 'service-5',
            name: 'Statutory Inspection - Pressure Vessels',
            description: 'Mandatory inspection of pressure vessels as required by Kenyan regulations.',
            category: 'Inspection',
            price: 85000,
            duration: '3-5 days',
            isActive: true,
            lastUpdated: '2025-02-15',
          },
          {
            id: 'service-6',
            name: 'Non-Destructive Testing',
            description: 'Various NDT methods including ultrasonic, magnetic particle, and dye penetrant testing for equipment integrity.',
            category: 'Testing',
            price: 75000,
            duration: '3-7 days',
            isActive: true,
            lastUpdated: '2025-01-05',
          },
          {
            id: 'service-7',
            name: 'Fire Safety Training',
            description: 'Comprehensive fire safety training for employees including prevention, evacuation, and equipment usage.',
            category: 'Training',
            price: 65000,
            duration: '1-2 days',
            isActive: true,
            lastUpdated: '2025-02-10',
          },
          {
            id: 'service-8',
            name: 'First Aid Training',
            description: 'Practical first aid training for workplace emergency response and basic medical assistance.',
            category: 'Training',
            price: 55000,
            duration: '1 day',
            isActive: true,
            lastUpdated: '2025-01-30',
          },
        ];
        
        setServices(mockServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter services based on search query and category
  const filteredServices = services.filter((service: any) => {
    const matchesSearch = 
      service.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      service.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for the filter dropdown
  const categories = Array.from(new Set(services.map((service: any) => service.category)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Catalog</h1>
          <p className="text-muted-foreground mt-2">
            Manage your service offerings, pricing, and descriptions.
          </p>
        </div>
        <Link href="/dashboard/services/catalog/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category: string) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="card" className="w-full" onValueChange={(value) => setViewMode(value as 'card' | 'table')}>
        <TabsList className="grid grid-cols-2 w-48 mb-4">
          <TabsTrigger value="card">Card View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>
        <TabsContent value="card">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredServices.length > 0 ? (
            <ServiceCardView services={filteredServices} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-64 p-6">
                <Zap className="h-12 w-12 text-muted-foreground mb-4" />
                <CardTitle className="text-xl">No Services Found</CardTitle>
                <CardDescription className="text-center mt-2">
                  {searchQuery || categoryFilter !== 'all' ? 
                    'No services match your current filters.' : 
                    'Get started by adding your first service to the catalog.'}
                </CardDescription>
                {!searchQuery && categoryFilter === 'all' && (
                  <Link href="/dashboard/services/catalog/add" className="mt-4">
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Service
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="table">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredServices.length > 0 ? (
            <ServiceTableView services={filteredServices} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-64 p-6">
                <Zap className="h-12 w-12 text-muted-foreground mb-4" />
                <CardTitle className="text-xl">No Services Found</CardTitle>
                <CardDescription className="text-center mt-2">
                  {searchQuery || categoryFilter !== 'all' ? 
                    'No services match your current filters.' : 
                    'Get started by adding your first service to the catalog.'}
                </CardDescription>
                {!searchQuery && categoryFilter === 'all' && (
                  <Link href="/dashboard/services/catalog/add" className="mt-4">
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Service
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}