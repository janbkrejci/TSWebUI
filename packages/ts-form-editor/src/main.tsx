import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Import custom elements
import '../../ts-form/src/ts-form.js';
import '../../ts-form-wrapper/src/ts-form-wrapper.js';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
