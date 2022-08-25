import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Password do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName });
            
            resetFormField();
        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already in used');
            }  

            console.log('user creation encounter an error', error.message);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name" 
                    type="text" 
                    name="displayName" 
                    value={displayName} 
                    onChange={handleChange} required
                />

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

                <FormInput 
                    label="Confirm Password" 
                    type="password" 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    onChange={handleChange} required
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;