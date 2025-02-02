import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes.tsx'
import { QueryProvider } from './providers/QueryProvider.tsx'
import MainLayout from './layout/MainLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </QueryProvider>
  </StrictMode>,
)
