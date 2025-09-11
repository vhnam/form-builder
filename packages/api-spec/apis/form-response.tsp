import "@typespec/http";
import "@typespec/rest";

using Http;
using Rest;

@route("/forms/{formId}/responses")
@tag("Form responses")
@useAuth(Http.BearerAuth)
namespace LokiForm.FormResponses {
  @get
  @summary("Get form responses")
  @doc("Retrieves a paginated list of responses for a specific form. Allows form owners to view all submissions with pagination support for managing large numbers of responses.")
  op getResponses(
    @path formId: uuid,
    @pageIndex page?: int32 = 1,
    @pageSize perPage?: int32 = 10,
  ): Page<FormResponse>;

  @get
  @route("{formResponseId}")
  @summary("Get a specific form response by ID")
  @doc("Retrieves a single form response by its unique identifier. Returns the complete response data including all field values and submission timestamp.")
  op getResponse(
    @path formId: uuid,
    @path formResponseId: uuid,
  ): FormResponse | NotFoundError;

  @post
  @summary("Submit form response")
  @doc("Submits a new response to a published form. Validates all required fields and stores the response data. This endpoint is typically used by end users filling out forms.")
  op createResponse(
    @path formId: uuid,
    @body payload: FormResponse,
  ): FormResponse;
}
