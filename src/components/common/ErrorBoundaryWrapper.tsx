import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: {
    error: Error;
    resetErrorBoundary: () => void;
}) {
    return (
        <div
            className="hero min-h-screen bg-center bg-cover relative"
            style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80)", // calm abstract blurred background
            }}
            role="alert"
        >
            <div className="hero-overlay bg-black bg-opacity-60"></div>
            <div className="hero-content text-center text-white px-4">
                <div className="w-full text-left">
                    <h1 className="text-primary text-left mb-6 text-6xl font-extrabold tracking-wide">Oops! Something went wrong.</h1>
                    <p className="mb-6 text-2xl leading-relaxed">  Sorry for the inconvenience. An unexpected error occurred. Please try again or contact support if the problem persists.
                        <br />
                        <p>Error Message: <span className='text-secondary'>{error.message}</span></p>
                    </p>
                    <button
                        onClick={resetErrorBoundary}
                        className="btn btn-primary btn-lg rounded-3xl"
                        aria-label="Try again"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}

export const ErrorBoundaryWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                window.location.reload();
            }}
        >
            {children}
        </ErrorBoundary>
    );
};
