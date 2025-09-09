'use client';

import { useCallback, useState } from 'react';

import { type IForm } from '@repo/form-ui/types/form';

const useDeleteForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);

  const openDeleteFormDialog = useCallback((form: IForm) => {
    setFormToDelete(form.id);
    setIsOpen(true);
  }, []);

  const closeDeleteFormDialog = useCallback(() => {
    setIsOpen(false);
    setFormToDelete(null);
  }, []);

  const handleDeleteForm = useCallback(() => {
    if (formToDelete) {
      closeDeleteFormDialog();
    }
  }, [formToDelete, closeDeleteFormDialog]);

  return {
    isOpen,
    formToDelete,
    openDeleteFormDialog,
    closeDeleteFormDialog,
    onDeleteForm: handleDeleteForm,
  };
};

export default useDeleteForm;
