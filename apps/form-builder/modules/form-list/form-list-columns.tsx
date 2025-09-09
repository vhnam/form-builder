import { type CellContext } from '@tanstack/react-table';
import { ReactNode, useMemo } from 'react';

import { format } from '@repo/core-ui/lib/day';

import { type IForm } from '@repo/form-ui/types/form';

import FormContextMenu from '@/components/form-context-menu';

import { Badge } from '@repo/core-ui/components/badge';

interface FormHandlers {
  handleEditForm: (form: IForm) => void;
  handleDuplicateForm: (form: IForm) => void;
  handleSelectForm: (form: IForm) => void;
  handleDeleteForm: (form: IForm) => void;
}

interface UseFormListColumnsProps {
  handlers: FormHandlers;
  getFieldsCount: (form: IForm) => number;
}

export const useFormListColumns = ({
  handlers,
  getFieldsCount,
}: UseFormListColumnsProps) => {
  const {
    handleEditForm,
    handleDuplicateForm,
    handleSelectForm,
    handleDeleteForm,
  } = handlers;

  return useMemo(
    () => [
      {
        id: 'form',
        header: 'Form',
        cell: ({ row }: CellContext<IForm, ReactNode>) => (
          <>
            <span className="block truncate font-medium">
              {row.original.title}
            </span>
            <span className="text-muted-foreground block truncate text-sm">
              {row.original.description}
            </span>
          </>
        ),
      },
      {
        id: 'statistics',
        header: 'Statistics',
        cell: ({ row }: CellContext<IForm, ReactNode>) => (
          <>
            <Badge variant="secondary" className="mx-1">
              {row.original.sections.length} sections
            </Badge>
            <Badge variant="secondary" className="mx-1">
              {getFieldsCount(row.original)} questions
            </Badge>
          </>
        ),
      },
      {
        id: 'createdAt',
        header: 'Created at',
        cell: ({ row }: CellContext<IForm, ReactNode>) => {
          const date = new Date(row.original.createdAt);
          return <span className="text-sm">{format(date, 'MMM d, yyyy')}</span>;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }: CellContext<IForm, ReactNode>) => (
          <FormContextMenu
            form={row.original}
            onSelect={handleSelectForm}
            onEdit={handleEditForm}
            onDuplicate={handleDuplicateForm}
            onDelete={handleDeleteForm}
          />
        ),
      },
    ],
    [
      handleEditForm,
      handleDuplicateForm,
      handleDeleteForm,
      handleSelectForm,
      getFieldsCount,
    ]
  );
};
