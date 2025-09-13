import { Loader2Icon } from 'lucide-react';
import React from 'react';

const Spinner = (props: React.ComponentProps<'div'>) => (
  <div className="flex h-full items-center justify-center" {...props}>
    <Loader2Icon className="text-primary size-24 animate-spin" />
  </div>
);

export default Spinner;
