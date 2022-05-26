import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
  <Auth0Provider
    domain="therookies.us.auth0.com"
    clientId="NTitcY3q3FUJGQ67aF4yeN7llM2rbRoo"
    redirectUri={window.location.origin}
  >
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </BrowserRouter>
  </Auth0Provider>,

  document.getElementById('root')
);

reportWebVitals();
