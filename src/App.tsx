import './App.css'
import { Route, Routes } from 'react-router'
import Layout, { Home } from './routes/Layout'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
      </Route>
    </Routes>
  )
}

export default App
