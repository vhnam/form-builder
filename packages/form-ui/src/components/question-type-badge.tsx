import { QuestionType } from '@repo/form-ui/enums/question';

import { cn } from '@repo/core-ui/lib/utils';

import { Badge } from '@repo/core-ui/components/badge';

type QuestionTypeBadgeProps = {
  type: QuestionType;
};

const getBackgroundClass = (type: QuestionType) => {
  switch (type) {
    case QuestionType.CHECKBOX:
    case QuestionType.RADIO:
      return 'bg-indigo-100 text-indigo-700';
    case QuestionType.DATE:
    case QuestionType.PASSWORD:
      return 'bg-orange-100 text-orange-700';
    case QuestionType.FILE:
      return 'bg-purple-100 text-purple-700';
    case QuestionType.EMAIL:
    case QuestionType.NUMBER:
      return 'bg-red-100 text-red-700';
    case QuestionType.SELECT:
      return 'bg-yellow-100 text-yellow-700';
    case QuestionType.TEXT:
      return 'bg-green-100 text-green-700';
    case QuestionType.TEXTAREA:
      return 'bg-blue-100 text-blue-700';
  }
};

const QuestionTypeBadge = ({ type }: QuestionTypeBadgeProps) => {
  return (
    <Badge variant="secondary" className={cn(getBackgroundClass(type), 'w-20')}>
      {type}
    </Badge>
  );
};

export default QuestionTypeBadge;
