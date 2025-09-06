import { Button } from "@repo/core-ui/components";
import React from "react";

type FormConfig = Record<string, unknown>;
type FormData = Record<string, unknown>;

type Props = {
  config: FormConfig;
  onSubmit?: (data: FormData) => void;
};

export const FormRenderer: React.FC<Props> = ({ config }) => {
  return (
    <div>
      <pre>{JSON.stringify(config, null, 2)}</pre>
      {/* You can render real fields later */}

      <Button>Submit</Button>
    </div>
  );
};
