// <ms_docref_import_libraries>
import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/esm/Dropdown";
// </ms_docref_import_libraries>

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
// <ms_docref_constant_sign_in_button>
export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            });
// </ms_docref_constant_sign_in_button>
// <ms_docref_login_redirect>
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
// </ms_docref_login_redirect>
// <ms_docref_constant_sign_in_popup>
        }
    }
    return (
        <DropdownButton variant="secondary" className="ml-auto" drop="left" title="Sign In">
            <Dropdown.Item as="button" onClick={() => handleLogin("popup")}>Sign in using Popup</Dropdown.Item>
// </ms_docref_constant_sign_in_popup>
// <ms_docref_redirect_button>
            <Dropdown.Item as="button" onClick={() => handleLogin("redirect")}>Sign in using Redirect</Dropdown.Item>
// </ms_docref_redirect_button>
// <ms_docref_end_dropdown_button>
        </DropdownButton>
    )
}
// </ms_docref_end_dropdown_button>
