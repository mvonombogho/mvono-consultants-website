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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mr-4"
          >
            <FaArrowLeft className="mr-2" /> Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Create Customer Segment</h1>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center"
        >
          <FaSave className="mr-2" />
          {isSubmitting ? 'Saving...' : 'Save Segment'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Segment Details</CardTitle>
            <CardDescription>
              Create a named segment to group clients based on specific criteria
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="segmentName">Segment Name *</Label>
              <Input
                id="segmentName"
                placeholder="e.g., High-Value Manufacturing Clients"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="segmentDescription">Description</Label>
              <textarea
                id="segmentDescription"
                placeholder="Describe the purpose of this segment"
                value={segmentDescription}
                onChange={(e) => setSegmentDescription(e.target.value)}
                className="w-full h-24 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Filter Criteria</CardTitle>
            <CardDescription>
              Define the rules for client inclusion in this segment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {filters.map((filter, index) => (
              <div 
                key={filter.id}
                className="p-4 border border-gray-200 rounded-lg space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Filter {index + 1}</h3>
                  {filters.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFilter(filter.id)}
                      className="h-8 px-2 text-red-600 hover:text-red-700"
                    >
                      <FaTimes size={14} />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Field</Label>
                    <select
                      value={filter.type}
                      onChange={(e) => handleFilterChange(filter.id, 'type', e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      {filterTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Operator</Label>
                    <select
                      value={filter.operator}
                      onChange={(e) => handleFilterChange(filter.id, 'operator', e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      {comparisonOperators
                        .filter(op => op.compatibleWith.includes(filter.type))
                        .map((operator) => (
                          <option key={operator.value} value={operator.value}>
                            {operator.label}
                          </option>
                        ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Value</Label>
                    {renderFilterValueInput(filter)}
                  </div>
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={addFilter}
              className="mt-4"
            >
              <FaPlus className="mr-2" /> Add Filter
            </Button>
            
            <div className="p-4 bg-gray-50 rounded-md mt-6">
              <h3 className="font-medium text-gray-800 mb-2">Segment Summary</h3>
              <p className="text-sm text-gray-600">
                This segment will include clients that match:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
                {filters.map((filter, index) => {
                  const fieldLabel = filterTypes.find(t => t.value === filter.type)?.label
                  const operatorLabel = comparisonOperators.find(o => o.value === filter.operator)?.label
                  
                  return (
                    <li key={filter.id}>
                      {fieldLabel} {operatorLabel?.toLowerCase()} <strong>{filter.value}</strong>
                      {filter.operator === 'between' && filter.value2 && (
                        <> and <strong>{filter.value2}</strong></>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>
              Add optional tags to help organize and search for this segment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div 
                    key={tag}
                    className="flex items-center gap-1 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
                  >
                    <FaTag size={12} />
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-primary-700 hover:text-primary-900"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag (e.g., high-value, needs-renewal)"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addTag}
                  disabled={!newTag}
                >
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            className="px-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Segment...' : 'Create Segment'}
          </Button>
        </div>
      </form>
    </div>
  )
}
