'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    // _error is passed but not used in this function
    // This is intentional as we only need to set hasError to true
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 text-center">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Something went wrong!
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                We{`'`}re sorry, but something went wrong on our end.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => this.setState({ hasError: false })}>
                Try again
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Go back home</Link>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}