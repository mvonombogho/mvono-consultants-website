"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Edit,
  FileText,
  Trash2,
  CheckCircle,
  XCircle,
  PauseCircle,
  AlertCircle,
  ListTodo,
  Plus,
  X,
  AlertTriangle,
  Loader2
} from 'lucide-react';

// Types
type Project = {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  startDate: string;
  endDate: string | null;
  status: 'active' | 'completed' | 'cancelled' | 'on-hold';
  totalValue: number;
  completionPercentage: number;
  notes: string;
  subcontractors: {
    id: string;
    name: string;
  }[];
  tasks: {
    id: string;
    title: string;
    status: 'todo' | 'in_progress' | 'completed';
    dueDate: string | null;
    assignedTo: string | null;
  }[];
  invoices: {
    id: string;
    invoiceNumber: string;
    date: string;
    amount: number;
    status: 'draft' | 'sent' | 'paid' | 'overdue';
  }[];
};

// Props for the component
type ProjectDetailProps = {
  id: string;
};

export default function ProjectDetail({ id }: ProjectDetailProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs for GSAP animations
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);
  
  // Load project data
  useEffect(() => {
    const loadProject = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock project data
          setProject({
            id,
            title: 'Environmental Impact Assessment',
            description: 'Comprehensive assessment of environmental impact for the new manufacturing facility at Tata Chemicals. This includes soil testing, air quality analysis, water impact assessment, and biodiversity impact study.',
            clientId: '102',
            clientName: 'Tata Chemicals',
            startDate: '2023-06-01',
            endDate: null,
            status: 'active',
            totalValue: 380000,
            completionPercentage: 65,
            notes: 'Client requested additional soil testing. Extended timeline approved by management. The project is currently ahead of schedule.',
            subcontractors: [
              { id: '202', name: 'EcoSystems Consultants' },
              { id: '203', name: 'GreenTech Analysis' },
            ],
            tasks: [
              { id: '301', title: 'Initial site assessment', status: 'completed', dueDate: '2023-06-10', assignedTo: 'John Doe' },
              { id: '302', title: 'Soil sample collection', status: 'completed', dueDate: '2023-06-20', assignedTo: 'Jane Smith' },
              { id: '303', title: 'Water quality analysis', status: 'in_progress', dueDate: '2023-07-05', assignedTo: 'John Doe' },
              { id: '304', title: 'Air quality assessment', status: 'todo', dueDate: '2023-07-15', assignedTo: null },
              { id: '305', title: 'Final report preparation', status: 'todo', dueDate: '2023-07-30', assignedTo: null },
            ],
            invoices: [
              { id: '401', invoiceNumber: 'INV-2023-042', date: '2023-06-05', amount: 150000, status: 'paid' },
              { id: '402', invoiceNumber: 'INV-2023-067', date: '2023-07-01', amount: 120000, status: 'sent' },
            ],
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading project:', error);
        setIsLoading(false);
      }
    };
    
    loadProject();
  }, [id]);
  
  // GSAP animations
  useEffect(() => {
    if (!isLoading && project && headerRef.current && tabsRef.current && contentRef.current) {
      // Animate header
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
      
      // Animate tabs
      gsap.fromTo(tabsRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: "power2.out" }
      );
      
      // Animate content
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: "power2.out" }
      );
    }
  }, [isLoading, project, activeTab]);
  
  // Modal animations
  useEffect(() => {
    if (isDeleteModalOpen && modalRef.current && modalBackdropRef.current) {
      // Animate backdrop
      gsap.fromTo(modalBackdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      
      // Animate modal
      gsap.fromTo(modalRef.current,
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
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Get status badge color and icon
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
          icon: <PauseCircle className="h-4 w-4 text-yellow-600 mr-1" />
        };
      case 'cancelled':
        return { 
          color: 'bg-red-100 text-red-800',
          icon: <XCircle className="h-4 w-4 text-red-600 mr-1" />
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800',
          icon: <AlertCircle className="h-4 w-4 text-gray-600 mr-1" />
        };
    }
  };
  
  // Get task status badge color and icon
  const getTaskStatusInfo = (status: string) => {
    switch (status) {
      case 'todo':
        return { 
          color: 'bg-gray-100 text-gray-800',
          icon: <ListTodo className="h-4 w-4 text-gray-600 mr-1" />
        };
      case 'in_progress':
        return { 
          color: 'bg-blue-100 text-blue-800',
          icon: <Clock className="h-4 w-4 text-blue-600 mr-1" />
        };
      case 'completed':
        return { 
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800',
          icon: <AlertCircle className="h-4 w-4 text-gray-600 mr-1" />
        };
    }
  };
  
  // Get invoice status badge color
  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Handle project deletion
  const handleDeleteProject = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Successful deletion animation
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0, 
          y: 30, 
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            // Navigate back to projects list
            router.push('/admin/projects');
          }
        });
      } else {
        router.push('/admin/projects');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setError('Failed to delete project. Please try again later.');
      setIsDeleting(false);
    }
  };
