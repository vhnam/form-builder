import type { IField, IForm } from '@repo/form-ui/types/form';

import { Label } from '@repo/core-ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/core-ui/components/select';

interface QuestionConditionalLogicProps {
  question: IField;
  index?: number;
  form: IForm;
}

const QuestionConditionalLogic = ({
  question,
  index = 0,
  form,
}: QuestionConditionalLogicProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="grid gap-3">
        <Label
          htmlFor={`${question.id}-option-${index}-conditional-logic`}
          className="text-xs font-medium"
        >
          If option is selected
        </Label>
        <Select defaultValue="visible">
          <SelectTrigger className="w-full">
            <SelectValue
              id={`${question.id}-option-${index}-conditional-logic-action`}
              placeholder="Select an action"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="visible">Show section</SelectItem>
            <SelectItem value="hidden">Hide section</SelectItem>
            <SelectItem value="jumped">Jump to section</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3">
        <Label
          htmlFor={`${question.id}-option-${index}-conditional-logic-target`}
          className="text-xs font-medium"
        >
          Target section
        </Label>
        <Select defaultValue={form.sections[0]?.id}>
          <SelectTrigger className="w-full">
            <SelectValue
              id={`${question.id}-option-${index}-conditional-logic-target`}
              placeholder="Target section"
            />
          </SelectTrigger>
          <SelectContent>
            {form.sections.map((section) => (
              <SelectItem key={section.id} value={section.id}>
                {section.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default QuestionConditionalLogic;
