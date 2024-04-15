import "./sign-in-form.styles.scss";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useState, useContext } from "react";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const copyFormFields = { ...formFields };
    copyFormFields[name] = value;
    setFormFields(copyFormFields);
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        await signInAuthUserWithEmailAndPassword(email, password);
        resetFormFields();
    } catch(err){
        console.log(err.message);
    }
  }

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          required
          value={email}
          onChange={changeHandler}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          required
          value={password}
          onChange={changeHandler}
        />
        <div className="buttons-container">
        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">Sign In</Button>
        <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>Google Me!</Button>
        {/* Use type = button to prevent form submission for sign in */}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
