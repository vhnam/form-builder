import { FileSlidersIcon, GripVerticalIcon, TrashIcon } from 'lucide-react';

import type { IField, IForm } from '@repo/form-ui/types/form';

import { Button } from '@repo/core-ui/components/button';
import { Input } from '@repo/core-ui/components/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/core-ui/components/tooltip';

import QuestionConditionalLogic from './question-conditional-logic';

interface QuestionSelectionOptionProps {
  question: IField;
  index?: number;
  form: IForm;
}

const QuestionSelectionOption = ({
  question,
  index = -1,
  form,
}: QuestionSelectionOptionProps) => {
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        {index > -1 && <GripVerticalIcon className="size-4 cursor-grab" />}
        <Input
          id={`${question.id}-option-${index}`}
          placeholder={`Option ${index > -1 ? index + 1 : ''}`}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <FileSlidersIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle conditional logic</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="destructive" size="icon">
              <TrashIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove option</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <QuestionConditionalLogic question={question} index={index} form={form} />
    </div>
  );
};

export default QuestionSelectionOption;
