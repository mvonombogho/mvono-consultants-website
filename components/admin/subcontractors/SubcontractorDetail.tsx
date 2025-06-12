"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  Briefcase, 
  CheckCircle,
  Clock,
  Link as LinkIcon,
  AlertTriangle,
  Loader2
} from 'lucide-react';

// Types
type SubcontractorDetailProps = {
  id: string;
};

type Subcontractor = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  specialties: string[];
  address?: string;
  notes?: string;
  activeProjects: number;
  completedProjects: number;
  performanceRating: number;
  projects: {
    id: string;
    title: string;
    status: 'active' | 'completed' | 'cancelled' | 'on-hold';
    startDate: string;
    endDate?: string;
  }[];
};

export default function SubcontractorDetail({ id }: SubcontractorDetailProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [subcontractor, setSubcontractor] = useState<Subcontractor | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Animation refs
  const contentRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);
  
  // Load subcontractor data
  useEffect(() => {
    const loadSubcontractor = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock data
          setSubcontractor({
            id,
            name: 'EcoSystems Consultants',
            contactPerson: 'John Kamau',
            email: 'john@ecosystems.co.ke',
            phone: '+254 712 345 678',
            specialties: ['Environmental Assessment', 'Soil Testing'],
            address: '123 Green St, Nairobi, Kenya',
            notes: 'Excellent track record with environmental assessments. Has been a consistent partner for the last 3 years.',
            activeProjects: 2,
            completedProjects: 7,
            performanceRating: 4.7,
            projects: [
              {
                id: '101',
                title: 'Environmental Impact Assessment - Tata Chemicals',
                status: 'active',
                startDate: '2023-06-01',
              },
              {
                id: '102',
                title: 'Soil Testing - Nairobi Agricultural Center',
                status: 'active',
                startDate: '2023-07-15',
              },
              {
                id: '103',
                title: 'Water Quality Assessment - Melvin Tea',
                status: 'completed',
                startDate: '2023-01-10',
                endDate: '2023-03-20',
              },
              {
                id: '104',
                title: 'Environmental Compliance Audit - Lafarge',
                status: 'completed',
                startDate: '2022-10-05',
                endDate: '2022-12-15',
              },
            ],
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading subcontractor:', error);
        setIsLoading(false);
      }
    };
    
    loadSubcontractor();
  }, [id]);
  
  // GSAP animations
  useEffect(() => {
    if (!isLoading && subcontractor && contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.5, 
          ease: "power2.out" 
        }
      );
    }
  }, [isLoading, subcontractor]);
  
  // Modal animations
  useEffect(() => {
    if (isDeleteModalOpen && modalRef.current && modalBackdropRef.current) {
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
  }, [isDeleteModalOpen]);
  
  const closeDeleteModal = () => {
    if (modalRef.current && modalBackdropRef.current) {
      // Animate out
      gsap.to(modalRef.current, {
        opacity: 0, y: 20, scale: 0.95, duration: 0.3, ease: "power2.in",
        onComplete: () => setIsDeleteModalOpen(false)
      });
      
      gsap.to(modalBackdropRef.current, {
        opacity: 0, duration: 0.3, ease: "power2.in"
      });
    } else {
      setIsDeleteModalOpen(false);
    }
  };
  
  // Handle deletion
  const handleDeleteSubcontractor = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success - animate and redirect
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0, 
          y: 30, 
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            router.push('/admin/subcontractors');
          }
        });
      } else {
        router.push('/admin/subcontractors');
      }
    } catch (error) {
      console.error('Error deleting subcontractor:', error);
      setError('Failed to delete subcontractor. Please try again later.');
      setIsDeleting(false);
    }
  };
  
  // Format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Get rating color
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-blue-600';
    if (rating >= 2.5) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  // Get status badge data
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { 
          color: 'bg-green-100 text-green-800',
          icon: <Clock className="h-4 w-4 text-green-600 mr-1" />
        };
      case 'completed':
        return { 
          color: 'bg-blue-100 text-blue-800',
          icon: <CheckCircle className="h-4 w-4 text-blue-600 mr-1" />
        };
      case 'on-hold':
        return { 
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Clock className="h-4 w-4 text-yellow-600 mr-1" />
        };
      case 'cancelled':
        return { 
          color: 'bg-red-100 text-red-800',
          icon: <AlertTriangle className="h-4 w-4 text-red-600 mr-1" />
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800',
          icon: null
        };
    }
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Render if subcontractor not found
  if (!subcontractor) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Subcontractor not found</h3>
          <p className="text-gray-500 mb-4">The subcontractor you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/admin/subcontractors"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <span>Back to Subcontractors</span>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link 
            href="/admin/subcontractors" 
            className="text-gray-500 hover:text-gray-700 transition-colors mr-4"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Subcontractor Details
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/subcontractors/${id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Link>
          
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-4 py-2 bg-white border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
      
      <div className="space-y-6" ref={contentRef}>
        {/* Subcontractor Information */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{subcontractor.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Contact Information */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Users className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{subcontractor.contactPerson}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <a href={`mailto:${subcontractor.email}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                        {subcontractor.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-5 w-5 text-gray-400 mr-3" />
                      <a href={`tel:${subcontractor.phone}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                        {subcontractor.phone}
                      </a>
                    </div>
                    {subcontractor.address && (
                      <div className="flex items-start text-sm">
                        <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                        <span className="text-gray-900">{subcontractor.address}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Performance */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Performance</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Rating:</span>
                      <span className={`text-sm font-medium ${getRatingColor(subcontractor.performanceRating)}`}>
                        {subcontractor.performanceRating.toFixed(1)}/5
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Active Projects:</span>
                      <span className="text-sm font-medium">{subcontractor.activeProjects}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Completed Projects:</span>
                      <span className="text-sm font-medium">{subcontractor.completedProjects}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Specialties */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {subcontractor.specialties.map((specialty, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Notes */}
                {subcontractor.notes && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Notes</h3>
                    <p className="text-sm text-gray-900">{subcontractor.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Project History */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Project History</h3>
          </div>
          
          {subcontractor.projects.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {subcontractor.projects.map(project => (
                <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {project.title}
                      </Link>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusInfo(project.status).color}`}>
                          {getStatusInfo(project.status).icon}
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(project.startDate)} {project.endDate ? ` to ${formatDate(project.endDate)}` : ''}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LinkIcon className="h-4 w-4 mr-2" />
                      <span>View Project</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <Briefcase className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No projects assigned to this subcontractor yet.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete confirmation modal */}
      {isDeleteModalOpen && (
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
                Are you sure you want to delete <span className="font-medium">{subcontractor.name}</span>? This action cannot be undone.
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
                onClick={handleDeleteSubcontractor}
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