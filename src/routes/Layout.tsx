import { Link, Outlet } from "react-router-dom";
import { THEME_LIGHT, ThemeToggle } from "../components/common/ThemeToggle";
import React, { useContext } from "react";


export const Home = () => (
  <div className="text-center py-20">
    <h1 className="text-3xl font-bold">Welcome to My App</h1>
  </div>
)

const Theme = React.createContext('emptymist')


export const Layout = () => {
  const [theme, setTheme] = useContext(Theme)

  console.log(theme, 'layout ....')
  return (
    <Theme.Provider value={theme}>
        <div>
      <div>
        <div className="navbar bg-base-300 w-full">
          <div className="navbar-start">
            <ThemeToggle></ThemeToggle>
            <Link to="/" className="btn btn-ghost text-xl ">MyApp</Link>
          </div>
          <div className="navbar-end flex-none space-x-2">
            <Link to="/login" className="btn btn-lg btn-ghost ">Login</Link>
            <Link to="/register" className="btn btn-lg btn-ghost ">Register</Link>
          </div>
        </div>

        <main className="px-4 max-w-7xl mx-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
    </Theme.Provider>
    )
}

export default Layout;