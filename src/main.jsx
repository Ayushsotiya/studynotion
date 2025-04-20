import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import rootReducer from './reducer/index.js'
import { configureStore } from '@reduxjs/toolkit'
import { Toaster } from "react-hot-toast"
import { BrowserRouter } from 'react-router-dom'
export const store = configureStore({
  reducer: rootReducer,
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
