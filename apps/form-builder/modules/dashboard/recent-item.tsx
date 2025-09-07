'use client';

import {
  CopyIcon,
  Edit3Icon,
  FileTextIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { privateRoutes } from '@/constants/routes';

import { type IForm } from '@repo/form-ui/types/form';

import { Button } from '@repo/core-ui/components/button';
import { Card, CardContent } from '@repo/core-ui/components/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/core-ui/components/dropdown-menu';

interface RecentItemProps {
  form: IForm;
  onDelete: (formId: string) => void;
}

const RecentItem = ({ form, onDelete }: RecentItemProps) => {
  const router = useRouter();

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
    <Card
      key={form.id}
      className="group cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => handleSelectForm(form)}
    >
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <FileTextIcon className="h-8 w-8 text-blue-600" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditForm(form);
                }}
              >
                <Edit3Icon className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleDuplicateForm(form);
                }}
              >
                <CopyIcon className="mr-2 size-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFormId(form.id);
                }}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2Icon className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <h4 className="mb-1 truncate font-medium text-gray-900">
          {form.title}
        </h4>
        <p className="text-xs text-gray-600">{formatDate(form.updatedAt)}</p>
      </CardContent>
    </Card>
  );
};

export default RecentItem;
