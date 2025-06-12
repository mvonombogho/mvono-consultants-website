"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Filter, Search, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import SubcontractorList from '@/components/dashboard/subcontractors/SubcontractorList';
import Link from 'next/link';

export default function SubcontractorsPage() {
  const [subcontractors, setSubcontractors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');

  useEffect(() => {
    // In a real implementation, we would fetch from the API
    const fetchSubcontractors = async () => {
      try {
        // Mock data
        const mockSubcontractors = [
          {
            id: 'sc-1',
            name: 'Alpha Safety Inspectors',
            email: 'info@alphasafety.co.ke',
            phone: '+254712345678',
            specialty: 'Safety Inspection',
            address: 'Nairobi, Kenya',
            status: 'active',
            projectsCount: 12
          },
          {
            id: 'sc-2',
            name: 'Beta Engineering Services',
            email: 'contact@betaeng.com',
            phone: '+254723456789',
            specialty: 'Energy Audit',
            address: 'Mombasa, Kenya',
            status: 'active',
            projectsCount: 8
          },
          {
            id: 'sc-3',
            name: 'Gamma Training Solutions',
            email: 'training@gammasolutions.org',
            phone: '+254734567890',
            specialty: 'Safety Training',
            address: 'Kisumu, Kenya',
            status: 'inactive',
            projectsCount: 3
          },
          {
            id: 'sc-4',
            name: 'Delta NDT Specialists',
            email: 'services@deltandt.co.ke',
            phone: '+254745678901',
            specialty: 'Non-Destructive Testing',
            address: 'Nakuru, Kenya',
            status: 'active',
            projectsCount: 15
          },
          {
            id: 'sc-5',
            name: 'Omega Equipment Calibration',
            email: 'support@omegacal.com',
            phone: '+254756789012',
            specialty: 'Equipment Calibration',
            address: 'Nairobi, Kenya',
            status: 'active',
            projectsCount: 9
          },
        ];
        
        setSubcontractors(mockSubcontractors);
      } catch (error) {
        console.error('Error fetching subcontractors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubcontractors();
  }, []);

  // Filter subcontractors based on search query and specialty
  const filteredSubcontractors = subcontractors.filter((subcontractor: any) => {
    const matchesSearch = 
      subcontractor.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      subcontractor.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subcontractor.specialty?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (specialtyFilter === 'all') return matchesSearch;
    return matchesSearch && subcontractor.specialty === specialtyFilter;
  });

  // Get unique specialties for the filter dropdown
  const specialties = Array.from(new Set(subcontractors.map((sc: any) => sc.specialty)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subcontractors</h1>
          <p className="text-muted-foreground mt-2">
            Manage your subcontractors, their contracts, and performance.
          </p>
        </div>
        <Link href="/dashboard/subcontractors/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Subcontractor
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or specialty..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
            <SelectTrigger className="w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {specialties.map((specialty: string) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredSubcontractors.length > 0 ? (
        <SubcontractorList subcontractors={filteredSubcontractors} />
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64 p-6">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="text-xl">No Subcontractors Found</CardTitle>
            <CardDescription className="text-center mt-2">
              {searchQuery ? 
                `No subcontractors match your search "${searchQuery}".` : 
                'Get started by adding your first subcontractor.'}
            </CardDescription>
            {!searchQuery && (
              <Link href="/dashboard/subcontractors/add" className="mt-4">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Subcontractor
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}