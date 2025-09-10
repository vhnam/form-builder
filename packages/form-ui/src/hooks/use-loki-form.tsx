import { ReactNode } from 'react';

import type { IField, IFieldAttributes } from '@repo/form-ui/types/form';

import { getFieldComponent } from '@repo/form-ui/utils/field';

interface UseLokiFormReturn {
  renderQuestion: (question: IField<IFieldAttributes>) => ReactNode;
}

export const useLokiForm = (): UseLokiFormReturn => {
  const renderQuestion = (question: IField<IFieldAttributes>) => {
    return getFieldComponent(question);
  };

  return { renderQuestion };
};
