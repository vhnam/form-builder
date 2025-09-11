import "../enums/user.tsp";

@doc("Represents a user account in the LokiForm system with authentication credentials and profile information.")
model User {
  @visibility(Lifecycle.Read)
  @doc("Unique identifier for the user")
  id: uuid;

  @doc("First name of the user")
  @minLength(1)
  @maxLength(255)
  firstName: string;

  @doc("Last name of the user")
  @minLength(1)
  @maxLength(255)
  lastName: string;

  @doc("Email address of the user, used for authentication and communication")
  @minLength(1)
  @maxLength(255)
  email: string;

  @visibility(Lifecycle.Create, Lifecycle.Update)
  @doc("Hashed password for user authentication")
  @minLength(1)
  @maxLength(255)
  password: string;

  @visibility(Lifecycle.Read)
  role: Role;

  @doc("Whether the user account is active and can access the system")
  isActive: boolean;

  @invisible(Lifecycle)
  @doc("Unix timestamp when the user account was created")
  createdAt: unixTimestamp32;

  @invisible(Lifecycle)
  @doc("Unix timestamp when the user account was last updated")
  updatedAt: unixTimestamp32;
}
