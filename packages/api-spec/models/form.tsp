
import "@typespec/http";

using Http;

model Form {
  id: string;

  @minLength(1)
  @maxLength(255)
  title: string;

  @minLength(0)
  @maxLength(255)
  description: string;

  createdAt: int32;
  updatedAt: int32;
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
  } | {
    @statusCode statusCode: 404;
    @body error: NotFoundError;
  };

  @post
  @useAuth(BearerAuth)
  op createForm(@body form: Form): {
    @statusCode statusCode: 201;
    @body newForm: Form;
  } | {
    @statusCode statusCode: 202;
    @body acceptedForm: Form;
  } | {
    @statusCode statusCode: 400;
    @body error: ValidationError;
  } | {
    @statusCode statusCode: 401;
    @body error: UnauthorizedError;
  };

  @put
  @useAuth(BearerAuth)
  op updateForm(@path formId: string, @body form: Form): {
    @statusCode statusCode: 200;
    @body updatedForm: Form;
  } | {
    @statusCode statusCode: 400;
    @body error: ValidationError;
  } | {
    @statusCode statusCode: 401;
    @body error: UnauthorizedError;
  } | {
    @statusCode statusCode: 404;
    @body error: NotFoundError;
  } | {
    @statusCode statusCode: 500;
    @body error: InternalServerError;
  };

  @delete
  @useAuth(BearerAuth)
  op deleteForm(@path formId: string): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 401;
    @body error: UnauthorizedError;
  } | {
    @statusCode statusCode: 404;
    @body error: NotFoundError;
  };
}

@error
model ValidationError {
  code: "VALIDATION_ERROR";
  message: string;
  details: string[];
}

@error
model UnauthorizedError {
  code: "UNAUTHORIZED";
  message: string;
}

@error
model NotFoundError {
  code: "NOT_FOUND";
  message: string;
}

@error
model InternalServerError {
  code: "INTERNAL_SERVER_ERROR";
  message: string;
}

model InternalServerErrorResponse {
  @statusCode statusCode: 500;
  @body error: InternalServerError;
}