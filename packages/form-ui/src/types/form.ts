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
  placeholder: string;
  required: boolean;
  order: number;
}

export interface IForm {
  id: string;
  title: string;
  description: string;
  sections: ISection[];
  createdAt: number;
  updatedAt: number;
}
