// firebase.js
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCgodMJZ53j9eVSG40xvAU0MUOF9_1n48g",
  authDomain: "ideasandconnection-fb0ec.firebaseapp.com",
  projectId: "ideasandconnection-fb0ec",
  storageBucket: "ideasandconnection-fb0ec.appspot.com",
  messagingSenderId: "460079387463",
  appId: "1:460079387463:web:08d6065a43b5121c6d7262",
  measurementId: "G-XBSZRZ2441",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app

