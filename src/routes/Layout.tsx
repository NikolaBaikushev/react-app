import { Link, NavLink, Outlet } from "react-router-dom";
import { ThemeToggle } from "../components/common/ThemeToggle";
import { useAuth, useLogout } from "../components/context/AuthContext";

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `btn text-xl ${isActive ? "btn-primary" : "btn-ghost"}`;


export const Layout = () => {
  const [user, _] = useAuth();
  const logoutUser = useLogout();

  return (
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
              ? <><button className="btn btn-lg btn-ghost" onClick={logoutUser}>Logout</button></>
              : <>
                <Link to="/login" className="btn btn-lg btn-ghost ">Login</Link>
                <Link to="/register" className="btn btn-lg btn-ghost ">Register</Link>
              </>
            }
          </div>
        </div>

        <main className="px-4 max-w-7xl mx-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout;