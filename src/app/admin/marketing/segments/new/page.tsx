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

  // Handle adding a new filter
  const addFilter = () => {
    const newId = (Math.max(0, ...filters.map(f => parseInt(f.id))) + 1).toString()
    setFilters([...filters, { id: newId, type: 'industry', operator: 'eq', value: '' }])
  }

  // Handle removing a filter
  const removeFilter = (id: string) => {
    if (filters.length > 1) {
      setFilters(filters.filter(filter => filter.id !== id))
    }
  }

  // Handle filter change
  const handleFilterChange = (id: string, field: string, value: string) => {
    setFilters(prevFilters => {
      return prevFilters.map(filter => {
        if (filter.id === id) {
          const updatedFilter = { ...filter, [field]: value }
          
          // Reset operator if necessary when changing filter type
          if (field === 'type') {
            const newType = value
            const currentOperator = filter.operator
            const isOperatorCompatible = comparisonOperators
              .find(op => op.value === currentOperator)
              ?.compatibleWith.includes(newType)
            
            if (!isOperatorCompatible) {
              // Set default operator based on new type
              if (['industry', 'location', 'serviceType'].includes(newType)) {
                updatedFilter.operator = 'eq'
              } else {
                updatedFilter.operator = 'gt'
              }
              updatedFilter.value = ''
            }
          }
          
          return updatedFilter
        }
        return filter
      })
    })
  }

  // Handle adding a tag
  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag('')
    }
  }

  // Handle removing a tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!segmentName) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a name for the segment',
        variant: 'destructive',
      })
      return
    }
    
    // Validate filters
    const invalidFilters = filters.filter(filter => !filter.value)
    if (invalidFilters.length > 0) {
      toast({
        title: 'Incomplete Filters',
        description: 'Please complete all filter criteria',
        variant: 'destructive',
      })
      return
    }
    
    try {
      setIsSubmitting(true)
      
      // Format the data for submission
      const segmentData = {
        name: segmentName,
        description: segmentDescription,
        criteria: JSON.stringify({ filters }),
        tags: tags.join(','),
        isActive: true,
      }
      
      // In production, this would be an API call
      // const response = await fetch('/api/segments', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(segmentData),
      // })
      
      // Mock success response
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: 'Success',
        description: 'Customer segment created successfully',
      })
      
      router.push('/admin/marketing/segments')
    } catch (error) {
      console.error('Error creating segment:', error)
      toast({
        title: 'Error',
        description: 'Failed to create customer segment',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render input based on filter type and operator
  const renderFilterValueInput = (filter: FilterCriterion) => {
    // Special case for industry type with equals/not equals operator
    if (filter.type === 'industry' && ['eq', 'neq'].includes(filter.operator)) {
      return (
        <select
          value={filter.value}
          onChange={(e) => handleFilterChange(filter.id, 'value', e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select Industry</option>
          {industryOptions.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      )
    }
    
    // Revenue needs number inputs
    if (filter.type === 'revenue') {
      if (filter.operator === 'between') {
        return (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filter.value}
              onChange={(e) => handleFilterChange(filter.id, 'value', e.target.value)}
            />
            <span>and</span>
            <Input
              type="number"
              placeholder="Max"
              value={filter.value2 || ''}
              onChange={(e) => handleFilterChange(filter.id, 'value2', e.target.value)}
            />
          </div>
        )
      }
      
      return (
        <Input
          type="number"
          placeholder="Value"
          value={filter.value}
          onChange={(e) => handleFilterChange(filter.id, 'value', e.target.value)}
        />
      )
    }
    
    // Date inputs for date-related filters
    if (['lastService', 'certificateExpiry'].includes(filter.type)) {
      if (filter.operator === 'between') {
        return (
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={filter.value}
              onChange={(e) => handleFilterChange(filter.id, 'value', e.target.value)}
            />
            <span>and</span>
            <Input
              type="date"
              value={filter.value2 || ''}
              onChange={(e) => handleFilterChange(filter.id, 'value2', e.target.value)}
            />
          </div>
        )
      }
      
      return (
        <Input
          type="date"
          value={filter.value}
          onChange={(e) => handleFilterChange(filter.id, 'value', e.target.value)}
        />
      )
    }
    
    // Default text input for other cases
    return (
      <Input
        placeholder="Value"
        value={filter.value}
        onChange={(e) => handleFilterChange(filter.id, 'value', e.target.value)}
      />
    )
  }
