import { useState } from "react";
import './signUp-form.scss'
import Button from "../Button/Button";
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from "../../utils/firebase/utilis";
import FormInput from "../FormInput/FormInput";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
    };
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert('password missmatch'); return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Email already in use'); return;
            } else{
                console.error("Error creating user", error);
             }
        }

    }

  return (
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign up with email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label='Display Name' type="text" required onChange={handleChange} name="displayName" value={displayName}/>

            <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email}/>

            <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password}/>

            <FormInput label='Confirm Password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

            <Button buttonType='inverted' type="submit">Sign Up</Button>
        </form>
    </div>
  )
}

export default SignUpForm