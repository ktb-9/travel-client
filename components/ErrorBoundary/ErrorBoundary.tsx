import * as Sentry from "@sentry/react-native";
import { ComponentType, PropsWithChildren } from "react";
import { Component } from "react";
import { ErrorProps } from "../Error/Error";
import { HTTPError } from "../../api/HTTPError";

interface ErrorBoundaryProps {
  Fallback: ComponentType<ErrorProps>;
  onReset?: (error: ErrorType) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: ErrorType | null;
}

type ErrorType = Error | HTTPError;

const INITIAL_STATE = {
  hasError: false,
  error: null,
} as const;

class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state = INITIAL_STATE;

  static getDerivedStateFromError(error: ErrorType): ErrorBoundaryState {
    return { hasError: true, error };
  }

  private captureError = (error: ErrorType): void => {
    Sentry.withScope((scope) => {
      scope.setLevel("error");
      scope.setExtra("errorType", error.name);
      Sentry.captureMessage(`[${error.name}]`);
    });
  };

  componentDidCatch(error: ErrorType): void {
    this.captureError(error);
  }

  private resetErrorBoundary = (): void => {
    const { onReset } = this.props;
    const { error } = this.state;
    if (error && onReset) {
      onReset(error);
    }
    this.setState(INITIAL_STATE);
  };

  private getErrorDetails = (error: ErrorType) => {
    if (error instanceof HTTPError) {
      return {
        statusCode: error.statusCode,
      };
    }
    return {
      statusCode: undefined,
    };
  };

  render() {
    const { Fallback, children } = this.props;
    const { error } = this.state;

    if (error) {
      const errorDetails = this.getErrorDetails(error);
      return (
        <Fallback {...errorDetails} resetError={this.resetErrorBoundary} />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
