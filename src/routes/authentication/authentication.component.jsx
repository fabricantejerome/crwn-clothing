import { useEffect } from "react";
import { getRedirectResult } from 'firebase/auth';

import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in/sign-in-form.component";

import './authentication.styles.scss';

const Authentication = () => {
    // useEffect(() => {
    //     async function fetchMyAPI() {
    //         const response = await getRedirectResult(auth);
    //         console.log(response);

    //         if (response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     }
    //     fetchMyAPI()
    // }, []);

    // const logGoogleRedirectUser = async () => {
    //     const { user } = await signInWithGoogleRedirect();
    //     console.log(user);
    // }

    return ( 
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
            { /*<button onClick={signInWithGoogleRedirect}>Sign In with Google Redirect</button> */ }
        </div>
    );
}

export default Authentication;