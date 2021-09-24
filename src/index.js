import React from "react";
import ReactDOM from "react-dom";
// <ms_docref_import_css>
import "bootstrap/dist/css/bootstrap.min.css";
// </ms_docref_import_css>
import "./styles/index.css";
import App from "./App.jsx";
// <ms_docref_import_libraries>
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
// </ms_docref_import_libraries>

/**
 * Initialize a PublicClientApplication instance which is provided to the MsalProvider component
 * We recommend initializing this outside of your root component to ensure it is not re-initialized on re-renders
 */
// <ms_docref_constant_msal_instance>
const msalInstance = new PublicClientApplication(msalConfig);
// </ms_docref_constant_msal_instance>
/**
 * We recommend wrapping most or all of your components in the MsalProvider component. It's best to render the MsalProvider as close to the root as possible.
 */
// <ms_docref_msal_provider>
ReactDOM.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <App />
        </MsalProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
// </ms_docref_msal_provider>
