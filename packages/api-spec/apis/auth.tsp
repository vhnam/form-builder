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
  op login(
    @body payload: {
      email: string;
      password: string;
    },
  ): User;
}
