import { type IField } from '@repo/form-ui/types/form';

import { Checkbox } from '@repo/core-ui/components/checkbox';
import { Input } from '@repo/core-ui/components/input';
import { Label } from '@repo/core-ui/components/label';

interface QuestionInputSettingsProps {
  question: IField;
}

const QuestionInputSettings = ({ question }: QuestionInputSettingsProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Checkbox
          id={`${question.id}-required`}
          defaultChecked={question.required}
        />
        <Label htmlFor={`${question.id}-required`}>Required</Label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-3">
          <Label htmlFor={`${question.id}-placeholder`}>Placeholder</Label>
          <Input
            id={`${question.id}-placeholder`}
            defaultValue={question.placeholder}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor={`${question.id}-default-value`}>Default value</Label>
          <Input id={`${question.id}-default-value`} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id={`${question.id}-min-length`} />
            <Label htmlFor={`${question.id}-min-length`}>Min length</Label>
          </div>
          <Input
            id={`${question.id}-min-length-value`}
            type="number"
            placeholder="0"
          />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id={`${question.id}-max-length`} />
            <Label htmlFor={`${question.id}-max-length`}>Max length</Label>
          </div>
          <Input
            id={`${question.id}-max-length-value`}
            type="number"
            placeholder="255"
          />
        </div>
      </div>
    </>
  );
};

export default QuestionInputSettings;
