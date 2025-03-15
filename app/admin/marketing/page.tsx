import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Megaphone, Users, LineChart, Calendar, Mail } from 'lucide-react';
import Link from 'next/link';

export default function MarketingDashboardPage() {
  const marketingSections = [
    {
      title: 'Campaign Management',
      description: 'Create and manage marketing campaigns across multiple channels.',
      icon: <Megaphone className="h-8 w-8 text-blue-500" />,
      href: '/admin/marketing/campaigns',
      color: 'bg-blue-50 hover:bg-blue-100',
    },
    {
      title: 'Customer Segmentation',
      description: 'Group clients based on specific criteria for targeted marketing.',
      icon: <Users className="h-8 w-8 text-green-500" />,
      href: '/admin/marketing/segments',
      color: 'bg-green-50 hover:bg-green-100',
    },
    {
      title: 'Email Management',
      description: 'Create, send, and track email campaigns and communications.',
      icon: <Mail className="h-8 w-8 text-purple-500" />,
      href: '/admin/marketing/emails',
      color: 'bg-purple-50 hover:bg-purple-100',
    },
    {
      title: 'Analytics & Reporting',
      description: 'Track performance metrics and generate insights for your marketing efforts.',
      icon: <LineChart className="h-8 w-8 text-orange-500" />,
      href: '/admin/marketing/analytics',
      color: 'bg-orange-50 hover:bg-orange-100',
    },
    {
      title: 'Marketing Calendar',
      description: 'Plan, schedule, and visualize your marketing activities over time.',
      icon: <Calendar className="h-8 w-8 text-red-500" />,
      href: '/admin/marketing/calendar',
      color: 'bg-red-50 hover:bg-red-100',
    },
  ];

  return (
    <AdminLayout title="Marketing Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Marketing Management</h1>
          <p className="text-gray-500 mt-1">
            Create, manage, and track your marketing campaigns and communications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketingSections.map((section) => (
            <Link key={section.title} href={section.href}>
              <Card className={`h-full transition-all duration-200 ${section.color}`}>
                <CardHeader className="pb-2">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-white mb-2">
                    {section.icon}
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>Your latest marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Loading campaign data...</p>
                <Link href="/admin/marketing/campaigns">
                  <Button variant="outline" className="w-full">View All Campaigns</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common marketing tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                <Link href="/admin/marketing/campaigns/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Megaphone className="mr-2 h-4 w-4" />
                    Create New Campaign
                  </Button>
                </Link>
                <Link href="/admin/marketing/emails/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Compose Email
                  </Button>
                </Link>
                <Link href="/admin/marketing/segments/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Create Customer Segment
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
