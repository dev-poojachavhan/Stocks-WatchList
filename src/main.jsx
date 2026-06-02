import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient();
const savedTheme =
  localStorage.getItem("theme") || "light";

document.documentElement.setAttribute(
  "data-theme",
  savedTheme
);

createRoot(document.getElementById('root')).render(
 
    <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
  
)
