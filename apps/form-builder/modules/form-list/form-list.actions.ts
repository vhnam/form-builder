import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { PRIVATE_ROUTES } from '@/constants/routes';

import useDeleteForm from '@/hooks/use-delete-form';

import { type IForm } from '@repo/form-ui/types/form';

export const useFormListActions = () => {
  const router = useRouter();
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

  const handleSelectForm = useCallback(
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

  return {
    handlers: {
      handleEditForm,
      handleDuplicateForm,
      handleSelectForm,
      handleDeleteForm,
    },
    deleteDialog: {
      isOpen,
      closeDeleteFormDialog,
      onDeleteForm,
    },
  };
};
