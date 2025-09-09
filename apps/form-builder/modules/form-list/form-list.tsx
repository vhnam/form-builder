'use client';

import {
  type CellContext,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';

import { PRIVATE_ROUTES } from '@/constants/routes';

import { format } from '@repo/core-ui/lib/day';
import { sortBy, sumBy } from '@repo/core-ui/lib/lodash';

import useDeleteForm from '@/hooks/use-delete-form';

import { type IForm } from '@repo/form-ui/types/form';

import FormContextMenu from '@/components/form-context-menu';
import FormDeleteDialog from '@/components/form-delete-dialog';
import TablePagination from '@/components/table-pagination';

import { Badge } from '@repo/core-ui/components/badge';
import { Input } from '@repo/core-ui/components/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/core-ui/components/table';

import { recentForms } from '@/mocks/forms';

const FormList = () => {
  const router = useRouter();

  const fieldsCountCache = useRef(new Map<string, number>());

  const { isOpen, closeDeleteFormDialog, onDeleteForm, openDeleteFormDialog } =
    useDeleteForm();

  const handleEditForm = useCallback(
    (form: IForm) => {
      router.push(PRIVATE_ROUTES.forms.edit.replace('[id]', form.id));
    },
    [router]
  );

  const handleDuplicateForm = useCallback((form: IForm) => {
    console.log(form);
  }, []);

  const handlePreviewForm = useCallback(
    (form: IForm) => {
      router.push(PRIVATE_ROUTES.forms.preview.replace('[id]', form.id));
    },
    [router]
  );

  const handleDeleteForm = useCallback(
    (form: IForm) => {
      openDeleteFormDialog(form);
    },
    [openDeleteFormDialog]
  );

  const getFieldsCount = useCallback(
    (form: IForm) => {
      if (!fieldsCountCache.current.has(form.id)) {
        const count = sumBy(form.sections, (section) => section.fields.length);
        fieldsCountCache.current.set(form.id, count);
      }
      return fieldsCountCache.current.get(form.id)!;
    },
    [fieldsCountCache]
  );

  const columns = useMemo(
    () => [
      {
        id: 'form',
        header: 'Form',
        cell: ({ row }: CellContext<IForm, string>) => (
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
        cell: ({ row }: CellContext<IForm, string>) => (
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
        cell: ({ row }: CellContext<IForm, string>) => {
          const date = new Date(row.original.createdAt);
          return <span className="text-sm">{format(date, 'MMM d, yyyy')}</span>;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }: CellContext<IForm, string>) => (
          <FormContextMenu
            form={row.original}
            onPreview={handlePreviewForm}
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
      handlePreviewForm,
      getFieldsCount,
    ]
  );

  const sortedData = useMemo(
    () => sortBy(recentForms, 'updatedAt').reverse(),
    []
  );

  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <>
      <div className="flex flex-1">
        <div className="flex-1 p-6">
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-gray-100">
              Forms
            </h3>
            <div className="flex items-center justify-between">
              <Input placeholder="Filter..." className="max-w-sm" />
              <div className="flex items-center gap-4"></div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
              <TablePagination table={table} />
            </div>
          </div>
        </div>
      </div>

      <FormDeleteDialog
        isOpen={isOpen}
        onClose={closeDeleteFormDialog}
        onDeleteForm={onDeleteForm}
      />
    </>
  );
};

export default FormList;
