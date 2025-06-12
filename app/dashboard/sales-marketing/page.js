import Link from 'next/link';
import { UserPlus, FileText, BarChart2, TrendingUp, Mail, CheckSquare, TagsIcon, PieChart } from 'lucide-react';

export const metadata = {
  title: 'Sales & Marketing | Mvono Consultants',
  description: 'Manage your sales and marketing activities to grow your business.',
};

const salesMarketingModules = [
  {
    title: 'Lead Management',
    description: 'Track, qualify, and manage potential client leads efficiently.',
    icon: UserPlus,
    href: '/dashboard/leads',
    color: 'bg-purple-500',
    metrics: [
      { label: 'Total Leads', value: '23' },
      { label: 'New This Month', value: '8' },
      { label: 'Qualified Leads', value: '14' }
    ]
  },
  {
    title: 'Sales Pipeline',
    description: 'Monitor your sales opportunities from leads to closed deals.',
    icon: PieChart,
    href: '/dashboard/sales-pipeline',
    color: 'bg-blue-500',
    metrics: [
      { label: 'Active Deals', value: '12' },
      { label: 'Pipeline Value', value: 'KSh 3.5M' },
      { label: 'Closing This Month', value: '4' }
    ]
  },
  {
    title: 'Proposal Management',
    description: 'Create, track, and manage client proposals efficiently.',
    icon: FileText,
    href: '/dashboard/proposals',
    color: 'bg-green-500',
    metrics: [
      { label: 'Total Proposals', value: '19' },
      { label: 'Acceptance Rate', value: '73%' },
      { label: 'Drafts Pending', value: '4' }
    ]
  },
  {
    title: 'Marketing Campaigns',
    description: 'Plan and execute targeted marketing initiatives.',
    icon: Mail,
    href: '/dashboard/marketing',
    color: 'bg-amber-500',
    metrics: [
      { label: 'Active Campaigns', value: '3' },
      { label: 'Leads Generated', value: '27' },
      { label: 'Engagement Rate', value: '18%' }
    ],
    comingSoon: true
  },
  {
    title: 'Customer Segmentation',
    description: 'Group clients for targeted marketing and sales efforts.',
    icon: TagsIcon,
    href: '/dashboard/segmentation',
    color: 'bg-indigo-500',
    metrics: [
      { label: 'Segments Created', value: '5' },
      { label: 'Contacts Mapped', value: '86%' },
      { label: 'Top Segment', value: 'Manufacturing' }
    ],
    comingSoon: true
  },
  {
    title: 'Sales Analytics',
    description: 'Analyze sales performance and identify growth opportunities.',
    icon: BarChart2,
    href: '/dashboard/sales-analytics',
    color: 'bg-rose-500',
    metrics: [
      { label: 'Conversion Rate', value: '22%' },
      { label: 'Avg. Deal Cycle', value: '18 days' },
      { label: 'Growth (YoY)', value: '+15%' }
    ],
    comingSoon: true
  },
];

export default function SalesMarketingPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Sales & Marketing</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your sales pipeline and marketing activities to drive business growth.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {salesMarketingModules.map((module) => (
          <div 
            key={module.title}
            className="bg-white rounded-lg shadow overflow-hidden transition hover:shadow-md relative"
          >
            {module.comingSoon && (
              <div className="absolute top-3 right-3 bg-gray-100 text-gray-800 text-xs py-1 px-2 rounded-full">
                Coming Soon
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className={`flex-shrink-0 rounded-md p-3 ${module.color}`}>
                  <module.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">{module.title}</h2>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-5">{module.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-5">
                {module.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{metric.value}</p>
                    <p className="text-xs text-gray-500">{metric.label}</p>
                  </div>
                ))}
              </div>
              
              {module.comingSoon ? (
                <button 
                  disabled
                  className="w-full bg-gray-100 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed"
                >
                  Coming in Phase 6
                </button>
              ) : (
                <Link 
                  href={module.href}
                  className="w-full block text-center bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition"
                >
                  Open {module.title}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
