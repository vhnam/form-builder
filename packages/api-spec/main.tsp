
import "@typespec/http";

import "./models/form.tsp";
import "./models/health.tsp";

using Http;

@service(#{
  title: "LokiForm",
})
@server("http://localhost:4000", "Single server endpoint")

namespace LokiForm;


