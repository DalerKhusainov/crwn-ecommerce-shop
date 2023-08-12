// REACT HOOKS
import { createContext, useState, useEffect } from "react";

// FROM FIREBASE UTILS
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase.utils";

// AS THE ACTUAL VALUE YOU WANT TO ACCESS
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// THE PROVIDER IS THE ACTUAL COMPONENT
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  console.log(currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      // IF A USER SIGNED IN WE GET USER VALUE
      // OR IF USER SIGNED OUT WE GET NULL
      setCurrentUser(user);
    });

    return unsubscribe;
  });

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
