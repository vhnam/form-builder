
import "@typespec/http";

using Http;

model ServerHealth{
  status: string;
  timestamp: int16;
  uptime: string;
  environment: string;
}

model DatabaseHealth {
  status: string;
  timestamp: int16;
  database: string;
}

@route("/health")
namespace LokiForm.Health {
  @get
  @doc("Check server health - Returns the current status, uptime, environment, and timestamp of the LokiForm server. This endpoint is used for monitoring, load balancer health checks, and system diagnostics to ensure the application is running properly.")
  op checkServerHealth(): {
    @statusCode statusCode: 200;
    @body status: ServerHealth;
  };

  @get
  @doc("Check database health - Returns the current status, timestamp, and database information for the LokiForm database connection. This endpoint is used for monitoring database connectivity, ensuring data persistence is available, and diagnosing database-related issues in the application.")
  @route("/database")
  op checkDatabaseHealth(): {
    @statusCode statusCode: 200;
    @body status: ServerHealth;
  };
}
