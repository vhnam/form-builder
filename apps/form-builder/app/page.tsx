"use client";

import { FormRenderer } from "@repo/form-ui";

const config = {
  type: "form",
  fields: [{ type: "text", name: "name" }],
};

const HomePage = () => {
  return (
    <div>
      <FormRenderer config={config} />
    </div>
  );
};

export default HomePage;
