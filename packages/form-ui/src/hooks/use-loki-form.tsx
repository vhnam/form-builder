import { ReactNode } from 'react';

import { type IField } from '@repo/form-ui/types/form';

import { getFieldComponent } from '@repo/form-ui/utils/field';

interface UseLokiFormReturn {
  renderQuestion: (question: IField) => ReactNode;
}

export const useLokiForm = (): UseLokiFormReturn => {
  const renderQuestion = (question: IField) => {
    return getFieldComponent(question);
  };

  return { renderQuestion };
};
