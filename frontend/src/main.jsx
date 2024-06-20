import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { AuthProvider } from './context/AuthContext.jsx'
import { DiscountProvider } from './context/DiscountContext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
      <DiscountProvider>
      <ToastContainer />
        <App />
      </DiscountProvider>
      </AuthProvider>
  </React.StrictMode>,
)
