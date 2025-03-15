'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaSave, FaPlus, FaTimes, FaTag } from 'react-icons/fa'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast'

// Filter types
const filterTypes = [
  { value: 'industry', label: 'Industry' },
  { value: 'location', label: 'Location' },
  { value: 'revenue', label: 'Revenue (Total Invoices)' },
  { value: 'lastService', label: 'Last Service Date' },
  { value: 'serviceType', label: 'Service Type' },
  { value: 'certificateExpiry', label: 'Certificate Expiry' },
]

// Comparison operators
const comparisonOperators = [
  { value: 'eq', label: 'Equals', compatibleWith: ['industry', 'location', 'serviceType'] },
  { value: 'neq', label: 'Not Equals', compatibleWith: ['industry', 'location', 'serviceType'] },
  { value: 'contains', label: 'Contains', compatibleWith: ['industry', 'location', 'serviceType'] },
  { value: 'gt', label: 'Greater Than', compatibleWith: ['revenue', 'lastService', 'certificateExpiry'] },
  { value: 'lt', label: 'Less Than', compatibleWith: ['revenue', 'lastService', 'certificateExpiry'] },
  { value: 'gte', label: 'Greater Than or Equal', compatibleWith: ['revenue', 'lastService', 'certificateExpiry'] },
  { value: 'lte', label: 'Less Than or Equal', compatibleWith: ['revenue', 'lastService', 'certificateExpiry'] },
  { value: 'between', label: 'Between', compatibleWith: ['revenue', 'lastService', 'certificateExpiry'] },
]

// Industry options for dropdown
const industryOptions = [
  'Manufacturing',
  'Construction',
  'Oil and Gas',
  'Mining',
  'Food Processing',
  'Pharmaceutical',
  'Chemical',
  'Hospitality',
  'Healthcare',
  'Education',
  'Warehousing',
  'Agriculture',
  'Retail',
  'Transport',
]

// Interface for filter criteria
interface FilterCriterion {
  id: string
  type: string
  operator: string
  value: string
  value2?: string // For "between" operator
}

export default function NewSegmentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [segmentName, setSegmentName] = useState('')
  const [segmentDescription, setSegmentDescription] = useState('')
  const [filters, setFilters] = useState<FilterCriterion[]>([
    { id: '1', type: 'industry', operator: 'eq', value: '' }
  ])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  
  const router = useRouter()
  const { toast } = useToast()
