import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);