import { IForm } from '@repo/form-ui/types/form';

import FormRenderer from '@repo/form-ui/components/form-renderer';

import { recentForms } from '@/mocks/forms';

const sampleForm = recentForms[recentForms.length - 1] as IForm;

const FormPreviewPage = () => {
  return (
    <div>
      <FormRenderer data={sampleForm} />
    </div>
  );
};

export default FormPreviewPage;
