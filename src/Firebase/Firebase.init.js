import firebaseConfig from "./FirebaseConfig";
import { initializeApp } from "firebase/app";

const initializeFirebase = () => {
    initializeApp(firebaseConfig);
}

export default initializeFirebase;