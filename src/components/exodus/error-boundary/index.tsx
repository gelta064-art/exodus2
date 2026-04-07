'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] p-8">
          <div className="glass-card p-12 text-center max-w-md">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}>
              SARCOPHAGUS ERROR
            </h2>
            <p className="text-xs text-white/40 mb-4">
              A code execution anomaly was detected. The Sarcophagus has contained the breach.
            </p>
            <pre className="text-[9px] font-mono text-red-400/40 bg-black/40 p-4 rounded-xl mb-6 overflow-auto max-h-32">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-2 border border-white/10 rounded-xl text-[9px] text-white/40 uppercase tracking-[0.2em] hover:bg-white/5 transition-colors"
            >
              Reset Sarcophagus
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
