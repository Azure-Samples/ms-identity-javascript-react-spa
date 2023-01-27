import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';

// <ms_docref_import_modules>
import { Configuration, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, useMsal, useIsAuthenticated  } from '@azure/msal-react';
import { msalConfig } from './authConfig';

// Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';

// </ms_docref_configure_msal>
const msalInstance = new PublicClientApplication(msalConfig);
// </ms_docref_configure_msal>

const root = ReactDOM.createRoot(document.getElementById('root'));

// <ms_docref_use_msal_provider>
/**
 * We recommend wrapping most or all of your components in the MsalProvider component. It's best to render the MsalProvider as close to the root as possible.
 */
 root.render(
  <React.StrictMode>
      <MsalProvider instance={msalInstance}>
          <App />
      </MsalProvider>
  </React.StrictMode>
);

// </ms_docref_use_msal_provider>
