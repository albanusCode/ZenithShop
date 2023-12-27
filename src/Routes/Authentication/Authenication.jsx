import SignUpForm from "../../components/signUp-form/signUp-form";
import SignInForm from "../../components/SignInForm/signInForm";
import './Authentication.scss'

const Authentication = () => {
  return (
    <div className="authetication-container">
        <SignInForm />
        <SignUpForm />
    </div>
  )
}

export default Authentication;