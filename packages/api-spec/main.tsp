import "@typespec/http";
import "@typespec/versioning";

import "./enums/api.tsp";

import "./types/api.tsp";
import "./types/scalar.tsp";

import "./models/form.tsp";
import "./models/form-submission.tsp";
import "./models/health.tsp";
import "./models/user.tsp";

import "./apis/auth.tsp";
import "./apis/form.tsp";
import "./apis/form-submission.tsp";
import "./apis/health.tsp";

using Http;
using Versioning;

@service(#{ title: "LokiForm " })
@server("http://localhost:4000", "API endpoint")
@summary("A modern, drag-and-drop form builder application built with Next.js and TypeScript, organized as a Turborepo monorepo. Create dynamic forms with various field types, conditional logic, and real-time preview capabilities.")
@doc("LokiForm is a comprehensive form builder API that enables users to create, manage, and publish dynamic forms with advanced features including conditional logic, multiple field types, form validation, and submission management. The API provides authentication, form CRUD operations, form publishing, and submission handling capabilities.")
@versioned(Versions)
namespace LokiForm;
