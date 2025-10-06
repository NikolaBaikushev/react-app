import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NavLink, Route, Routes } from 'react-router'
import Layout from './routes/Layout'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path="login" element={<Login></Login>} />
        <Route path="register" element={<Register></Register>} />
      </Route>
    </Routes>
  )
}

const Login = () => {
  return (
    <form className='container w-sm'>
      <div className='flex flex-col items-start w-full justify-between gap-y-2'>
        <div className='flex flex-col items-start w-full'>
          <label htmlFor='username'>Username:</label>
          <input 
            name="username"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col items-start w-full">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className='w-full'>Login</button>
      </div>
    </form>
  )
}

const Register = () => {
  return (
    <form className='container w-sm'>
      <div className='flex flex-col items-start w-full justify-between gap-y-2'>
        <div className='flex flex-col items-start w-full'>
          <label htmlFor='username'>Username:</label>
          <input 
            name="username"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col items-start w-full">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            name="confirmPassword"
            type="confirmPassword"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className='w-full'>Register</button>
      </div>
    </form>
  )
}

export default App
