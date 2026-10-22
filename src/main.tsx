import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './i18n';
import { GlobalStyle } from './styles/GlobalStyle';

// Монтує застосунок у єдиний React-root; HelmetProvider дозволяє дочірнім
// компонентам керувати SEO-тегами, а GlobalStyle застосовує базове оформлення.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <GlobalStyle />
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);
