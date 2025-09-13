import Link from 'next/link';
import React from 'react';

import { PRIVATE_ROUTES } from '@/constants/routes';

import { Button } from '@repo/core-ui/components/button';

export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  return (
    <div className="flex h-full min-h-[400px] items-center justify-center">
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          An error occurred while loading this page.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-500">
              Error details
            </summary>
            <pre className="mt-2 text-left text-xs text-red-600">
              {error.message}
            </pre>
          </details>
        )}
        <Link href={PRIVATE_ROUTES.home}>
          <Button variant="outline">Go to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorFallback;
