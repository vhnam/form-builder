
import "@typespec/http";
import "@typespec/versioning";

import "./models/form.tsp";
import "./models/health.tsp";

using Http;
using Versioning;

@service(#{
  title: "LokiForm",
})
@server("http://localhost:4000", "Single server endpoint")
@versioned(Versions)
namespace LokiForm;

enum Versions {
  v1: "1.0",
}