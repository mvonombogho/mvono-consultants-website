"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { 
  Users, 
  Plus,
  Search, 
  Briefcase, 
  Phone, 
  Mail, 
  ChevronDown,
  ChevronUp,
  Filter,
  X,
  AlertTriangle,
  Loader2
} from 'lucide-react';

// Types
type Subcontractor = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  specialties: string[];
  activeProjects: number;
  completedProjects: number;
  performanceRating: number;
};

export default function SubcontractorsList() {
  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([]);
  const [filteredSubcontractors, setFilteredSubcontractors] = useState<Subcontractor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [specialtyFilter, setSpecialtyFilter] = useState<string | null>(null);
  const [availableSpecialties, setAvailableSpecialties] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Animation references
  const containerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);

  // Load subcontractors data
  useEffect(() => {
    const loadSubcontractors = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock data
          const mockSubcontractors = [
            {
              id: '1',
              name: 'EcoSystems Consultants',
              contactPerson: 'John Kamau',
              email: 'john@ecosystems.co.ke',
              phone: '+254 712 345 678',
              specialties: ['Environmental Assessment', 'Soil Testing'],
              activeProjects: 2,
              completedProjects: 7,
              performanceRating: 4.7
            },
            {
              id: '2',
              name: 'GreenTech Analysis',
              contactPerson: 'Sarah Omondi',
              email: 'sarah@greentech.co.ke',
              phone: '+254 723 456 789',
              specialties: ['Air Quality Assessment', 'Water Quality Analysis'],
              activeProjects: 1,
              completedProjects: 4,
              performanceRating: 4.2
            },
            {
              id: '3',
              name: 'SafetyFirst Inspections',
              contactPerson: 'Daniel Wekesa',
              email: 'daniel@safetyfirst.co.ke',
              phone: '+254 734 567 890',
              specialties: ['Occupational Safety', 'Fire Safety Audit'],
              activeProjects: 3,
              completedProjects: 12,
              performanceRating: 4.9
            },
            {
              id: '4',
              name: 'EnergyWise Solutions',
              contactPerson: 'Faith Muthoni',
              email: 'faith@energywise.co.ke',
              phone: '+254 745 678 901',
              specialties: ['Energy Audit', 'Renewable Energy Consulting'],
              activeProjects: 0,
              completedProjects: 5,
              performanceRating: 3.8
            },
            {
              id: '5',
              name: 'Precision Testing Labs',
              contactPerson: 'James Ochieng',
              email: 'james@precisiontesting.co.ke',
              phone: '+254 756 789 012',
              specialties: ['Non-Destructive Testing', 'Pressure Vessel Certification'],
              activeProjects: 2,
              completedProjects: 9,
              performanceRating: 4.4
            }
          ];
          
          setSubcontractors(mockSubcontractors);
          setFilteredSubcontractors(mockSubcontractors);
          
          // Extract unique specialties
          const allSpecialties = mockSubcontractors.flatMap(s => s.specialties);
          const uniqueSpecialties = [...new Set(allSpecialties)];
          setAvailableSpecialties(uniqueSpecialties);
          
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error loading subcontractors:', error);
        setIsLoading(false);
      }
    };
    
    loadSubcontractors();
  }, []);
  
  // Filter subcontractors based on search term and specialty filter
  useEffect(() => {
    const filterSubcontractors = () => {
      let filtered = subcontractors;
      
      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(s => 
          s.name.toLowerCase().includes(term) || 
          s.contactPerson.toLowerCase().includes(term) ||
          s.email.toLowerCase().includes(term) ||
          s.specialties.some(specialty => specialty.toLowerCase().includes(term))
        );
      }
      
      // Apply specialty filter
      if (specialtyFilter) {
        filtered = filtered.filter(s => 
          s.specialties.some(specialty => specialty === specialtyFilter)
        );
      }
      
      setFilteredSubcontractors(filtered);
    };
    
    filterSubcontractors();
  }, [searchTerm, specialtyFilter, subcontractors]);
  
  // Animation for container
  useEffect(() => {
    if (!isLoading && containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.05, 
          duration: 0.4, 
          ease: "power2.out" 
        }
      );
    }
  }, [isLoading, filteredSubcontractors]);
  
  // Animation for filters
  useEffect(() => {
    if (filtersRef.current) {
      if (showFilters) {
        gsap.fromTo(
          filtersRef.current,
          { opacity: 0, height: 0 },
          { opacity: 1, height: 'auto', duration: 0.3, ease: "power2.out" }
        );
      } else {
        gsap.to(
          filtersRef.current,
          { opacity: 0, height: 0, duration: 0.3, ease: "power2.in" }
        );
      }
    }
  }, [showFilters]);
  
  // Modal animations
  useEffect(() => {
    if (deleteModalOpen && modalRef.current && modalBackdropRef.current) {
      // Animate backdrop
      gsap.fromTo(
        modalBackdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      
      // Animate modal
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
      );
    }
  }, [deleteModalOpen]);
  
  const closeDeleteModal = () => {
    if (modalRef.current && modalBackdropRef.current) {
      // Animate out
      gsap.to(modalRef.current, {
        opacity: 0, y: 20, scale: 0.95, duration: 0.3, ease: "power2.in",
        onComplete: () => setDeleteModalOpen(null)
      });
      
      gsap.to(modalBackdropRef.current, {
        opacity: 0, duration: 0.3, ease: "power2.in"
      });
    } else {
      setDeleteModalOpen(null);
    }
  };
  
  const handleDeleteSubcontractor = async (id: string) => {
    try {
      setIsDeleting(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update state
      setSubcontractors(prevSubcontractors => 
        prevSubcontractors.filter(s => s.id !== id)
      );
      
      closeDeleteModal();
      setIsDeleting(false);
    } catch (error) {
      console.error('Error deleting subcontractor:', error);
      setError('Failed to delete subcontractor. Please try again later.');
      setIsDeleting(false);
    }
  };
  
  // Get rating color based on performance
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-blue-600';
    if (rating >= 2.5) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Subcontractors</h1>
          <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="mb-4">
                <div className="h-20 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Subcontractors</h1>
        <Link
          href="/admin/subcontractors/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Add Subcontractor</span>
        </Link>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Search and filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search subcontractors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5 mr-2 text-gray-400" />
              <span>Filters</span>
              {showFilters ? (
                <ChevronUp className="h-5 w-5 ml-2 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 ml-2 text-gray-400" />
              )}
            </button>
          </div>
          
          {/* Filter options */}
          <div 
            ref={filtersRef}
            className="mt-4 overflow-hidden"
            style={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Specialty</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      !specialtyFilter ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => setSpecialtyFilter(null)}
                  >
                    All
                  </button>
                  {availableSpecialties.map((specialty) => (
                    <button
                      key={specialty}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        specialtyFilter === specialty ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                      onClick={() => setSpecialtyFilter(specialty)}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div ref={containerRef}>
          {filteredSubcontractors.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredSubcontractors.map((subcontractor) => (
                <div key={subcontractor.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <Link
                        href={`/admin/subcontractors/${subcontractor.id}`}
                        className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {subcontractor.name}
                      </Link>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {subcontractor.specialties.map((specialty, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/admin/subcontractors/${subcontractor.id}/edit`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-50"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setDeleteModalOpen(subcontractor.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md text-sm font-medium bg-white text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{subcontractor.contactPerson}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="h-5 w-5 text-gray-400 mr-2" />
                      <a href={`mailto:${subcontractor.email}`} className="hover:text-blue-600">
                        {subcontractor.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-5 w-5 text-gray-400 mr-2" />
                      <a href={`tel:${subcontractor.phone}`} className="hover:text-blue-600">
                        {subcontractor.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">
                        Active Projects:
                      </span>
                      <span className="text-sm font-medium">{subcontractor.activeProjects}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">
                        Completed Projects:
                      </span>
                      <span className="text-sm font-medium">{subcontractor.completedProjects}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">
                        Performance Rating:
                      </span>
                      <span className={`text-sm font-medium ${getRatingColor(subcontractor.performanceRating)}`}>
                        {subcontractor.performanceRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No subcontractors found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || specialtyFilter 
                  ? 'No subcontractors match your search criteria. Try changing your filters.'
                  : 'You haven\'t added any subcontractors yet.'}
              </p>
              <Link 
                href="/admin/subcontractors/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                <span>Add Subcontractor</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete confirmation modal */}
      {deleteModalOpen && (
        <>
          {/* Modal Backdrop */}
          <div 
            ref={modalBackdropRef}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={closeDeleteModal}
          />
          
          {/* Modal Content */}
          <div 
            ref={modalRef}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Subcontractor</h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this subcontractor? This action cannot be undone.
                All associated data will be permanently removed.
              </p>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
                {error}
              </div>
            )}
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                onClick={closeDeleteModal}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 flex items-center"
                onClick={() => handleDeleteSubcontractor(deleteModalOpen)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Subcontractor</span>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}