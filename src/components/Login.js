import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm,setIsSignInForm]=useState(true);

  const toggleSignInForm =()=>{
    setIsSignInForm(!isSignInForm); 
  }
  return (
    <div>
      <Header/>
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/be90e543-c951-40d0-9ef5-e067f3e33d16/IN-en-20240610-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt=""
        />
      </div>
      <form className="absolute p-12 my-36 mx-auto right-0 left-0 bg-black w-4/12 text-white rounded-lg bg-opacity-80">
      <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up" }</h1>
      {!isSignInForm && <input type="text" placeholder="Full Name" className="my-4 p-4 w-full bg-gray-700"/>}
        <input type="text" placeholder="Email Address" className="my-4 p-4 w-full bg-gray-700"/>
        <input type="password" placeholder="Password" className="my-4 p-4 w-full bg-gray-700"/>
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg">
        {isSignInForm ? "Sign In" : "Sign Up" }
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
        {isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In Now" }
          
        </p>
      </form>
    </div>
  );
};

export default Login;
