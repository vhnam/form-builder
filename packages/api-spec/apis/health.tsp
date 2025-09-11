import "@typespec/http";
import "@typespec/rest";

using Http;
using Rest;

@route("/health")
@tag("Health")
namespace LokiForm.Health {
  @get
  @summary("Check server health status")
  @doc("Returns the current status, uptime, environment, and timestamp of the LokiForm server. This endpoint is used for monitoring, load balancer health checks, and system diagnostics to ensure the application is running properly.")
  op checkServerHealth(): ServerHealth;

  @get
  @summary("Check database health status")
  @doc("Returns the current status, timestamp, and database information for the LokiForm database connection. This endpoint is used for monitoring database connectivity, ensuring data persistence is available, and diagnosing database-related issues in the application.")
  @route("/database")
  op checkDatabaseHealth(): ServerHealth;
}
