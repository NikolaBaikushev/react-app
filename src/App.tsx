import './App.css'
import { Route, Routes } from 'react-router'
import Layout from './routes/Layout'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import QuotesPage from './components/quotes/QuotePage'
import Quotes from './components/quotes/Quotes'
import Home from './components/home/Home' 

const ProductsPage = () => {
    return <div><h1>Products</h1></div>
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<Home />}>
          <Route index element={<QuotesPage/>}/>
          <Route path="products" element={<ProductsPage/>}/>
        </Route>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
      </Route>
    </Routes>
  )
}

export default App
