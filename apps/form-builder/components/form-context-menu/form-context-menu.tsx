import {
  CopyIcon,
  Edit3Icon,
  EyeIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from 'lucide-react';

import { type IForm } from '@repo/form-ui/types/form';

import { Button } from '@repo/core-ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/core-ui/components/dropdown-menu';

interface FormContextMenuProps {
  form: IForm;
  onSelect?: (form: IForm) => void;
  onEdit: (form: IForm) => void;
  onDuplicate: (form: IForm) => void;
  onDelete: (form: IForm) => void;
}

const FormContextMenu = ({
  form,
  onSelect,
  onEdit,
  onDuplicate,
  onDelete,
}: FormContextMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onSelect && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onSelect(form);
            }}
          >
            <EyeIcon className="mr-2 size-4" />
            Preview
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onEdit(form);
          }}
        >
          <Edit3Icon className="mr-2 size-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate(form);
          }}
        >
          <CopyIcon className="mr-2 size-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onDelete(form);
          }}
          className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
        >
          <Trash2Icon className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FormContextMenu;
