import { type IField } from '@repo/form-ui/types/form';

import FormCheckbox from '@repo/form-ui/components/form-checkbox';
import FormDate from '@repo/form-ui/components/form-date';
import FormEmail from '@repo/form-ui/components/form-email';
import FormSelect from '@repo/form-ui/components/form-select';
import FormText from '@repo/form-ui/components/form-text';
import FormTextarea from '@repo/form-ui/components/form-textarea';

export const getFieldComponent = (field: IField) => {
  switch (field.type) {
    case 'checkbox':
      return <FormCheckbox {...field} />;
    case 'date':
      return <FormDate {...field} />;
    case 'email':
      return <FormEmail {...field} />;
    case 'select':
      return <FormSelect {...field} />;
    case 'text':
      return <FormText {...field} />;
    case 'textarea':
      return <FormTextarea {...field} />;
    default:
      return null;
  }
};
