import { useState } from "react";
import './signInForm.scss'
import Button from "../Button/Button";
import { 
    signInwithGooglePopup, 
    signInAuthUserWithEmailAndPassword 
} from "../../utils/firebase/utilis";
import FormInput from "../FormInput/FormInput";


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(
                email, 
                password
            );
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Wrong password');
                    break;
                case 'auth/user-not-found':
                    alert('User does not exist');
                    break;
                default:
                    alert('error occured', error);
            }
        }

    };

    const signInWithGoogle = async () => {
        await signInwithGooglePopup();
    }

  return (
    <div className="sign-up-container">
        <h2>Already have an account?</h2>
        <span>Sign in with email and password</span>
        <form onSubmit={handleSubmit}>

            <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email}/>

            <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password}/>

            <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign In</Button>
            </div>
        </form>
    </div>
  )
}

export default SignInForm;