'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, use } from 'react';

import { PRIVATE_ROUTES } from '@/constants/routes';

import { Button } from '@repo/core-ui/components/button';
import { EmptyState } from '@repo/core-ui/components/empty-state';

import FormRenderer from '@repo/form-ui/components/form-renderer';

import { PrivateLayoutHeader } from '@/layouts/private';

import { recentForms } from '@/mocks/forms';

interface FormPreviewPageProps {
  params: Promise<{ id: string }>;
}

interface FormPreviewLayoutProps extends PropsWithChildren {
  url: string;
}

const FormPreviewLayout = ({ children, url }: FormPreviewLayoutProps) => {
  return (
    <>
      <PrivateLayoutHeader
        title="Form preview"
        actions={
          <Link href={url}>
            <Button variant="outline" type="button">
              Back
            </Button>
          </Link>
        }
      />
      {children}
    </>
  );
};

const FormPreviewPage = ({ params }: FormPreviewPageProps) => {
  const router = useRouter();

  const { id } = use(params);
  const form = recentForms.find((form) => form.id === id);

  if (!form) {
    return (
      <FormPreviewLayout url={PRIVATE_ROUTES.forms.list}>
        <EmptyState
          title="Form not found"
          description="The form you are looking for does not exist."
          actionText="Go to forms"
          onAction={() => {
            router.push(PRIVATE_ROUTES.forms.list);
          }}
        />
      </FormPreviewLayout>
    );
  }

  return (
    <FormPreviewLayout url={PRIVATE_ROUTES.forms.edit.replace('[id]', id)}>
      <FormRenderer data={form} />
    </FormPreviewLayout>
  );
};

export default FormPreviewPage;
