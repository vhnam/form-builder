@doc("Defines the available field types that can be used in forms. Each type has specific validation rules and UI components.")
enum FieldType {
  @doc("Single-line text input field")
  text,

  @doc("Multi-line text input field")
  textarea,

  @doc("Email input field with email validation")
  email,

  @doc("Checkbox field allowing multiple selections from options")
  checkbox,

  @doc("Dropdown/select field with predefined options")
  select,

  @doc("Date picker field for date selection")
  date,

  @doc("Numeric input field for numbers")
  number,
}

@doc("Defines the different modes for date field selection, controlling how users can interact with date inputs.")
enum DateMode {
  @doc("Select a single date")
  single,

  @doc("Select multiple individual dates")
  multiple,

  @doc("Select a date range with start and end dates")
  range,
}
