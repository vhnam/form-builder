@doc("Defines the available user roles in the LokiForm system, determining access levels and permissions for different types of users.")
enum Role {
  @doc("Standard user role with basic form creation and management permissions")
  user,

  @doc("Administrator role with elevated permissions for managing users and system settings")
  admin,

  @doc("Super administrator role with full system access and all administrative privileges")
  superadmin,
}

@doc("Defines the available interface mode options for user interface theming preferences.")
enum InterfaceMode {
  @doc("Light theme mode")
  light,

  @doc("Dark theme mode")
  dark,

  @doc("System theme mode that follows the user's system preference")
  system,
}

@doc("Defines the available language options for the user interface localization.")
enum InterfaceLanguage {
  @doc("English (United States) language")
  `en-US`,

  @doc("Vietnamese (Vietnam) language")
  `vi-VN`,
}
