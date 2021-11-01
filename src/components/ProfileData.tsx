import React from "react";
import { GraphData } from "../authConfig";

type Props = {
  graphData: GraphData;
}

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */
export const ProfileData: React.FC<Props> = (props: Props) => {
    console.log(props.graphData);

    return (
        <div id="profile-div">
            <p><strong>First Name: </strong> {props.graphData.givenName}</p>
            <p><strong>Last Name: </strong> {props.graphData.surname}</p>
            <p><strong>Email: </strong> {props.graphData.userPrincipalName}</p>
            <p><strong>Id: </strong> {props.graphData.id}</p>
        </div>
    );
};