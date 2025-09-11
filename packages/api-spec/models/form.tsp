import "../enums/form.tsp";

@doc("A generic field model that represents a form input field with type-specific attributes. Fields are the building blocks of forms and can be of various types like text, email, select, etc.")
model Field<T> {
  @visibility(Lifecycle.Read)
  @doc("Unique identifier for the field")
  id: uuid;

  @doc("ID of the section this field belongs to")
  sectionId: string;

  @doc("Type of the field (text, email, select, etc.)")
  type: FieldType;

  @doc("Display label for the field")
  label: string;

  @doc("Whether this field is required for form submission")
  required: boolean;

  @doc("Optional helper text to guide users")
  helperText?: string;

  @doc("Order of the field within its section")
  order: int32;

  @doc("Type-specific attributes and configuration for the field")
  attributes: T;
}

@doc("Base class for all field attribute configurations. Provides common properties that can be extended by specific field types.")
model FieldAttributes {}

@doc("Configuration attributes for text input fields, including validation constraints and default values.")
model TextFieldAttributes extends FieldAttributes {
  @doc("Placeholder text shown when the field is empty")
  placeholder?: string;

  @doc("Minimum number of characters required")
  minLength?: int32;

  @doc("Maximum number of characters allowed")
  maxLength?: int32;

  @doc("Default value for the field")
  defaultValue?: string;
}

@doc("Configuration attributes for textarea fields, including validation constraints, default values, and display options.")
model TextareaFieldAttributes extends FieldAttributes {
  @doc("Placeholder text shown when the field is empty")
  placeholder?: string;

  @doc("Minimum number of characters required")
  minLength?: int32;

  @doc("Maximum number of characters allowed")
  maxLength?: int32;

  @doc("Default value for the field")
  defaultValue?: string;

  @doc("Number of visible text lines for the textarea")
  rows?: int32;
}

@doc("Configuration attributes for email input fields, including validation constraints and default values.")
model EmailFieldAttributes extends FieldAttributes {
  @doc("Placeholder text shown when the field is empty")
  placeholder?: string;

  @doc("Minimum number of characters required")
  minLength?: int32;

  @doc("Maximum number of characters allowed")
  maxLength?: int32;

  @doc("Default email value for the field")
  defaultValue?: string;
}

@doc("Configuration attributes for number input fields, including validation constraints and default values.")
model NumberFieldAttributes extends FieldAttributes {
  @doc("Placeholder text shown when the field is empty")
  placeholder?: string;

  @doc("Minimum numeric value allowed")
  min?: int32;

  @doc("Maximum numeric value allowed")
  max?: int32;

  @doc("Default numeric value for the field")
  defaultValue?: int32;
}

@doc("Configuration attributes for checkbox fields, including available options and selection constraints.")
model CheckboxFieldAttributes extends FieldAttributes {
  @doc("Comma-separated list of checkbox options")
  options: string;

  @doc("Minimum number of options that must be selected")
  minSelected?: int32;

  @doc("Maximum number of options that can be selected")
  maxSelected?: int32;
}

@doc("Represents a single option in a select field, with display label, value, and optional disabled state.")
model SelectOption {
  @doc("Display text for the option")
  label: string;

  @doc("Value submitted when this option is selected")
  value: string;

  @doc("Whether this option is disabled and cannot be selected")
  disabled?: boolean;
}

@doc("Configuration attributes for select/dropdown fields, including options, selection constraints, and display options.")
model SelectFieldAttributes extends FieldAttributes {
  @doc("Array of available options for selection")
  options: SelectOption[];

  @doc("Minimum number of options that must be selected")
  minSelected?: int32;

  @doc("Maximum number of options that can be selected")
  maxSelected?: int32;

  @doc("Placeholder text shown when no option is selected")
  placeholder?: string;

  @doc("Default selected value")
  defaultValue?: string;

  @doc("Whether multiple selections are allowed")
  multiple?: boolean;

  @doc("Whether the select field supports search/filtering")
  searchable?: boolean;
}

@doc("Configuration attributes for date input fields, including date constraints, format options, and selection modes.")
model DateFieldAttributes extends FieldAttributes {
  @doc("Date picker configuration options")
  options: string;

  @doc("Unix timestamp - dates before this value are not selectable")
  beforeDate?: int32;

  @doc("Unix timestamp - dates after this value are not selectable")
  afterDate?: int32;

  @doc("Placeholder text shown when the field is empty")
  placeholder?: string;

  @doc("Default date value")
  defaultValue?: string;

  @doc("Date format for display and input (e.g., 'MM/DD/YYYY', 'DD-MM-YYYY')")
  dateFormat?: string;

  @doc("Date selection mode (single date, multiple dates, or date range)")
  mode?: DateMode;
}

@doc("Represents a complete form definition with all its sections, fields, configuration, and metadata. Forms are the main entities in the LokiForm system.")
model Form {
  @visibility(Lifecycle.Read)
  @doc("Unique identifier for the form")
  id: uuid;

  @minLength(1)
  @maxLength(255)
  @doc("Title of the form displayed to users")
  title: string;

  @minLength(0)
  @maxLength(255)
  @doc("Description or instructions for the form")
  description: string;

  @doc("Array of sections containing the form fields")
  sections: Section[];

  @doc("ID of the user who created this form")
  userId: uuid;

  @doc("Whether the form is currently active and accepting responses")
  isActive: boolean;

  @doc("Version number of the form for tracking changes")
  version: int32;

  @doc("Whether the form spans multiple pages")
  multiPage: boolean;

  @doc("Whether users can save drafts before submitting")
  allowDrafts: boolean;

  @doc("Whether authentication is required to submit the form")
  requireAuth: boolean;

  @doc("Message shown to users after successful form submission")
  submitMessage: string;

  @doc("Optional URL to redirect users to after form submission")
  redirectUrl?: string;

  @invisible(Lifecycle)
  @doc("Unix timestamp when the form was created")
  createdAt: unixTimestamp32;

  @invisible(Lifecycle)
  @doc("Unix timestamp when the form was last updated")
  updatedAt: unixTimestamp32;
}

@doc("Represents a section within a form that groups related fields together. Sections help organize complex forms and can be used for multi-page layouts.")
model Section {
  @visibility(Lifecycle.Read)
  @doc("Unique identifier for the section")
  id: uuid;

  @minLength(1)
  @maxLength(255)
  @doc("Title of the section displayed to users")
  title: string;

  @minLength(0)
  @maxLength(255)
  @doc("Description or instructions for the section")
  description: string;

  @doc("Array of fields contained within this section")
  fields: Field<FieldAttributes>[];

  @invisible(Lifecycle)
  @doc("Unix timestamp when the section was created")
  createdAt: unixTimestamp32;

  @invisible(Lifecycle)
  @doc("Unix timestamp when the section was last updated")
  updatedAt: unixTimestamp32;
}
