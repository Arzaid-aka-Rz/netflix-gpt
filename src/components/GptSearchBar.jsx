import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_OPTIONS, GOOGLE_KEY,  } from "../utils/constants"; // Import the API key
import { addGptMovieResult } from "../utils/gptSlice";

// Initialize the GoogleGenerativeAI instance with your API key
// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
const genAI = new GoogleGenerativeAI(GOOGLE_KEY);

const GptSearchBar = () => {


  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    const query = searchText.current.value.trim();
    if (!query) {
      console.error("Search query is empty");
      return;
    }
  
    // Modify the query to ensure only names are returned
    const gptQuery = `Provide only the names of 5 real movies based on the following description: "${query}". Please format your response as a comma-separated list with just the movie names, without any numbers or extra details. For example: Movie1, Movie2, Movie3, Movie4, Movie5. Do not include any numbers, years, or other text.`;

    try {
      // Initialize the GoogleGenerativeAI instance
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      // Generate content
      const result = await model.generateContent(gptQuery);
      
      // Extract and log the generated text
      const text = result.generated_text || await result.response.text();
      
      // Extract movie names from the response if needed
      const movieNames = text.match(/(?:\*\*([^*]+?)\*\*)/g)?.map(name => name.replace(/\*\*/g, '')) || text.split(',').map(name => name.trim());
  
      console.log("Generated movie names:", movieNames);

      const movieList = movieNames;
      //for each movie i will search for tmdb api 
      const promiseArray = movieList.map((movie) => searchMovieTMDB(movie));
      // [Promise, Promise, Promise, Promise, Promise]
  
      const tmdbResults = await Promise.all(promiseArray);
  
      console.log(tmdbResults);
      dispatch(
        addGptMovieResult({ movieNames: movieList, movieResults: tmdbResults })
      );
    }
     catch (error) {
      console.error("Error generating content:", error);
      if (error.response) {
        const errorText = await error.response.text();
        console.error("API Error Response:", errorText);
      }
    }
  };
  
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
    className="w-full md:w-1/2 bg-black grid grid-cols-12"
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
