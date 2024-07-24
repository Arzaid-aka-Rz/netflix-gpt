// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-QrrVus_pyZCU2X_FEaXkntZ9bEXoU_w",
  authDomain: "netflix-gpt-project-c82de.firebaseapp.com",
  projectId: "netflix-gpt-project-c82de",
  storageBucket: "netflix-gpt-project-c82de.appspot.com",
  messagingSenderId: "509060710495",
  appId: "1:509060710495:web:52d9eacb42786dc45b5bea",
  measurementId: "G-Q3HTPQSXLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();