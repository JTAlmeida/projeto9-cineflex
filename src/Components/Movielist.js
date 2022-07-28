import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Movielist() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const request = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    );

    request.then((res) => {
      setMovies(res.data);
    });
  }, []);

  return (
    <>
      <h2>Selecione o filme</h2>
      <div className="movie-list">
        {movies.map((movie) => (
            <Movie 
            key={movie.id}
            id={movie.id}
            posterURL={movie.posterURL}
            />
        ))}
      </div>
    </>
  );
}

function Movie({id, posterURL}){
return (
    <div className="movie">
        <Link to={`/sessoes/${id}`}>
        <img src={posterURL} />
        </Link>
    </div>
)}
