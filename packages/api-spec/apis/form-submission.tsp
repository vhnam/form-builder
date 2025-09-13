import "@typespec/http";
import "@typespec/rest";

using Http;
using Rest;

@route("/forms/{formId}/submissions")
@tag("Form submissions")
@useAuth(Http.BearerAuth)
namespace LokiForm.FormSubmission {
  @get
  @summary("Get form submissions")
  @doc("Retrieves a paginated list of submissions for a specific form. Allows form owners to view all submissions with pagination support for managing large numbers of submissions.")
  op getResponses(
    @path formId: uuid,
    @pageIndex page?: int32 = 1,
    @pageSize perPage?: int32 = 10,
  ): Page<FormSubmission>;

  @get
  @route("{formSubmissionId}")
  @summary("Get a specific form submission by ID")
  @doc("Retrieves a single form submission by its unique identifier. Returns the complete submission data including all field values and submission timestamp.")
  op getResponse(
    @path formId: uuid,
    @path formSubmissionId: uuid,
  ): FormSubmission | NotFoundError;

  @post
  @summary("Submit form submission")
  @doc("Submits a new submission to a published form. Validates all required fields and stores the submission data. This endpoint is typically used by end users filling out forms.")
  op createResponse(
    @path formId: uuid,
    @bodyRoot payload: FormSubmission,
  ): FormSubmission;
}
