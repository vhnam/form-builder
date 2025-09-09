'use client';

import useDeleteForm from '@/hooks/use-delete-form';

import FormDeleteDialog from '@/components/form-delete-dialog';

import NewItem from './new-item';
import RecentItem from './recent-item';

import { recentForms } from '@/mocks/forms';

const Dashboard = () => {
  const { isOpen, closeDeleteFormDialog, onDeleteForm, openDeleteFormDialog } =
    useDeleteForm();

  return (
    <>
      <div className="flex flex-1">
        <div className="flex-1 p-6">
          <div className="mb-8">
            <h3 className="font-display mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Start a new form
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              <NewItem />
            </div>
          </div>

          {recentForms.length > 0 && (
            <div>
              <h3 className="font-display mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Recent forms
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                {recentForms.map((form) => (
                  <RecentItem
                    key={form.id}
                    form={form}
                    onDelete={openDeleteFormDialog}
                  />
                ))}
              </div>
            </div>
          )}
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

export default Dashboard;
