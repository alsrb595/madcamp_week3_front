import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { CartProvider } from './contexts/CartContext.tsx'
import { TransactionProvider } from './contexts/TransactionContext.tsx'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <AuthProvider>
          <TransactionProvider>
            <App/>
          </TransactionProvider>
        </AuthProvider>
      </CartProvider>
    </Router>
  </React.StrictMode>,
)
