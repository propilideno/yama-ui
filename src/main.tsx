import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { Figure } from './Figure.tsx'
import "./global.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Figure />
  </React.StrictMode>,
)
