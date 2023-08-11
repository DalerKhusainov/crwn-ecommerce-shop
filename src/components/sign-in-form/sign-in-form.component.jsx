// REACT HOOKS
import { useState } from "react";

// FUNCS FROM FIREBASE UTILS
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase.utils";

// COMPONENTS
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

// STYLES
import "./sign-in-form.styles.scss";

// INITIAL DEFAULT VALUES OF FORM INPUTS
const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  // STATE VALUES
  const [formFields, setFormFields] = useState(defaultFormFields);
  // DESRUCTURING FORM FIELDS STATE
  const { email, password } = formFields;

  // FUNC FOR RESET THE FORMFIELDS STATE
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // SIGN IN WITH GOOGLE HANDLER
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    console.log("Click");
  };

  // SIGN UP HHNDLER
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  // SUBMIT HANDLER
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);

      // RESET FORM FIELDS STATE
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Google sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
