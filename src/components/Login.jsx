import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative h-screen">
      <Header />
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src={BG_URL}
          alt="Background"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-sm p-6 bg-black bg-opacity-80 text-white rounded-lg"
        >
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-4 my-2 w-full bg-gray-700 rounded-lg"
            />
          )}
          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className="p-4 my-2 w-full bg-gray-700 rounded-lg"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-2 w-full bg-gray-700 rounded-lg"
          />

          {errorMessage && (
            <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
          )}
          <button
            className="p-4 my-4 bg-red-700 w-full rounded-lg hover:bg-red-800 transition duration-200"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer text-center" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Netflix? Sign Up Now"
              : "Already registered? Sign In Now."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
