'use client';

import { QuestionType } from '@repo/form-ui/enums/question';

import {
  ChevronsUpDown,
  Edit2Icon,
  EditIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react';

import { IForm } from '@repo/form-ui/types/form';

import { Badge } from '@repo/core-ui/components/badge';
import { Button } from '@repo/core-ui/components/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/core-ui/components/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/core-ui/components/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/core-ui/components/tooltip';

import QuestionTypeBadge from '@repo/form-ui/components/question-type-badge';

import { recentForms } from '@/mocks/forms';

const sampleForm = recentForms[recentForms.length - 1] as IForm;

const FormNew = () => {
  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>{sampleForm.title}</CardTitle>
          <CardDescription>{sampleForm.description}</CardDescription>
          <CardAction>
            <Button variant="ghost">
              <EditIcon /> Edit form
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sampleForm.sections.map((section) => (
              <Collapsible
                open={true}
                onOpenChange={() => {}}
                className="flex w-full flex-col gap-2 rounded-md border border-gray-200 p-4"
                key={section.id}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">{section.title}</h3>
                    <p className="text-xs text-gray-500">
                      {section.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CollapsibleTrigger asChild>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                          >
                            <ChevronsUpDown />
                            <span className="sr-only">Toggle</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Toggle section</p>
                        </TooltipContent>
                      </Tooltip>
                    </CollapsibleTrigger>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <TrashIcon />
                          <span className="sr-only">Delete section</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete section</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <Edit2Icon />
                          <span className="sr-only">Edit section</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit section</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <PlusIcon />
                          <span className="sr-only">Add question</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add question</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <CollapsibleContent>
                  <div className="space-y-2">
                    {section.fields.map((field) => (
                      <div
                        key={field.id}
                        className="flex items-center border-t border-gray-200 pt-2 text-sm"
                      >
                        <div className="w-1/6">
                          {
                            <QuestionTypeBadge
                              type={field.type as QuestionType}
                            />
                          }
                        </div>
                        <div className="w-2/6">{field.label}</div>
                        <div className="w-1/6">
                          {!field.required && (
                            <Badge variant="secondary">Optional</Badge>
                          )}
                        </div>
                        <div className="w-2/6">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              Delete
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="mt-4 w-full border-2 border-dashed border-gray-300 py-8 text-gray-600 hover:border-blue-400 hover:text-blue-600"
          >
            <PlusIcon className="mr-2 h-5 w-5" />
            Add another field
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormNew;
