import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// get this from firebase project page
const firebaseConfig = {
  apiKey: "AIzaSyDVQaWJUdbcrnp7Ck77GF2WLKCjbJ-6J-w",
  authDomain: "crwn-clothing-c5722.firebaseapp.com",
  projectId: "crwn-clothing-c5722",
  storageBucket: "crwn-clothing-c5722.appspot.com",
  messagingSenderId: "275826992939",
  appId: "1:275826992939:web:ec2d9fd5aa1669e8c7c76e"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid); // users will be collections name
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {displayName, email, createdAt})
        } catch(err){
            console.log('error creating the user', err.message)
        }
    }

    return userDocRef;

}