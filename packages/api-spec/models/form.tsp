import "@typespec/http";
import "@typespec/rest";

using Http;
using Rest;

@route("/forms")
@tag("Forms")
@useAuth(BearerAuth)
namespace LokiForm.Forms {
  model Form {
    @visibility(Lifecycle.Read)
    id: uuid;

    @minLength(1)
    @maxLength(255)
    title: string;

    @minLength(0)
    @maxLength(255)
    description: string;

    @visibility(Lifecycle.Read)
    createdAt: uint32;

    @visibility(Lifecycle.Read)
    updatedAt: uint32;
  }

  @get
  op listForms(): Form[];

  @get
  op getForm(@path formId: string): Form | NotFoundError;

  @post
  op createForm(@body form: Form): Form | ValidationError | UnauthorizedError;

  @put
  op updateForm(@path formId: string, @body form: Form):
    | Form
    | ValidationError
    | UnauthorizedError
    | NotFoundError
    | InternalServerError;

  @delete
  op deleteForm(@path formId: string):
    | void
    | NotFoundError
    | UnauthorizedError
    | InternalServerError;
}
