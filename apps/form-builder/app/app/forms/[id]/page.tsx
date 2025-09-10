'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';

import { PRIVATE_ROUTES } from '@/constants/routes';

import { Button } from '@repo/core-ui/components/button';
import { EmptyState } from '@repo/core-ui/components/empty-state';

import { PrivateLayoutHeader } from '@/layouts/private';

import FormEdit from '@/modules/form-edit';

import { recentForms } from '@/mocks/forms';

interface FormDetailsPageProps {
  params: Promise<{ id: string }>;
}

const FormDetailsPage = ({ params }: FormDetailsPageProps) => {
  const router = useRouter();

  const { id } = use(params);
  const form = recentForms.find((form) => form.id === id);

  if (!form) {
    return (
      <>
        <PrivateLayoutHeader
          title="Form edit"
          actions={
            <Link href={PRIVATE_ROUTES.forms.list}>
              <Button variant="outline" type="button">
                Back
              </Button>
            </Link>
          }
        />
        <EmptyState
          title="Form not found"
          description="The form you are looking for does not exist."
          actionText="Go to forms"
          onAction={() => {
            router.push(PRIVATE_ROUTES.forms.list);
          }}
        />
      </>
    );
  }

  return (
    <>
      <PrivateLayoutHeader
        title="Form edit"
        actions={
          <div className="flex items-center gap-2">
            <Link href={PRIVATE_ROUTES.forms.list}>
              <Button variant="outline" type="button">
                Back
              </Button>
            </Link>
            <Button variant="default" type="button">
              Save
            </Button>
          </div>
        }
      />
      <FormEdit />
    </>
  );
};

export default FormDetailsPage;
