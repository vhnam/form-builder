'use client';

import useDeleteForm from '@/hooks/useDeleteForm';

import FormDeleteDialog from '@/components/form-delete-dialog';

import FormItem from './form-item';

import { recentForms } from '@/mocks/forms';

const FormList = () => {
  const { isOpen, closeDeleteFormDialog, onDeleteForm, openDeleteFormDialog } =
    useDeleteForm();

  return (
    <>
      <div className="flex flex-1">
        <div className="flex-1 p-6">
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="font-display text-lg font-semibold text-gray-900">
                Forms
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentForms.map((form) => (
                <FormItem
                  key={form.id}
                  form={form}
                  onDelete={openDeleteFormDialog}
                />
              ))}
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
