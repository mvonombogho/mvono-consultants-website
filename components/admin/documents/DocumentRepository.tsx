"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Download, 
  Trash2, 
  Eye, 
  Calendar, 
  Folder, 
  ArrowUpRight,
  AlertTriangle,
  Clock,
  CheckCircle,
  FolderPlus,
  FilePlus,
  Tag,
  Grid,
  List
} from 'lucide-react';

// Types
type DocumentType = 
  | 'certificate' 
  | 'report' 
  | 'invoice' 
  | 'contract' 
  | 'procedure' 
  | 'manual' 
  | 'form' 
  | 'other';

type DocumentCategory = 
  | 'safety' 
  | 'financial' 
  | 'legal' 
  | 'project' 
  | 'client' 
  | 'internal' 
  | 'other';

type Document = {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  documentType: DocumentType;
  category: DocumentCategory;
  clientId?: string;
  clientName?: string;
  projectId?: string;
  projectName?: string;
  uploadDate: string;
  uploadedBy: string;
  expiryDate?: string | null;
  tags: string[];
  description?: string;
  fileSize: number; // in bytes
};

type Folder = {
  id: string;
  name: string;
  type: 'client' | 'project' | 'category';
  documentCount: number;
};

// Sample data
const mockFolders: Folder[] = [
  { id: 'client-101', name: 'Unga Group', type: 'client', documentCount: 15 },
  { id: 'client-102', name: 'Tata Chemicals', type: 'client', documentCount: 8 },
  { id: 'client-103', name: 'Dormans Coffee', type: 'client', documentCount: 12 },
  { id: 'client-104', name: 'Radisson Blu', type: 'client', documentCount: 7 },
  { id: 'client-105', name: 'KTDA', type: 'client', documentCount: 10 },
  { id: 'project-1', name: 'Annual Fire Safety Audit', type: 'project', documentCount: 6 },
  { id: 'project-2', name: 'Environmental Impact Assessment', type: 'project', documentCount: 9 },
  { id: 'project-3', name: 'Energy Efficiency Audit', type: 'project', documentCount: 5 },
  { id: 'category-safety', name: 'Safety Documents', type: 'category', documentCount: 24 },
  { id: 'category-legal', name: 'Legal Documents', type: 'category', documentCount: 11 },
];

