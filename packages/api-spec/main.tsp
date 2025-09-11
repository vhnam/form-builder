import "@typespec/http";
import "@typespec/versioning";

import "./enums/api.tsp";

import "./types/api.tsp";
import "./types/scalar.tsp";

import "./models/form.tsp";
import "./models/form-response.tsp";
import "./models/health.tsp";

import "./apis/form.tsp";
import "./apis/form-response.tsp";
import "./apis/health.tsp";

using Http;
using Versioning;

@service(#{ title: "LokiForm " })
@server("http://localhost:4000", "API endpoint")
@summary("A modern, drag-and-drop form builder application built with Next.js and TypeScript, organized as a Turborepo monorepo. Create dynamic forms with various field types, conditional logic, and real-time preview capabilities.")
@versioned(Versions)
namespace LokiForm;
