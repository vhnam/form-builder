import "../enums/form.tsp";

model Field<T> {
  @visibility(Lifecycle.Read)
  id: uuid;

  sectionId: string;
  type: FieldType;
  label: string;
  required: boolean;
  order: int32;
  attributes: T;
}

model FieldAttributes {}

model TextFieldAttributes extends FieldAttributes {
  placeholder?: string;
  minLength?: int32;
  maxLength?: int32;
  defaultValue?: string;
}

model TextareaFieldAttributes extends FieldAttributes {
  placeholder?: string;
  minLength?: int32;
  maxLength?: int32;
  defaultValue?: string;
  rows?: int32;
}

model EmailFieldAttributes extends FieldAttributes {
  placeholder?: string;
  minLength?: int32;
  maxLength?: int32;
  defaultValue?: string;
}

model CheckboxFieldAttributes extends FieldAttributes {
  options: string;
  minSelected?: int32;
  maxSelected?: int32;
}

model SelectFieldAttributes extends FieldAttributes {
  options: string;
  minSelected?: int32;
  maxSelected?: int32;
  placeholder?: string;
  defaultValue?: string;
}

model DateFieldAttributes extends FieldAttributes {
  options: string;
  beforeDate?: int32;
  afterDate?: int32;
  placeholder?: string;
  defaultValue?: string;
  dateFormat?: string;
  mode?: DateMode;
}

model Form {
  @visibility(Lifecycle.Read)
  id: uuid;

  @minLength(1)
  @maxLength(255)
  title: string;

  @minLength(0)
  @maxLength(255)
  description: string;

  sections: Section[];
  userId: uuid;
  isActive: boolean;

  @invisible(Lifecycle)
  createdAt: unixTimestamp32;

  @invisible(Lifecycle)
  updatedAt: unixTimestamp32;
}

model Section {
  @visibility(Lifecycle.Read)
  id: uuid;

  @minLength(1)
  @maxLength(255)
  title: string;

  @minLength(0)
  @maxLength(255)
  description: string;

  fields: Field<FieldAttributes>[];

  @invisible(Lifecycle)
  createdAt: unixTimestamp32;

  @invisible(Lifecycle)
  updatedAt: unixTimestamp32;
}
