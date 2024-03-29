import "./sign-up-form.styles.scss";
import { useState } from "react";
import {
  createAuthUserFromEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // console.log(formFields);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const copyFormFields = { ...formFields };
    copyFormFields[name] = value;
    setFormFields(copyFormFields);
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }
    try {
      const { user } = await createAuthUserFromEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields(); // clear fields now once user successfully created.
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email has already signed up!");
      } else {
        console.log("error occcured.", err.message);
      }
    }
  };

  return (
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
      <span>Sign Up with Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          name="displayName"
          type="text"
          required
          value={displayName}
          onChange={changeHandler}
        />
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
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={changeHandler}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
