@doc("Base model for form response values, containing the field ID that the response corresponds to.")
model FormResponseValue {
  @doc("ID of the form field this response value corresponds to")
  fieldId: uuid;
}

@doc("Response value for text input fields, containing the submitted text string.")
model FormResponseTextValue extends FormResponseValue {
  @doc("The text value submitted by the user")
  value: string;
}

@doc("Response value for textarea fields, containing the submitted multi-line text string.")
model FormResponseTextareaValue extends FormResponseValue {
  @doc("The multi-line text value submitted by the user")
  value: string;
}

@doc("Response value for email input fields, containing the submitted email address.")
model FormResponseEmailValue extends FormResponseValue {
  @doc("The email address submitted by the user")
  value: string;
}

@doc("Response value for number input fields, containing the submitted numeric value.")
model FormResponseNumberValue extends FormResponseValue {
  @doc("The numeric value submitted by the user")
  value: int32;
}

@doc("Represents a complete form submission containing all field responses and submission metadata.")
model FormResponse {
  @doc("Array of response values for each field in the form")
  responses: FormResponseValue[];

  @doc("Unix timestamp when the form was submitted")
  createdAt: unixTimestamp32;
}
