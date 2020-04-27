import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDR41qlGcmjx21zwLXM6HDXd431Atpl6xs",
    authDomain: "crwn-clothing-8f986.firebaseapp.com",
    databaseURL: "https://crwn-clothing-8f986.firebaseio.com",
    projectId: "crwn-clothing-8f986",
    storageBucket: "crwn-clothing-8f986.appspot.com",
    messagingSenderId: "382007744928",
    appId: "1:382007744928:web:3c8ca31927e0c2881fecc5",
    measurementId: "G-D1EDS1DMNN"

}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`user/${userAuth.uid}`);

    const snapShot = await userRef.get();
    console.log(snapShot);
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (err) {
            console.log('error creating user', err.message)
        }
    }

    return userRef;
    // console.log(firestore.doc('users/12'))
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;