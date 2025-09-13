import "@typespec/http";
import "@typespec/rest";

using Http;
using Rest;

@route("/forms")
@tag("Forms")
@useAuth(Http.BearerAuth)
namespace LokiForm.Forms {
  @get
  @list
  @summary("Get list of forms")
  @doc("Retrieves a paginated list of forms for the authenticated user. Supports filtering and pagination to manage large collections of forms efficiently.")
  op getForms(
    @query filter?: string,
    @pageIndex page?: int32 = 1,
    @pageSize perPage?: int32 = 10,
  ): Page<Form>;

  @get
  @summary("Get a specific form by ID")
  @doc("Retrieves a single form by its unique identifier. Returns the complete form definition including all sections, fields, and configuration.")
  op getForm(@path formId: string): Form | NotFoundError;

  @post
  @summary("Create a new form")
  @doc("Creates a new form with the provided configuration. The form will be associated with the authenticated user and can include multiple sections with various field types.")
  op createForm(
    @body payload: Form,
  ): Form | ValidationError | UnauthorizedError;

  @put
  @summary("Update an existing form by ID")
  @doc("Updates an existing form with new configuration. All form properties including sections, fields, and settings can be modified. The form version will be incremented.")
  op updateForm(@path formId: string, @body payload: Form):
    | Form
    | ValidationError
    | UnauthorizedError
    | NotFoundError
    | InternalServerError;

  @delete
  @summary("Delete a form by ID")
  @doc("Permanently deletes a form and all associated data including responses. This action cannot be undone and should be used with caution.")
  op deleteForm(@path formId: string):
    | void
    | NotFoundError
    | UnauthorizedError
    | InternalServerError;

  @post
  @route("{formId}/publish")
  @summary("Publish a form")
  @doc("Publishes a form, making it publicly accessible for submissions. Returns a public URL that can be shared with users to access and submit the form.")
  op publishForm(@path formId: string): {
    publicUrl: string;
  } | ValidationError | UnauthorizedError;
}
