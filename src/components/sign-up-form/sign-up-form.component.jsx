// REACT HOOKS
import { useState } from "react";

// FUNCS FROM FIREBASE UTILS
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

// COMPONENTS
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

// STYLES
import "./sign-up-form.styles.scss";

// INITIAL DEFAULT VALUES OF FORM INPUTS
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  // STATE VALUES
  const [formFields, setFormFields] = useState(defaultFormFields);
  // DESRUCTURING FORM FIELDS STATE
  const { displayName, email, password, confirmPassword } = formFields;

  // FUNC FOR RESET THE FORMFIELDS STATE
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // SIGN UP HHNDLER
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  // SUBMIT HANDLER
  const submitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // CREATING USER DATABASE WITH DISPLAY NAME
      await createUserDocumentFromAuth(user, { displayName });

      // RESET FORM FIELDS STATE
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.error("user creation encountered an error", error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Display name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        {/* THE VARIENT THE MAKING otherProps OBJECT AND NAME IT inputOptions */}
        {/* <FormInput
          label="Display name"
          inputOptions={{
            type: "text",
            required: true,
            onChange: handleChange,
            name: "displayName",
            value: displayName,
          }}
        /> */}

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
