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
import React from 'react'

const ProductDetailsPage = React.lazy(() => import('../src/components/products/ProductDetailsPage'))

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<Home />}>
          <Route index element={<QuotesPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={
            <Suspense fallback={<div><h1>LOADING DETAULS ...</h1></div>}>
              <ProductDetailsPage />
            </Suspense>
          } />

        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="error" element={<ErrorTest />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
