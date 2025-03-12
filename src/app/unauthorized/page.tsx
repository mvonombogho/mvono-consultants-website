'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaExclamationTriangle, FaLock } from 'react-icons/fa'
import { signOut } from 'next-auth/react'

export default function UnauthorizedPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Automatically redirect to home page after 10 seconds
    const timeout = setTimeout(() => {
      router.push('/')
    }, 10000)
    
    return () => clearTimeout(timeout)
  }, [router])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-red-100 p-3 rounded-full mb-4">
            <FaExclamationTriangle className="text-red-500 text-5xl" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-base text-gray-600">
            You do not have permission to access this page
          </p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex items-center justify-center mb-6">
            <FaLock className="text-gray-400 text-2xl mr-3" />
            <p className="text-sm text-gray-700">
              This page requires admin privileges
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Return to Homepage
            </Link>
            
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Sign Out
            </button>
          </div>
          
          <p className="mt-6 text-xs text-gray-500">
            You will be automatically redirected to the homepage in 10 seconds
          </p>
        </div>
      </div>
    </div>
  )
}
