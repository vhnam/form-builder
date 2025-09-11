@doc("Represents the health status of the LokiForm server, including environment information, current status, uptime, and timestamp for monitoring and diagnostics.")
model ServerHealth {
  @doc("The deployment environment (e.g., 'development', 'staging', 'production')")
  environment: string;

  @doc("Current server status (e.g., 'healthy', 'unhealthy', 'degraded')")
  status: string;

  @doc("Server uptime duration in a human-readable format")
  uptime: string;

  @doc("Unix timestamp when the health check was performed")
  timestamp: unixTimestamp32;
}

@doc("Represents the health status of the database connection, including database type, connection status, and timestamp for monitoring database connectivity.")
model DatabaseHealth {
  @doc("Type or name of the database (e.g., 'postgresql', 'mysql', 'mongodb')")
  database: string;

  @doc("Current database connection status (e.g., 'connected', 'disconnected', 'error')")
  status: string;

  @doc("Unix timestamp when the database health check was performed")
  timestamp: unixTimestamp32;
}
