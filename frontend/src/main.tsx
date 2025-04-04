import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider }  from "@tanstack/react-query"
import { Toaster } from "@/components/ui/sonner"


const queryclient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <QueryClientProvider client={queryclient}>
    <App />
    </QueryClientProvider>  
  </StrictMode>,
)
