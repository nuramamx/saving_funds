import { Component, ErrorInfo } from "react";
import useNotificationStore from "../stores/notification-store";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class GenericErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    return this.props.children;
  }
}

export default GenericErrorBoundary;