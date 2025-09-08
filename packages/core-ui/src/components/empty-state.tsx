import { FileSearchIcon } from 'lucide-react';
import { ReactNode } from 'react';

import { Button } from '@repo/core-ui/components/button';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState = ({
  title,
  description,
  icon,
  actionText = 'Action',
  onAction,
}: EmptyStateProps) => {
  return (
    <div
      role="region"
      aria-label="Title"
      className="flex h-full flex-col items-center justify-center gap-6"
    >
      <div className="text-muted-foreground flex items-center justify-center [&_svg]:size-12">
        {icon ?? <FileSearchIcon />}
      </div>
      <div className="mx-auto flex max-w-sm flex-col gap-2 text-balance text-center">
        <p className="text-base font-semibold">{title}</p>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      {onAction && <Button onClick={onAction}>{actionText}</Button>}
    </div>
  );
};

export default EmptyState;
