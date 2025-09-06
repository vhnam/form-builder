export interface Section {
  id: string;
  title: string;
  description: string;
  fields: Field[];
  order: number;
  showInfo: boolean;
}

export interface Field {
  id: string;
  sectionId: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  order: number;
}

export interface Form {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  createdAt: number;
  updatedAt: number;
}
