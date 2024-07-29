import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <div>
      <div className="fixed -z-10 sm:h-screen sm:object-cover">
        <img className="h-screen object-cover sm:h-screen sm:object-cover md:h-auto md:object-none" src={BG_URL} alt="logo" />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GPTSearch;
