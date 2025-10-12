import { Link, NavLink, Outlet } from "react-router-dom";
import { ThemeToggle } from "../components/common/ThemeToggle";
import { useAuth } from "../components/context/AuthContext";
import { ErrorBoundaryWrapper } from "../components/common/ErrorBoundaryWrapper";
import useToast from "../components/hooks/useToast";
import Toast from "../components/common/Toast";
import { useLogout } from "../components/hooks/useLogout";

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `btn text-xl ${isActive ? "btn-primary" : "btn-ghost"}`;


export const Layout = () => {
  const {user}= useAuth();
  const { toast } = useToast();
  const logoutUser = useLogout();

  return (
    <>
      {toast && <Toast />}
      <div>
        <div>
          <div className="navbar bg-base-300 w-full">
            <div className="navbar-start gap-x-2">
              <ThemeToggle></ThemeToggle>
              <NavLink to="/" className={getNavLinkClass}>Quotes</NavLink>
              <NavLink to="/products" className={getNavLinkClass}>Products</NavLink>

            </div>
            <div className="navbar-end flex-none space-x-2">
              {user
                ? <>
                  <button className="btn btn-lg btn-ghost" onClick={logoutUser}>Logout</button>
                  <Link to="/error" className="btn btn-lg btn-outline btn-error">Error</Link>
                </>
                : <>
                  <Link to="/login" className="btn btn-lg btn-ghost ">Login</Link>
                  <Link to="/register" className="btn btn-lg btn-ghost ">Register</Link>
                </>
              }
            </div>
          </div>

          <ErrorBoundaryWrapper>
            <main className="px-4 max-w-7xl mx-auto p-8">
              <Outlet />
            </main>
          </ErrorBoundaryWrapper>
        </div>
      </div>
    </>
  )
}

export default Layout;