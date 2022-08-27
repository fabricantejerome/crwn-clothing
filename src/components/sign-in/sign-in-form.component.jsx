import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormField();
        } catch(error) {
            const errorMessage = ['auth/user-not-found', 'auth/invalid-email', 'auth/wrong-password']
            if (errorMessage.includes(error.code)) {
                alert('Incorrect password or email');
                return;
            }

            console.log(error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email" 
                    type="text" 
                    name="email" 
                    value={email} 
                    onChange={handleChange} required
                />

                <FormInput 
                    label="Password" 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={handleChange} required
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} >Google sign in</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;