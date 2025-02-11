import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import AuthProvider from './layout/AuthProvider.tsx'

import {router} from "./routes/routes.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
  
    <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
