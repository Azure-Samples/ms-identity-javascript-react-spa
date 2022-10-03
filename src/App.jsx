import React, { useState } from 'react';
import './styles/App.css';
import { PageLayout } from './components/PageLayout';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { InteractionStatus, InteractionRequiredAuthError } from '@azure/msal-browser';
import Button from 'react-bootstrap/Button';
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';
import { ProfileData } from './components/ProfileData';


/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
    const { instance, inProgress  } = useMsal();
    const [graphData, setGraphData] = useState(null);

    const RequestProfileData = () => {
        
        /**
         * Silently acquires an access token which is then attached to a request for MS Graph data.  If the silent call failed we will use the interactive method.
         */

        if (inProgress === InteractionStatus.None) {
            const request = {
                ...loginRequest,
                account: instance.getActiveAccount(),
            };

            instance
                .acquireTokenSilent(request)
                .then((response) => {
                    callMsGraph(response.accessToken).then((response) => setGraphData(response));
                })
                .catch((e) => {
                    if (e instanceof InteractionRequiredAuthError) {
                        instance.acquireTokenRedirect(request);
                    }
                });
        }
    };

    return (
        <>
            <h5 className="card-title">Welcome {instance.getActiveAccount()?.name}</h5>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button variant="secondary" onClick={RequestProfileData}>
                    Request Profile Information
                </Button>
            )}
        </>
    );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in to see your profile information.</h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>
    );
}
