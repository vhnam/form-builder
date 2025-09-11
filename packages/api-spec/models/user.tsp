@doc("Represents a user account in the LokiForm system with authentication credentials and profile information.")
model User {
  @visibility(Lifecycle.Read)
  @doc("Unique identifier for the user")
  id: uuid;

  @doc("Full name of the user")
  name: string;

  @doc("Email address of the user, used for authentication and communication")
  email: string;

  @visibility(Lifecycle.Create, Lifecycle.Update)
  @doc("Hashed password for user authentication")
  password: string;

  @doc("Whether the user account is active and can access the system")
  isActive: boolean;

  @invisible(Lifecycle)
  @doc("Unix timestamp when the user account was created")
  createdAt: unixTimestamp32;

  @invisible(Lifecycle)
  @doc("Unix timestamp when the user account was last updated")
  updatedAt: unixTimestamp32;
}
