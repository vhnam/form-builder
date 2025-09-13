@doc("A template for a standard API error with a unique code and a message.")
model ApiError<Code extends string> {
  code: Code;
  message: string;
}

@error
@doc("Error returned when request validation fails, containing specific details about validation errors")
model ValidationError extends ApiError<"VALIDATION_ERROR"> {
  @doc("Array of specific validation error messages describing what went wrong")
  details: string[];
}

@error
@doc("Error returned when the request lacks valid authentication credentials or the user is not authorized to access the resource")
model UnauthorizedError extends ApiError<"UNAUTHORIZED"> {}

@error
@doc("Error returned when the requested resource could not be found or does not exist")
model NotFoundError extends ApiError<"NOT_FOUND"> {}

@error
@doc("Error returned when an unexpected server error occurs, indicating a problem with the server's internal processing")
model InternalServerError extends ApiError<"INTERNAL_SERVER_ERROR"> {}

@doc("Paginated response model containing an array of data items along with pagination metadata for managing large datasets")
model Page<T> {
  @doc("Array of data items for the current page")
  @pageItems
  data: T[];

  @doc("Current page number (1-based)")
  page: int32;

  @doc("Number of items per page")
  perPage: int32;

  @doc("Total number of items across all pages")
  total: int32;
}
