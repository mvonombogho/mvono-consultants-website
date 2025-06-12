import { NextRequest, NextResponse } from 'next/server'
import { getClientStats } from '@/lib/clients'
import { getServerSession } from 'next-auth'

// GET /api/clients/stats
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Get client statistics
    const stats = await getClientStats()
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching client statistics:', error)
    return NextResponse.json({ error: 'Failed to fetch client statistics' }, { status: 500 })
  }
}
