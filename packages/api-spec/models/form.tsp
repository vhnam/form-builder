
import "@typespec/http";

using Http;

model Form {
  id: string;

  @minLength(1)
  @maxLength(255)
  name: string;
}

@route("/forms")
namespace LokiForm.Forms {
  @get
  op listForms(): {
    @statusCode statusCode: 200;
    @body forms: Form[];
  };

 @get
  op getForm(@path formId: string): {
    @statusCode statusCode: 200;
    @body form: Form;
  };

 @post
  op createForm(@body form: Form): {
    @statusCode statusCode: 201;
    @body newForm: Form;
  };

  @put
  op updateForm(@path formId: string, @body form: Form): {
    @statusCode statusCode: 200;
    @body updatedForm: Form;
  } | {
    @statusCode statusCode: 404;
  };

  @delete
  op deleteForm(@path formId: string): {
    @statusCode statusCode: 204;
  };
}
