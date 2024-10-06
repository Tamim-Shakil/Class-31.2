import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

// const API_URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMovie = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTUzNjVlNzY5NTBiMDQyZWZlZWVmMzEzZWY5ZTAxMyIsIm5iZiI6MTcyMTA3MDE2MC4wMzA1ODYsInN1YiI6IjY2OTU2OTkzYzk2MDQ1MmRjNDhjMTdkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a9njXsRRVB7CGq76tikE3CK1yfkHShp9dZq31WquHMY",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies(response.results))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  if (movies.length == 0) {
    return (
      <div>
        <h1>Loading.....</h1>
      </div>
    );
  }

  return (
    <>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movies={movie} />
      ))}
    </>
  );
}

function MovieCard({ movies }) {
  const { backdrop_path, title, overview } = movies;
  return (
    <>
      <div className="card">
        <img
          src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
          alt={title}
        />
        <h2>{title}</h2>
        <p>{overview}</p>
      </div>
    </>
  );
}

export default App;
