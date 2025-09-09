export interface IForm {
  id: string;
  title: string;
  description: string;
  sections: ISection[];
  createdAt: number;
  updatedAt: number;
}

export interface ISection {
  id: string;
  title: string;
  description: string;
  fields: IField[];
  order: number;
  showInfo: boolean;
}

export interface IField {
  id: string;
  sectionId: string;
  type: string;
  label: string;
  required: boolean;
  order: number;
  attributes: IFieldAttributes;
}

export type IFieldAttributes =
  | ITextFieldAttributes
  | ITextareaAttributes
  | IEmailAttributes
  | ICheckboxAttributes
  | ISelectAttributes
  | IDateAttributes;

export interface ITextFieldAttributes {
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
}

export interface ITextareaAttributes {
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
  rows?: number;
}

export interface IEmailAttributes {
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
}

export interface ICheckboxAttributes {
  options: string;
  minSelected?: number;
  maxSelected?: number;
}

export interface ISelectAttributes {
  options: string[];
  placeholder?: string;
  defaultValue?: string;
  minSelected?: number;
  maxSelected?: number;
}

export interface IDateAttributes {
  placeholder?: string;
  defaultValue?: number;
  dateFormat?: string;
  beforeDate?: number;
  afterDate?: number;
  mode?: 'single' | 'multiple' | 'range';
}
