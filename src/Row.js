import React,{useState,useEffect} from 'react';
import './Row.css';
import axios from "./axios";//this is from our file axios.js .Since the instance we export is a default we can change its name to axios.
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/"
function Row({ title, fetchUrl, isLargeRow }) {
  //we put title & fetchURL as props
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl); // //axios is from the baseUrl from axios.js. fetchUrl is from app.js
      // //here we dont need to write then .json to change it to object.It is already change by async await.
      // console.log(request);
      // console.log(request.data.results);
      setMovies(request.data.results); //we updated our movies to results.
      return request;
    }
    fetchData();
  }, [fetchUrl]); //fetchUrl is a dependancy here.
  // console.log(movies);
  const opts = {
    heighr: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
   
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title ||movie?.name||movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row


  // it is good to name by using BlockElementModifier BEM 