import './App.css'
import { Route, Routes } from 'react-router'
import Layout from './routes/Layout'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import QuotesPage from './components/quotes/QuotePage'
import Home from './components/home/Home'
import ProductsPage from './components/products/ProductPage'
import ErrorTest from './components/common/ErrorTest'
import NotFoundPage from './components/common/NotFoundPage'
import React from 'react'
import LazyComponentWrapper from './components/common/LazyComponentWrapper'
import { delayImport } from './utils/helpers'
import ProductDetailsPageFallback from './components/products/ProductDetailsPageFallback'
import { ArtificialDelays } from './redux/api/api'


const ProductDetailsPage = React.lazy(() => delayImport(ArtificialDelays.PRODUCTS_DETAILS_SUSPENSE, import('./components/products/ProductDetailsPage')));

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<Home />}>
          <Route index element={<QuotesPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={
            <LazyComponentWrapper fallback={<ProductDetailsPageFallback/>}>
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
