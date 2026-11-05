import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Dash from './Dash.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
   
    <Dash />
    <h1>working on adding ui data history later</h1>
  </StrictMode>,
)
