'use client';

import { useState } from 'react';

export const useDeleteForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);

  const openDeleteDialog = (formId: string) => {
    setFormToDelete(formId);
    setIsOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsOpen(false);
    setFormToDelete(null);
  };

  const handleDeleteForm = () => {
    if (formToDelete) {
      // TODO: Implement actual delete logic here
      console.log('Deleting form:', formToDelete);
      closeDeleteDialog();
    }
  };

  return {
    isOpen,
    formToDelete,
    openDeleteDialog,
    closeDeleteDialog,
    onDeleteForm: handleDeleteForm,
  };
};
