import type { IField, IForm } from '@repo/form-ui/types/form';

import { Checkbox } from '@repo/core-ui/components/checkbox';
import { Label } from '@repo/core-ui/components/label';

import QuestionSelectionOption from './question-selection-option';

interface QuestionCheckboxSettingsProps {
  question: IField;
  form: IForm;
}

const QuestionCheckboxSettings = ({
  question,
  form,
}: QuestionCheckboxSettingsProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Checkbox
          id={`${question.id}-required`}
          defaultChecked={question.required}
        />
        <Label htmlFor={`${question.id}-required`}>Required</Label>
      </div>

      <h3 className="text-muted-foreground text-sm font-medium">Option</h3>

      <div className="grid gap-3">
        <QuestionSelectionOption question={question} form={form} />
      </div>
    </>
  );
};

export default QuestionCheckboxSettings;
