import { Link, Navigate, Outlet } from "react-router-dom";
import { THEME_LIGHT, ThemeToggle } from "../components/common/ThemeToggle";
import React, { useContext, useEffect, useEffectEvent, useState } from "react";
import { useTheme } from "../components/context/ThemeContext";
import { useAuth, useLogout } from "../components/context/AuthContext";
import { deleteLocalStorageItem, LocalStorageKeys } from "../services/localStorage.service";
import { getAllQuotes } from "../services/quote.service";
import type { QuoteItem } from "../types/quotes/quotes";
import Quotes from "../components/quotes/Quotes";


export const Home = () => {
  const [user, setUser] = useAuth();
  const [quotes, setQuotes] = useState([] as QuoteItem[]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await getAllQuotes();
        setQuotes(data.quotes);
      } catch (error) {
        console.error("Failed to load quotes:", error);
      }
    }
    fetchQuotes();
  }, [])

  const quotesHtml = user ? <>
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold">Welcome, <span className="text-emerald-500">{user?.username}</span>!</h1>
      {quotes.length && <Quotes quotes={quotes} />}
    </div>
  </> : <><Navigate to="/login"></Navigate></>;

  return quotesHtml;
}


export const Layout = () => {
  const [user, _] = useAuth();
  const logoutUser = useLogout();

  return (
    <div>
      <div>
        <div className="navbar bg-base-300 w-full">
          <div className="navbar-start">
            <ThemeToggle></ThemeToggle>
            <Link to="/" className="btn btn-ghost text-xl ">Quotes</Link>
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