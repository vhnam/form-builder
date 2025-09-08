import { FileTextIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { PRIVATE_ROUTES } from '@/constants/routes';

import type { IForm, ISection } from '@repo/form-ui/types/form';

import FormContextMenu from '@/components/form-context-menu';

interface FormItemProps {
  form: IForm;
  onDelete: (form: IForm) => void;
}

const FormItem = ({ form, onDelete }: FormItemProps) => {
  const router = useRouter();

  const numberOfQuestions = useMemo(() => {
    return form.sections.reduce(
      (acc, section: ISection) => acc + section.fields.length,
      0
    );
  }, [form]);

  const handleDeleteForm = (form: IForm) => {
    onDelete(form);
  };

  const handleEditForm = (form: IForm) => {
    router.push(PRIVATE_ROUTES.forms.edit.replace('[id]', form.id));
  };

  const handleDuplicateForm = (form: IForm) => {
    console.log(form);
  };

  const handleSelectForm = (form: IForm) => {
    router.push(PRIVATE_ROUTES.forms.preview.replace('[id]', form.id));
  };

  const formatDate = (dateString: number) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <div
        key={form.id}
        className="flex cursor-pointer items-center justify-between px-6 py-4 hover:bg-gray-50"
        onClick={() => handleSelectForm(form)}
      >
        <div className="flex items-center gap-4">
          <FileTextIcon className="h-6 w-6 text-blue-600" />
          <div>
            <h4 className="font-display font-medium text-gray-900">
              {form.title}
            </h4>
            <div className="mt-1 flex items-center gap-4 truncate text-sm text-gray-600">
              <span>{numberOfQuestions} questions</span>
              {form.sections.length > 0 && (
                <span>{form.sections.length} sections</span>
              )}
              <span>Modified {formatDate(form.updatedAt)}</span>
            </div>
          </div>
        </div>
        <FormContextMenu
          form={form}
          onEdit={handleEditForm}
          onDuplicate={handleDuplicateForm}
          onDelete={handleDeleteForm}
        />
      </div>
    </>
  );
};

export default FormItem;
