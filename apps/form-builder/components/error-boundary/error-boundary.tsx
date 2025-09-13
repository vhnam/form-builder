import React, { type ComponentType, type ErrorInfo, ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import ErrorFallback, { type ErrorFallbackProps } from './error-fallback';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

const ErrorBoundary = ({
  children,
  fallback = ErrorFallback,
  onError,
}: ErrorBoundaryProps) => {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    onError?.(error, errorInfo);
  };

  return (
    <ReactErrorBoundary FallbackComponent={fallback} onError={handleError}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
