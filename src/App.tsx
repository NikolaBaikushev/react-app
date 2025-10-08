import './App.css'
import { Route, Routes, useParams } from 'react-router'
import Layout from './routes/Layout'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import QuotesPage from './components/quotes/QuotePage'
import Quotes from './components/quotes/Quotes'
import Home from './components/home/Home'
import { useGetProductsQuery } from './redux/api/api'
import ProductsPage from './components/products/ProductPage'
import { ErrorBoundaryWrapper } from './components/common/ErrorBoundaryWrapper'
import { Suspense } from 'react'
import ErrorTest from './components/common/ErrorTest'
import NotFoundPage from './components/common/NotFoundPage'


const ProductDetailsPage = () => {
  const params = useParams();
  return <div><h1>Product Detail For {params.id}</h1></div>
}
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
          <Route element={<Home />}>
            <Route index element={<QuotesPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:id" element={<ProductDetailsPage />} />

          </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="error" element={<ErrorTest />} />
      </Route>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default App
