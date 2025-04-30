// src/components/ErrorBoundary.jsx

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message || 'Something went wrong' };
  }

  componentDidCatch(error, info) {
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center text-red-400">
          <h2 className="text-xl font-semibold mb-2">Oops! An error occurred.</h2>
          <p>{this.state.errorMessage}</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
