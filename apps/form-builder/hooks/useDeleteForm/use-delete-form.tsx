'use client';

import { useState } from 'react';

const useDeleteForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);

  const openDeleteFormDialog = (formId: string) => {
    setFormToDelete(formId);
    setIsOpen(true);
  };

  const closeDeleteFormDialog = () => {
    setIsOpen(false);
    setFormToDelete(null);
  };

  const handleDeleteForm = () => {
    if (formToDelete) {
      // TODO: Implement actual delete logic here
      console.log('Deleting form:', formToDelete);
      closeDeleteFormDialog();
    }
  };

  return {
    isOpen,
    formToDelete,
    openDeleteFormDialog,
    closeDeleteFormDialog,
    onDeleteForm: handleDeleteForm,
  };
};

export default useDeleteForm;
