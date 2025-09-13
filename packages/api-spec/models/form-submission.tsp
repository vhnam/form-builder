@doc("Base model for form submission values, containing the field ID that the submission corresponds to.")
model FormSubmissionValue {
  @doc("ID of the form field this submission value corresponds to")
  fieldId: uuid;
}

@doc("Submission value for text input fields, containing the submitted text string.")
model FormSubmissionTextValue extends FormSubmissionValue {
  @doc("The text value submitted by the user")
  value: string;
}

@doc("Submission value for textarea fields, containing the submitted multi-line text string.")
model FormSubmissionTextareaValue extends FormSubmissionValue {
  @doc("The multi-line text value submitted by the user")
  value: string;
}

@doc("Submission value for email input fields, containing the submitted email address.")
model FormSubmissionEmailValue extends FormSubmissionValue {
  @doc("The email address submitted by the user")
  value: string;
}

@doc("Submission value for number input fields, containing the submitted numeric value.")
model FormSubmissionNumberValue extends FormSubmissionValue {
  @doc("The numeric value submitted by the user")
  value: int32;
}

@doc("Represents a complete form submission containing all field submissions and submission metadata.")
model FormSubmission {
  @doc("Array of submission values for each field in the form")
  submissions: FormSubmissionValue[];

  @doc("Unix timestamp when the form was submitted")
  createdAt: unixTimestamp32;
}
