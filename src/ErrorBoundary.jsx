import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError : false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          Ocorreu um erro com essa listagem. <Link to="/">Click aqui</Link> para voltar para a página inicial ou tente novamente mais tarde.
        </h2>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
