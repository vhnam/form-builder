'use client';

import { FileTextIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { PRIVATE_ROUTES } from '@/constants/routes';

import { type IForm } from '@repo/form-ui/types/form';

import FormContextMenu from '@/components/form-context-menu';

import { Card, CardContent } from '@repo/core-ui/components/card';

interface RecentItemProps {
  form: IForm;
  onDelete: (form: IForm) => void;
}

const RecentItem = ({ form, onDelete }: RecentItemProps) => {
  const router = useRouter();

  const handleDeleteForm = (form: IForm) => {
    onDelete(form);
  };

  const handleEditForm = (form: IForm) => {
    router.push(PRIVATE_ROUTES.forms.edit.replace('[id]', form.id));
  };

  const handleDuplicateForm = (form: IForm) => {
    console.log(form);
  };

  const handleSelectForm = (form: IForm) => {
    router.push(PRIVATE_ROUTES.forms.preview.replace('[id]', form.id));
  };

  const formatDate = (dateString: number) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card
      key={form.id}
      className="group cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => handleSelectForm(form)}
    >
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <FileTextIcon className="h-8 w-8 text-blue-600" />
          <FormContextMenu
            form={form}
            onEdit={handleEditForm}
            onDuplicate={handleDuplicateForm}
            onDelete={handleDeleteForm}
          />
        </div>
        <h4 className="font-display mb-1 truncate font-medium text-gray-900">
          {form.title}
        </h4>
        <p className="text-xs text-gray-600">{formatDate(form.updatedAt)}</p>
      </CardContent>
    </Card>
  );
};

export default RecentItem;
