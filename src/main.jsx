import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Display from './components/questionScreen.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Display />
  </StrictMode>,
)