const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    title: 'Fire Safety Certificate - Unga Group HQ',
    fileName: 'unga_group_fire_safety_certificate_2023.pdf',
    fileType: 'pdf',
    documentType: 'certificate',
    category: 'safety',
    clientId: 'client-101',
    clientName: 'Unga Group',
    projectId: 'project-1',
    projectName: 'Annual Fire Safety Audit',
    uploadDate: '2023-07-15',
    uploadedBy: 'John Doe',
    expiryDate: '2024-07-15',
    tags: ['fire safety', 'certificate', 'compliant'],
    description: 'Annual fire safety certificate for Unga Group headquarters following inspection.',
    fileSize: 2456000
  },
  {
    id: 'doc-2',
    title: 'Environmental Compliance Report - Tata Chemicals',
    fileName: 'tata_chemicals_env_compliance_2023.pdf',
    fileType: 'pdf',
    documentType: 'report',
    category: 'safety',
    clientId: 'client-102',
    clientName: 'Tata Chemicals',
    projectId: 'project-2',
    projectName: 'Environmental Impact Assessment',
    uploadDate: '2023-08-22',
    uploadedBy: 'Jane Smith',
    expiryDate: null,
    tags: ['environment', 'compliance', 'assessment'],
    description: 'Environmental compliance assessment report for Tata Chemicals factory operations.',
    fileSize: 5245000
  },
  {
    id: 'doc-3',
    title: 'Energy Audit Final Report - Dormans Coffee',
    fileName: 'dormans_energy_audit_report_2023.pdf',
    fileType: 'pdf',
    documentType: 'report',
    category: 'project',
    clientId: 'client-103',
    clientName: 'Dormans Coffee',
    projectId: 'project-3',
    projectName: 'Energy Efficiency Audit',
    uploadDate: '2023-06-10',
    uploadedBy: 'Emily Wong',
    expiryDate: null,
    tags: ['energy', 'audit', 'efficiency'],
    description: 'Final report for the energy efficiency audit conducted at Dormans Coffee processing facility.',
    fileSize: 4789000
  },
  {
    id: 'doc-4',
    title: 'Occupational Safety Training Certificate',
    fileName: 'radisson_safety_training_cert_2023.pdf',
    fileType: 'pdf',
    documentType: 'certificate',
    category: 'safety',
    clientId: 'client-104',
    clientName: 'Radisson Blu',
    uploadDate: '2023-09-05',
    uploadedBy: 'John Doe',
    expiryDate: '2024-09-05',
    tags: ['training', 'safety', 'certificate'],
    description: 'Certificate confirming completion of occupational safety training for Radisson Blu staff.',
    fileSize: 1852000
  },
  {
    id: 'doc-5',
    title: 'Service Contract - KTDA',
    fileName: 'ktda_service_contract_2023.pdf',
    fileType: 'pdf',
    documentType: 'contract',
    category: 'legal',
    clientId: 'client-105',
    clientName: 'KTDA',
    uploadDate: '2023-04-18',
    uploadedBy: 'James Omondi',
    expiryDate: '2024-04-18',
    tags: ['contract', 'service', 'legal'],
    description: 'Annual service contract between Mvono Consultants and KTDA for safety services.',
    fileSize: 3126000
  },
  {
    id: 'doc-6',
    title: 'Fire Safety Procedures Manual',
    fileName: 'fire_safety_procedures_v2.pdf',
    fileType: 'pdf',
    documentType: 'manual',
    category: 'internal',
    uploadDate: '2023-03-12',
    uploadedBy: 'Emily Wong',
    expiryDate: null,
    tags: ['procedure', 'fire safety', 'manual'],
    description: 'Internal procedures manual for conducting fire safety audits.',
    fileSize: 8541000
  },
  {
    id: 'doc-7',
    title: 'NEMA Compliance Templates',
    fileName: 'nema_compliance_templates_2023.xlsx',
    fileType: 'xlsx',
    documentType: 'form',
    category: 'internal',
    uploadDate: '2023-02-28',
    uploadedBy: 'James Omondi',
    expiryDate: null,
    tags: ['template', 'NEMA', 'compliance'],
    description: 'Excel templates for NEMA compliance documentation.',
    fileSize: 1254000
  },
  {
    id: 'doc-8',
    title: 'Pressure Vessel Inspection Report - Unga Group',
    fileName: 'unga_pressure_vessel_report_2023.pdf',
    fileType: 'pdf',
    documentType: 'report',
    category: 'safety',
    clientId: 'client-101',
    clientName: 'Unga Group',
    uploadDate: '2023-07-28',
    uploadedBy: 'Daniel Kimani',
    expiryDate: null,
    tags: ['pressure vessel', 'inspection', 'report'],
    description: 'Inspection report for pressure vessels at Unga Group manufacturing facility.',
    fileSize: 4126000
  },
  {
    id: 'doc-9',
    title: 'Noise Level Assessment - Dormans Coffee',
    fileName: 'dormans_noise_assessment_2023.pdf',
    fileType: 'pdf',
    documentType: 'report',
    category: 'safety',
    clientId: 'client-103',
    clientName: 'Dormans Coffee',
    uploadDate: '2023-05-15',
    uploadedBy: 'Jane Smith',
    expiryDate: null,
    tags: ['noise', 'assessment', 'safety'],
    description: 'Noise level assessment report for Dormans Coffee processing plant.',
    fileSize: 3752000
  },
  {
    id: 'doc-10',
    title: 'Staff Training Records - Radisson Blu',
    fileName: 'radisson_training_records_2023.xlsx',
    fileType: 'xlsx',
    documentType: 'other',
    category: 'client',
    clientId: 'client-104',
    clientName: 'Radisson Blu',
    uploadDate: '2023-09-10',
    uploadedBy: 'John Doe',
    expiryDate: null,
    tags: ['training', 'records', 'staff'],
    description: 'Training records for Radisson Blu staff who participated in safety training.',
    fileSize: 2841000
  }
];
