/*parent component to header.js, movie.js, and search.js
  contains function that handles API request and func that
  calls API during init render
*/
import React, {useState, useEffect} from 'react';
import '../App.css';
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";
/* Can use multiple useState functions in one component */
const App = () => {
  const [loading, setLoading] = useState(true);
  /* pass in empty array to tell react that this effect should be called once */
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

    /* useEffect: react hook that allows for performing side effects in function 
      components
      side effects = data fetching, subscriptions, manual DOM manips
      combo of: componentDidMount, componentDidUpdate, componentWillUnmount
      gets called after first render (componentDidMount) and after every update
      (componentDidUpdate) */
    useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

    const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  	};

    
    return (
     <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">A few of fan-favorite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};


export default App;
