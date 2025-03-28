
import React, { Component, ErrorInfo, ReactNode } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { Toaster } from "sonner";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      error: error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to help with debugging
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleRetry = (): void => {
    // Reset the error state to try rendering the component again
    this.setState({ hasError: false, error: null });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Return fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Return default error UI
      return (
        <div className="p-4 m-4 rounded-md">
          <ErrorMessage 
            message={this.state.error?.message}
            onRetry={this.handleRetry}
          />
          <Toaster />
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}
