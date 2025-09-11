import "@typespec/http";
import "@typespec/rest";

using Http;
using Rest;

@route("/forms")
@tag("Forms")
@useAuth(BearerAuth)
namespace LokiForm.Forms {
  @get
  @list
  @summary("Get list of forms")
  op getList(
    @query filter?: string,
    @pageIndex page?: int32 = 1,
    @pageSize perPage?: int32 = 10,
  ): Page<Form>;

  @get
  @summary("Get a specific form by ID")
  op view(@path id: string): Form | NotFoundError;

  @post
  @summary("Create a new form")
  op create(@body form: Form): Form | ValidationError | UnauthorizedError;

  @put
  @summary("Update an existing form by ID")
  op update(@path id: string, @body form: Form):
    | Form
    | ValidationError
    | UnauthorizedError
    | NotFoundError
    | InternalServerError;

  @delete
  @summary("Delete a form by ID")
  op delete(@path id: string):
    | void
    | NotFoundError
    | UnauthorizedError
    | InternalServerError;
}
