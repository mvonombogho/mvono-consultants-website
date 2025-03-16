import { Metadata } from 'next';
import EmailTemplateForm from '@/components/email/template-form';

export const metadata: Metadata = {
  title: 'Create Email Template | Mvono Consultants',
  description: 'Create a new email template'
};

export default async function NewEmailTemplatePage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EmailTemplateForm />
      </div>
    </div>
  );
}
