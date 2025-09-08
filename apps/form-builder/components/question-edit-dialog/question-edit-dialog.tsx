'use client';

import { ReactNode } from 'react';

import { QuestionType } from '@repo/form-ui/enums/question';

import type { IField, IForm } from '@repo/form-ui/types/form';

import { Button } from '@repo/core-ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/core-ui/components/dialog';
import { Input } from '@repo/core-ui/components/input';
import { Label } from '@repo/core-ui/components/label';
import { ScrollArea } from '@repo/core-ui/components/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/core-ui/components/select';
import { Separator } from '@repo/core-ui/components/separator';

import QuestionCheckboxSettings from './question-checkbox-settings';
import QuestionDateSettings from './question-date-settings';
import QuestionInputSettings from './question-input-settings';
import QuestionSelectionSettings from './question-selection-settings';

interface QuestionEditDialogProps {
  form: IForm;
  question: IField;
  triggerComponent: ReactNode;
}

const QuestionEditDialog = ({
  form,
  question,
  triggerComponent,
}: QuestionEditDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
          <DialogDescription>
            Edit the question to update its properties.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <ScrollArea className="-mr-6 h-[50vh] pr-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor={`${question.id}-section`}>Section</Label>
              <Select defaultValue={question.sectionId}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    id={`${question.id}-section`}
                    placeholder="Section"
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

            <div className="grid gap-3">
              <Label htmlFor={`${question.id}-type`}>Type</Label>
              <Select defaultValue={question.type}>
                <SelectTrigger className="w-full">
                  <SelectValue id={`${question.id}-type`} placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="textarea">Textarea</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="radio">Radio</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="file">File</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor={`${question.id}-label`}>Label</Label>
              <Input
                id={`${question.id}-label`}
                defaultValue={question.label}
              />
            </div>

            <Separator />

            <h3 className="text-muted-foreground text-sm font-medium">
              Settings
            </h3>

            {[
              QuestionType.TEXT,
              QuestionType.TEXTAREA,
              QuestionType.EMAIL,
              QuestionType.NUMBER,
            ].includes(question.type as QuestionType) && (
              <QuestionInputSettings question={question} />
            )}

            {question.type === QuestionType.DATE && (
              <QuestionDateSettings question={question} />
            )}

            {question.type === QuestionType.CHECKBOX && (
              <QuestionCheckboxSettings question={question} form={form} />
            )}

            {[QuestionType.RADIO, QuestionType.SELECT].includes(
              question.type as QuestionType
            ) && <QuestionSelectionSettings question={question} form={form} />}
          </div>
        </ScrollArea>
        <DialogFooter className="w-full sm:justify-between">
          <Button type="button" variant="destructive">
            Delete
          </Button>
          <div className="flex items-center gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Finish</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionEditDialog;
