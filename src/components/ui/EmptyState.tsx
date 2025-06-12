import React, { ReactNode } from 'react'
import { FaInbox } from 'react-icons/fa'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description: string
  action?: ReactNode
}

export default function EmptyState({ 
  icon = <FaInbox size={48} />, 
  title, 
  description, 
  action 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
      <div className="text-gray-400 mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 mb-6 max-w-md">
        {description}
      </p>
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  )
}
