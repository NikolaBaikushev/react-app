import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryWrapper } from "../common/ErrorBoundaryWrapper";

export const Home = () => {
  const [user] = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold">
        Welcome, <span className="text-emerald-500">{user.username}</span>!
      </h1>
      <div className="mt-10">
          <Outlet />
      </div>
    </div>
  );
};

export default Home;