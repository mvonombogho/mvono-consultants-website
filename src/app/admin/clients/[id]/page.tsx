'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  FaEdit, 
  FaTrash, 
  FaFileInvoice, 
  FaArrowLeft, 
  FaClipboardList,
  FaSpinner 
} from 'react-icons/fa'
import { useClients } from '@/contexts/ClientContext'
import { useRouter } from 'next/navigation'

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getClient, deleteClient } = useClients()
  
  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }
  
  // Load client data
  useEffect(() => {
    const loadClient = async () => {
      try {
        const clientData = await getClient(params.id)
        if (clientData) {
          setClient(clientData)
        } else {
          setError('Client not found')
        }
      } catch (error) {
        console.error('Error loading client:', error)
        setError('Failed to load client data')
      } finally {
        setLoading(false)
      }
    }
    
    loadClient()
  }, [getClient, params.id])
  
  // Handle client delete
  const handleDeleteClient = async () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        const success = await deleteClient(params.id)
        if (success) {
          router.push('/admin/clients')
        } else {
          setError('Failed to delete client')
        }
      } catch (error) {
        console.error('Error deleting client:', error)
        setError('An error occurred while deleting the client')
      }
    }
  }
