import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Intercom chat widget (production only)
if (import.meta.env.PROD) {
  window.intercomSettings = {
    api_base: 'https://api-iam.intercom.io',
    app_id: 'xlhhzf8r',
  };
  const ic = document.createElement('script');
  ic.async = true;
  ic.src = 'https://widget.intercom.io/widget/xlhhzf8r';
  document.head.appendChild(ic);
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
