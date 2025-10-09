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
import ErrorTest from './components/common/ErrorTest'
import NotFoundPage from './components/common/NotFoundPage'
import React from 'react'
import LazyComponentWrapper from './components/common/LazyComponentWrapper'
import { delayImport } from './utils/helpers'


const ProductDetailsPage = React.lazy(() => delayImport(4000, import('./components/products/ProductDetailsPage')));

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<Home />}>
          <Route index element={<QuotesPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={
            <LazyComponentWrapper fallback={<div><h1>LOADING DETAILS ...</h1></div>}>
              <ProductDetailsPage />
            </LazyComponentWrapper>
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
