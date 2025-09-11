model User {
  @visibility(Lifecycle.Read)
  id: uuid;

  name: string;
  email: string;

  @visibility(Lifecycle.Create, Lifecycle.Update)
  password: string;

  isActive: boolean;

  @invisible(Lifecycle)
  createdAt: unixTimestamp32;

  @invisible(Lifecycle)
  updatedAt: unixTimestamp32;
}
