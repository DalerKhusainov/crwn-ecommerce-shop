import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

/////////////////////////////////////////////////////////////////////////////////////
// FIREBASE AUTH INITIALIZINGS
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

/////////////////////////////////////////////////////////////////////////////////////
// FIREBASE FIRESTORE INITIALIZINGS
export const db = getFirestore();

/////////////////////////////////////////////////////////////////////////////////////
// CREATING DATABASE DOCUMENT FOR CURRENT USER IF HE OR SHE DOES NOT EXIST
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // IF DON'T GET USERAUTH VALUE RETURN NOTHING
  if (!userAuth) return;

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
        ...additionalInformation,
      });
    } catch (error) {
      console.error("error creating the user", error.message);
    }
  }
  // IF CURRENT USER DOES EXIST
  return userDocRef;
};

/////////////////////////////////////////////////////////////////////////////////////
// FUNC FOR CREATING ATHENTICATION OF A USER WITH EMAIL
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // IF WE DON'T GET EMAIL OR PASSWORD ARGUMENTS WE DON'T RUN OUR FUNCTION
  if (!email || !password) return;

  // IF EMAIL OR PASSOWRD HAVE VALUE THAN INITIALIZE THE AUTHENTICATION
  return await createUserWithEmailAndPassword(auth, email, password);
};

/////////////////////////////////////////////////////////////////////////////////////
// FUNC FOR SIGNING A USER WITH EMAIL AND PASSWORD
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  // IF WE DON'T GET EMAIL OR PASSWORD ARGUMENTS WE DON'T RUN OUR FUNCTION
  if (!email || !password) return;

  // IF EMAIL OR PASSOWRD HAVE VALUE THAN INITIALIZE THE AUTHENTICATION
  return await signInWithEmailAndPassword(auth, email, password);
};

/////////////////////////////////////////////////////////////////////////////////////
// FUNC FOR SIGNING OUT A USER
// NOTE: auth IS ALSO KEEPING TRACK OF WHAT USERS ARE SIGNED IN RIGHT NOW
export const signOutUser = async () => await signOut(auth);

/////////////////////////////////////////////////////////////////////////////////////
// CREATING OBSERVER LISTENER
// WHAT OBSERVER DOES IS IT RETURNS YOU BACK WHATEVER YOU GET BACK FROM ON OFF STATE CHANGED
// IN ORDER FOR ONAUTHSTATECHANGED TO WORK. IT TAKES TWO PARAMETERS
// 1. AUTH SINGLETON. 2. CALLBACK WHICH WE WANT TO CALL EVERY TIME AUTH STATE CHANGES
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
