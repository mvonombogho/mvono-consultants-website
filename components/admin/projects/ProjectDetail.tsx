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
