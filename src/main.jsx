import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import './index.css'

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

// The HTML of each page is pre-rendered at build time (scripts/prerender.mjs) for
// search engines and a fast first paint; React then takes over by rendering the
// same page again (a snapshot taken by Chrome cannot be hydrated reliably).
createRoot(document.getElementById('root')).render(app)
