@doc("A template for a standard API error with a unique code and a message.")
model ApiError<Code extends string> {
  code: Code;
  message: string;
}

@error
model ValidationError extends ApiError<"VALIDATION_ERROR"> {
  details: string[];
}

@error
model UnauthorizedError extends ApiError<"UNAUTHORIZED"> {}

@error
model NotFoundError extends ApiError<"NOT_FOUND"> {}

@error
model InternalServerError extends ApiError<"INTERNAL_SERVER_ERROR"> {}

@doc("Response for Page")
model Page<T> {
  @pageItems data: T[];
  page: int32;
  perPage: int32;
  total: int32;
}
