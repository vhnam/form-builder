import { PlusIcon } from 'lucide-react';

import { QuestionType } from '@repo/form-ui/enums/question';

import type { IField, IForm } from '@repo/form-ui/types/form';

import { Button } from '@repo/core-ui/components/button';
import { Checkbox } from '@repo/core-ui/components/checkbox';
import { Input } from '@repo/core-ui/components/input';
import { Label } from '@repo/core-ui/components/label';

import QuestionSelectionOption from './question-selection-option';

interface QuestionSelectionSettingsProps {
  question: IField;
  form: IForm;
}

const QuestionSelectionSettings = ({
  question,
  form,
}: QuestionSelectionSettingsProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Checkbox
          id={`${question.id}-required`}
          defaultChecked={question.required}
        />
        <Label htmlFor={`${question.id}-required`}>Required</Label>
      </div>

      {question.type === QuestionType.SELECT && (
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Checkbox id={`${question.id}-min-selected`} />
              <Label htmlFor={`${question.id}-min-selected`}>
                Min selected
              </Label>
            </div>
            <Input
              id={`${question.id}-min-selected-value`}
              type="number"
              placeholder="0"
            />
          </div>

          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Checkbox id={`${question.id}-max-selected`} />
              <Label htmlFor={`${question.id}-max-selected`}>
                Max selected
              </Label>
            </div>
            <Input
              id={`${question.id}-max-selected-value`}
              type="number"
              placeholder="0"
            />
          </div>
        </div>
      )}

      <h3 className="text-muted-foreground text-sm font-medium">Options</h3>

      <div className="grid gap-3">
        {/* <p className="text-muted-foreground text-center text-sm">
          No options yet
        </p> */}

        <QuestionSelectionOption question={question} index={0} form={form} />
        <QuestionSelectionOption question={question} index={1} form={form} />
        <QuestionSelectionOption question={question} index={2} form={form} />
      </div>

      <Button variant="outline">
        <PlusIcon className="size-4" />
        Add Option
      </Button>
    </>
  );
};

export default QuestionSelectionSettings;
