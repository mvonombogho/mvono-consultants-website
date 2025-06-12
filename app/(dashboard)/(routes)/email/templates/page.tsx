import { Metadata } from 'next';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import EmailTemplateList from '@/components/email/template-list';

export const metadata: Metadata = {
  title: 'Email Templates | Mvono Consultants',
  description: 'Manage your email templates'
};

export default async function EmailTemplatesPage() {
  const templates = await prisma.emailTemplate.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Email Templates (${templates.length})`}
            description="Manage your email templates for different purposes"
          />
          <Link href="/email/templates/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </Link>
        </div>
        <Separator />
        <EmailTemplateList data={templates} />
      </div>
    </div>
  );
}
