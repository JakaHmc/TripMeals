import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4ti3CRsec81gDu2YLsR5BHM5JnyTE0Q0",
  authDomain: "mealplan-90722.firebaseapp.com",
  projectId: "mealplan-90722",
  storageBucket: "mealplan-90722.appspot.com",
  messagingSenderId: "572204717562",
  appId: "1:572204717562:web:2e5ec4cb0408954168c043"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
  