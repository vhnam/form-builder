'use client';

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { sortBy, sumBy } from '@repo/core-ui/lib/lodash';

import { type IForm } from '@repo/form-ui/types/form';

import FormDeleteDialog from '@/components/form-delete-dialog';
import TablePagination from '@/components/table-pagination';

import { Input } from '@repo/core-ui/components/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/core-ui/components/table';

import { useFormListColumns } from './form-list-columns';
import { useFormListActions } from './form-list.actions';

import { recentForms } from '@/mocks/forms';

const FormList = () => {
  // TODO: update later with real data
  const fieldsCountMap = useMemo(() => {
    const map = new Map<string, number>();
    recentForms.forEach((form) => {
      map.set(
        form.id,
        sumBy(form.sections, (section) => section.fields.length)
      );
    });
    return map;
  }, []);

  const getFieldsCount = useCallback(
    (form: IForm) => fieldsCountMap.get(form.id) ?? 0,
    [fieldsCountMap]
  );

  const { handlers, deleteDialog } = useFormListActions();
  const columns = useFormListColumns({ handlers, getFieldsCount });

  // TODO: update later with real data
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
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Forms
            </h3>
            {/* TODO: add filter and sort for Input later */}
            <div className="flex items-center justify-between">
              <Input placeholder="Filter..." className="max-w-sm" />
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
                      <TableRow key={row.id}>
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
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.closeDeleteFormDialog}
        onDeleteForm={deleteDialog.onDeleteForm}
      />
    </>
  );
};

export default FormList;
