import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from './components/context/ThemeContext.tsx'
import { AuthProvider } from './components/context/AuthContext.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
