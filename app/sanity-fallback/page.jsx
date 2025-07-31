'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function SanityFallback() {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading for a better UI experience
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-700">Checking Sanity configuration...</p>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sanity Studio Access</h1>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            There are multiple ways to access your Sanity Studio for the Mvono Consultants project:
          </p>
          
          <ul className="space-y-3">
            <li className="border-l-4 border-blue-500 pl-4 py-2">
              <strong className="block text-gray-800">Option 1: Local Studio</strong>
              <p className="text-gray-600 text-sm mt-1">
                Access the locally hosted Sanity Studio in your Next.js app.
              </p>
              <Link href="/studio" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm inline-block mt-2">
                Open Local Studio
              </Link>
            </li>
            
            <li className="border-l-4 border-green-500 pl-4 py-2">
              <strong className="block text-gray-800">Option 2: Hosted Studio</strong>
              <p className="text-gray-600 text-sm mt-1">
                Access the hosted version of your Sanity Studio (works even if local setup has issues).
              </p>
              <a 
                href="https://k6xvho7h.sanity.studio/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm inline-block mt-2"
              >
                Open Hosted Studio
              </a>
            </li>
            
            <li className="border-l-4 border-purple-500 pl-4 py-2">
              <strong className="block text-gray-800">Option 3: Sanity Manage</strong>
              <p className="text-gray-600 text-sm mt-1">
                Access your project settings, API tokens, and dataset management.
              </p>
              <a 
                href="https://www.sanity.io/manage/project/k6xvho7h" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded text-sm inline-block mt-2"
              >
                Open Sanity Manage
              </a>
            </li>
          </ul>
        </div>
        
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">
            Project ID: <code className="bg-gray-100 px-1 py-0.5 rounded">k6xvho7h</code>
            <br />
            Dataset: <code className="bg-gray-100 px-1 py-0.5 rounded">production</code>
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-500 hover:underline">
          Return to Homepage
        </Link>
        <span className="mx-2 text-gray-400">|</span>
        <Link href="/test-sanity" className="text-blue-500 hover:underline">
          Test Sanity Connection
        </Link>
      </div>
    </div>
  )
}
