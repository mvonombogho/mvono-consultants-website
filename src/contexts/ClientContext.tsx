'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { ClientData, ClientWithId } from '@/lib/clients'

// Define the context state type
interface ClientState {
  clients: ClientWithId[]
  loading: boolean
  error: string | null
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  filters: {
    search: string
    industry: string
    status: string
  }
}

// Define the context value type
interface ClientContextType extends ClientState {
  fetchClients: (page?: number, newFilters?: Partial<ClientState['filters']>) => Promise<void>
  createClient: (client: ClientData) => Promise<ClientWithId | null>
  updateClient: (id: string, client: ClientData) => Promise<ClientWithId | null>
  deleteClient: (id: string) => Promise<boolean>
  getClient: (id: string) => Promise<ClientWithId | null>
  setFilters: (filters: Partial<ClientState['filters']>) => void
  resetFilters: () => void
}

// Define action types
type ClientAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: { clients: ClientWithId[]; pagination: ClientState['pagination'] } }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'CREATE_SUCCESS'; payload: ClientWithId }
  | { type: 'UPDATE_SUCCESS'; payload: ClientWithId }
  | { type: 'DELETE_SUCCESS'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<ClientState['filters']> }
  | { type: 'RESET_FILTERS' }

// Initial state
const initialState: ClientState = {
  clients: [],
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  },
  filters: {
    search: '',
    industry: '',
    status: ''
  }
}

// Create context with default placeholder functions
const ClientContext = createContext<ClientContextType>({
  ...initialState,
  fetchClients: async () => {},
  createClient: async () => null,
  updateClient: async () => null,
  deleteClient: async () => false,
  getClient: async () => null,
  setFilters: () => {},
  resetFilters: () => {}
})

// Reducer function
function clientReducer(state: ClientState, action: ClientAction): ClientState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        clients: action.payload.clients,
        pagination: action.payload.pagination,
        error: null
      }
    
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    
    case 'CREATE_SUCCESS':
      return {
        ...state,
        clients: [action.payload, ...state.clients],
        pagination: {
          ...state.pagination,
          total: state.pagination.total + 1,
          totalPages: Math.ceil((state.pagination.total + 1) / state.pagination.limit)
        }
      }
    
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        clients: state.clients.map(client =>
          client.id === action.payload.id ? action.payload : client
        )
      }
    
    case 'DELETE_SUCCESS':
      return {
        ...state,
        clients: state.clients.filter(client => client.id !== action.payload),
        pagination: {
          ...state.pagination,
          total: state.pagination.total - 1,
          totalPages: Math.ceil((state.pagination.total - 1) / state.pagination.limit)
        }
      }
    
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, page: 1 } // Reset to page 1 when filters change
      }
    
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: { search: '', industry: '', status: '' },
        pagination: { ...state.pagination, page: 1 }
      }
    
    default:
      return state
  }
}

// Provider component
export function ClientProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(clientReducer, initialState)
  
  // Fetch clients function
  const fetchClients = async (page = 1, newFilters?: Partial<ClientState['filters']>) => {
    dispatch({ type: 'FETCH_START' })
    
    try {
      // Apply new filters if provided
      const currentFilters = newFilters 
        ? { ...state.filters, ...newFilters } 
        : state.filters
      
      // Build query params
      const params = new URLSearchParams()
      params.append('page', page.toString())
      params.append('limit', state.pagination.limit.toString())
      
      if (currentFilters.search) params.append('search', currentFilters.search)
      if (currentFilters.industry) params.append('industry', currentFilters.industry)
      if (currentFilters.status) params.append('status', currentFilters.status)
      
      // Make API request
      const response = await fetch(`/api/clients?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`Error fetching clients: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: {
          clients: data.clients,
          pagination: data.pagination
        }
      })
    } catch (error) {
      console.error('Error fetching clients:', error)
      dispatch({
        type: 'FETCH_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to fetch clients'
      })
    }
  }
  
  // Create client function
  const createClient = async (clientData: ClientData): Promise<ClientWithId | null> => {
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientData)
      })
      
      if (!response.ok) {
        throw new Error(`Error creating client: ${response.statusText}`)
      }
      
      const client = await response.json()
      
      dispatch({
        type: 'CREATE_SUCCESS',
        payload: client
      })
      
      return client
    } catch (error) {
      console.error('Error creating client:', error)
      dispatch({
        type: 'FETCH_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to create client'
      })
      return null
    }
  }
  
  // Update client function
  const updateClient = async (id: string, clientData: ClientData): Promise<ClientWithId | null> => {
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientData)
      })
      
      if (!response.ok) {
        throw new Error(`Error updating client: ${response.statusText}`)
      }
      
      const client = await response.json()
      
      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: client
      })
      
      return client
    } catch (error) {
      console.error('Error updating client:', error)
      dispatch({
        type: 'FETCH_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to update client'
      })
      return null
    }
  }
  
  // Delete client function
  const deleteClient = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error(`Error deleting client: ${response.statusText}`)
      }
      
      dispatch({
        type: 'DELETE_SUCCESS',
        payload: id
      })
      
      return true
    } catch (error) {
      console.error('Error deleting client:', error)
      dispatch({
        type: 'FETCH_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to delete client'
      })
      return false
    }
  }
  
  // Get single client function
  const getClient = async (id: string): Promise<ClientWithId | null> => {
    try {
      // Check if client is already in state
      const cachedClient = state.clients.find(client => client.id === id)
      if (cachedClient) return cachedClient
      
      // Otherwise fetch from API
      const response = await fetch(`/api/clients/${id}`)
      
      if (!response.ok) {
        throw new Error(`Error fetching client: ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching client:', error)
      dispatch({
        type: 'FETCH_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to fetch client'
      })
      return null
    }
  }
  
  // Filter setters
  const setFilters = (filters: Partial<ClientState['filters']>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters })
  }
  
  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' })
  }
  
  // Fetch clients on mount and when filters change
  useEffect(() => {
    fetchClients(state.pagination.page)
  }, [state.filters])
  
  return (
    <ClientContext.Provider
      value={{
        ...state,
        fetchClients,
        createClient,
        updateClient,
        deleteClient,
        getClient,
        setFilters,
        resetFilters
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

// Custom hook to use the client context
export function useClients() {
  const context = useContext(ClientContext)
  
  if (context === undefined) {
    throw new Error('useClients must be used within a ClientProvider')
  }
  
  return context
}
