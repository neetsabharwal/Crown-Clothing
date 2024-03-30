// import { useEffect } from "react";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
// import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth } from "../../utils/firebase/firebase.utils";
// import { getRedirectResult } from 'firebase/auth';
import './authentication.styles.scss';

const Authentication = () => {

    // useEffect(()=>{
    //     const getResponse = async () => {
    //         const response = await getRedirectResult(auth);
    //         if(response){
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     }
    //     getResponse();
    // },[])

    // const logGoogleUser = async () => {
    //     const {user} = await signInWithGooglePopup();
    //     const userDocRef = await createUserDocumentFromAuth(user);
    // };

    return(
        <div className="sign-in-page-container">
            
            {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;