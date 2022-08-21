import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { goto } from "$app/navigation"
import { session } from "./infoStores"
import {get} from "svelte/store"


const firebaseConfig = {
    apiKey: "AIzaSyAZsDMhpjMEU3Fa1B4pQ-niBVK3hF0_XA4",
    authDomain: "tasktic-1e312.firebaseapp.com",
    projectId: "tasktic-1e312",
    storageBucket: "tasktic-1e312.appspot.com",
    messagingSenderId: "494927387002",
    appId: "1:494927387002:web:126cc88b52ea2b6e521ec3",
    measurementId: "G-V2TFJNP6X8"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app)

export async function googleLogin(){
    await signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            session.set({user: user})
            console.log(get(session))
            // ...
        });

    //redirect to projects/workspace
    await goto('/accountPage')
}

export async function googleLogOut(){
    session.set({user: null})
    console.log(get(session))
    await signOut(auth)
    //redirect to projects/workspace
    await goto('/')
}