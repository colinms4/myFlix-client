import { useEffect, useState, useSyncExternalStore } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Button, Col, Row } from "react-bootstrap";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [ user, setUser ] = useState(storedUser? storedUser : null);
    const [ token, setToken ] = useState(storedToken? storedToken : null);

    useEffect(() => {
        if (!token) {
            return;
        }
        fetch('https://myflixdb-movies123-5a87d32f5f6f.herokuapp.com/movies', {
            headers: { Authorization: `bearer ${token}`}
        })
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
    },[token]);

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <>
                <Col md={5}>
                <LoginView onLoggedIn={(user) => setUser(user)} />
                or
                <SignupView />
                </Col>
                </>
            ) : selectedMovie ? (
                <Col md={8}>
                <MovieView movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
                />
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty</div>
            ) : (
                <>
                {movies.map((movie) => (
                    <Col className="mb-5" key={movie.id} md={3}>
                    <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                    />
                    </Col>
                    ))}
                </>
            )}
    { user && (
        <Col md={{ span: 4, offset: 3}}>
        <Button onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
        }} variant="primary">Logout</Button>
        </Col>
        )}
        </Row>
    );
};
