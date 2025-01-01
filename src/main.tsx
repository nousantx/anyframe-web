import { createRoot } from 'react-dom/client'
import { Routes } from '@generouted/react-router'
import './styles/css/index.css'
import { ThemeProvider } from './contexts/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <Routes />
  </ThemeProvider>
)
