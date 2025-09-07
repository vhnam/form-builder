'use client';

import {
  CopyIcon,
  Edit3Icon,
  FileTextIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { privateRoutes } from '@/constants/routes';

import type { IForm, ISection } from '@repo/form-ui/types/form';

import { Button } from '@repo/core-ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/core-ui/components/dropdown-menu';

interface FormItemProps {
  form: IForm;
  onDelete: (formId: string) => void;
}

const FormItem = ({ form, onDelete }: FormItemProps) => {
  const router = useRouter();

  const numberOfQuestions = useMemo(() => {
    return form.sections.reduce(
      (acc, section: ISection) => acc + section.fields.length,
      0
    );
  }, [form]);

  const handleDeleteFormId = (formId: string) => {
    onDelete(formId);
  };

  const handleEditForm = (form: IForm) => {
    router.push(privateRoutes.forms.edit.replace('[id]', form.id));
  };

  const handleDuplicateForm = (form: IForm) => {
    console.log(form);
  };

  const handleSelectForm = (form: IForm) => {
    router.push(privateRoutes.forms.preview.replace('[id]', form.id));
  };

  const formatDate = (dateString: number) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <div
        key={form.id}
        className="flex cursor-pointer items-center justify-between px-6 py-4 hover:bg-gray-50"
        onClick={() => handleSelectForm(form)}
      >
        <div className="flex items-center gap-4">
          <FileTextIcon className="h-6 w-6 text-blue-600" />
          <div>
            <h4 className="font-medium text-gray-900">{form.title}</h4>
            <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
              <span>{numberOfQuestions} questions</span>
              {form.sections.length > 0 && (
                <span>{form.sections.length} sections</span>
              )}
              <span>Modified {formatDate(form.updatedAt)}</span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleEditForm(form);
              }}
            >
              <Edit3Icon className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleDuplicateForm(form);
              }}
            >
              <CopyIcon className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFormId(form.id);
              }}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2Icon className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default FormItem;
