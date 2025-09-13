import "@typespec/http";
import "@typespec/rest";

using Http;
using Rest;

@route("/auth")
@tag("Auth")
namespace LokiForm.Auth {
  @post
  @route("login")
  @summary("Login")
  @doc("Authenticates a user with their email and password credentials. Returns the authenticated user's profile information upon successful login. This endpoint is used for user authentication in the form builder application.")
  op signIn(
    @body payload: {
      email: string;
      password: string;
    },
  ): User;

  @post
  @route("register")
  @summary("Register an account")
  @doc("Creates a new user account with the provided personal information and credentials. Returns the authenticated user's profile information upon successful registration. This endpoint is used for user registration in the form builder application.")
  op register(
    @body payload: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
  ): User;

  @get
  @route("profile")
  @useAuth(Http.BearerAuth)
  @summary("Get profile")
  @doc("Retrieves the authenticated user's profile information including personal details and account settings. This endpoint requires a valid authentication token.")
  op getProfile(): User;

  @put
  @route("profile")
  @useAuth(Http.BearerAuth)
  @summary("Update profile")
  @doc("Updates the authenticated user's profile information including personal details, password, interface preferences, and language settings. This endpoint requires a valid authentication token.")
  op updateProfile(
    @body payload: {
      firstName?: string;
      lastName?: string;
      password?: string;
      interfaceMode?: "light" | "dark" | "system";
      interfaceLanguage?: "en-US" | "vi-VN";
    },
  ): User;

  @post
  @route("change-password")
  @useAuth(Http.BearerAuth)
  @summary("Change password")
  @doc("Updates the authenticated user's password by providing the current password and a new password. This endpoint requires a valid authentication token and validates the current password before making the change.")
  op changePassword(
    @body payload: {
      oldPassword: string;
      newPassword: string;
    },
  ): User;

  @post
  @route("forgot-password")
  @useAuth(Http.BearerAuth)
  @summary("Reset password")
  @doc("Initiates a password reset process by sending a reset token to the user's email address. This endpoint is used when users forget their password and need to reset it.")
  op forgotPassword(
    @body payload: {
      email: string;
    },
  ): User;

  @post
  @route("reset-password")
  @useAuth(Http.BearerAuth)
  @summary("Reset password")
  @doc("Completes the password reset process using a valid reset token and new password. This endpoint is used after the user receives a reset token via email.")
  op resetPassword(
    @body payload: {
      token: string;
      newPassword: string;
    },
  ): User;

  @post
  @route("refresh")
  @useAuth(Http.BearerAuth)
  @summary("Refresh token")
  @doc("Refreshes an expired authentication token using a valid refresh token. This endpoint is used to maintain user sessions without requiring re-authentication.")
  op refresh(
    @body payload: {
      refreshToken: string;
    },
  ): User;
}
