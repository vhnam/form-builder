'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';

import { PRIVATE_ROUTES } from '@/constants/routes';

import EmptyState from '@repo/core-ui/components/empty-state';

import FormRenderer from '@repo/form-ui/components/form-renderer';

import { recentForms } from '@/mocks/forms';

interface FormPreviewPageProps {
  params: Promise<{ id: string }>;
}

const FormPreviewPage = ({ params }: FormPreviewPageProps) => {
  const router = useRouter();

  const { id } = use(params);
  const form = recentForms.find((form) => form.id === id);

  if (!form) {
    return (
      <EmptyState
        title="Form not found"
        description="The form you are looking for does not exist."
        actionText="Go to forms"
        onAction={() => {
          router.push(PRIVATE_ROUTES.forms.list);
        }}
      />
    );
  }

  return (
    <div>
      <FormRenderer data={form} />
    </div>
  );
};

export default FormPreviewPage;
