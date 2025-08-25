'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import ClientManagement from '../../../components/admin/ClientManagement'

export default function AdminClientsPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    redirect('/admin')
  }

  return <ClientManagement />
}
