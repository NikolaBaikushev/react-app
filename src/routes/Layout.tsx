import { Link, Outlet } from "react-router-dom";


const Home = () => {
  return (<><h1 className="text-blue-400">Welcome to my App!</h1></>)
}


export const Layout = () => {
    return (
    <div>
        <Home></Home>
        <ul className="flex flex-row gap-x-2 w-full text-left">
            <Link to="login">Login</Link>
            <Link to="register">Register</Link>
            <Link to="/">Home</Link>
        </ul>
        <Outlet></Outlet>
    </div>)
}

export default Layout;