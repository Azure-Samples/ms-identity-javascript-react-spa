import React from "react";
import { useMsal } from "@azure/msal-react";
import { b2cPolicies} from "../authConfig";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/esm/Dropdown";

/**
 * Renders a drop down button with child buttons for edit profile in with a popup or redirect
 */
export const EditProfileButton = () => {
    const { instance } = useMsal();
    
    const handleEdit = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(b2cPolicies.authorities.editProfile).catch(e => {
                console.log(e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(b2cPolicies.authorities.editProfile).catch(e => {
                console.log(e);
            });
        }
    }
    if (b2cPolicies && b2cPolicies.authorities && b2cPolicies.authorities.editProfile && b2cPolicies.authorities.editProfile.authority)
        return (
            <DropdownButton variant="secondary" className="ml-auto" drop="left" title="Edit Profile">
                <Dropdown.Item as="button" onClick={() => handleEdit("popup")}>Edit Profile using Popup</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => handleEdit("redirect")}>Edit Profile using Redirect</Dropdown.Item>
            </DropdownButton>
        );
    else
        return (<></>);
}