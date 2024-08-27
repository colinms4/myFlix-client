import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card";
import { MovieView } from "../movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch('https://myflixdb-movies123-5a87d32f5f6f.herokuapp.com/movies')
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.Title,
                        Director: {
                            Name: movie.Director.Name,
                            Bio: movie.Director.Bio,
                            Birth: movie.Director.Birth,
                            Death: movie.Director.Death
                        },
                        Genre: {
                            Name: movie.Genre.Name,
                            Description: movie.Genre.Description
                        },
                        Description: movie.Description,
                        ImagePath: `https://myflixdb-movies123-5a87d32f5f6f.herokuapp.com/${movie.ImagePath}`,
                        Featured: movie.Featured
                    }
                })
                setMovies(moviesFromApi);
            })
    })

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }
    if (movies.length === 0) {
        return <div>The List is empty!</div>;
    } else {
        return (
            <div>
                {movies.map((movie) => {
                    return (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    );
                })}
            </div>
        );
    }
};