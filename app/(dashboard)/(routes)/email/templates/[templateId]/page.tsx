import { Metadata } from 'next';
import EmailTemplateForm from '@/components/email/template-form';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Edit Email Template | Mvono Consultants',
  description: 'Edit email template'
};

export default async function EditEmailTemplatePage({
  params
}: {
  params: { templateId: string }
}) {
  const template = await prisma.emailTemplate.findUnique({
    where: {
      id: params.templateId
    }
  });

  if (!template) {
    throw new Error('Template not found');
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EmailTemplateForm initialData={template} />
      </div>
    </div>
  );
}
