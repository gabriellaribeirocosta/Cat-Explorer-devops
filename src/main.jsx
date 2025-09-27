import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CssBaseline } from '@mui/material'
import { CatProvider } from './contexts/CatContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CatProvider>
      <CssBaseline />
      <App />
    </CatProvider>
  </React.StrictMode>
)
