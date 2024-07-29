import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full px-4 md:px-12 py-3 bg-gradient-to-b from-black to-transparent z-10 flex flex-col md:flex-row justify-between items-center">
      <img className="w-32 md:w-44 mb-4 md:mb-0" src={LOGO} alt="logo" />

      {user && (
        <div className="flex items-center space-x-4">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-900 text-white rounded-lg"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition duration-200"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>

          {/* <img
            className="w-10 h-10 object-cover"
            alt="user icon"
            src={user?.photoURL}
          /> */}
          <button
            onClick={handleSignOut}
            className="py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800 transition duration-200 font-bold"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
