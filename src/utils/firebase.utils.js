import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0wT-NfStG0YWqnLjMGhS_QfOkWVYwAJA",
  authDomain: "crwn-clothing-app-bb771.firebaseapp.com",
  projectId: "crwn-clothing-app-bb771",
  storageBucket: "crwn-clothing-app-bb771.appspot.com",
  messagingSenderId: "465698830725",
  appId: "1:465698830725:web:df7aa51e9de9e54f6b2cec",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// FIREBASE AUTH INITIALIZINGS
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// FIREBASE FIRESTORE INITIALIZINGS
export const db = getFirestore();

// CREATING DATABASE DOCUMENT FOR CURRENT USER IF HE OR SHE DOES NOT EXIST
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // IF CURRENT USER DOES NOT EXIST
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date().toISOString();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
      });
    } catch (error) {
      console.error("error creating the user", error.message);
    }
  }
  // IF CURRENT USER DOES EXIST
  return userDocRef;
};
