// components/common/NotFound.tsx

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1470&q=80)",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-6xl font-bold text-primary">404</h1>
          <p className="mb-5 text-2xl text-left">Oops! The page you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary btn-wide text-lg mt-2">
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
