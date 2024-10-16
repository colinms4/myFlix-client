import React from "react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Button, Col, Row } from "react-bootstrap";
import { NavigationBar } from "../nav-bar/nav-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieSearch } from "../movie-search.jsx/movie-search";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [filteredMovies, setFilterdMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch('https://myflixdb-movies123-5a87d32f5f6f.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
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
            ImagePath: movie.ImagePath,
            Featured: movie.Featured
          }
        })
        console.log("Movies fetched from API:", moviesFromApi); // Log the movies array
        setMovies(moviesFromApi);
        setFilterdMovies(moviesFromApi);
      })
  }, [token]);



  const onLoggedOut = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    window.location.reload();
  }

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={(e) => {
        setUser(null);
        setToken(null);
      }} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                    />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies}
                      user={user}
                      token={token}
                      setUser={setUser} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <MovieSearch movies={movies} setFilterdMovies={setFilterdMovies} />
                    {filteredMovies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route path="/profile" element={
            <>
              {user ? (
                <Col md={8}>
                  <ProfileView user={user} setUser={setUser} token={token} onLoggedOut={onLoggedOut} />
                </Col>
              ) : (
                <Navigate to="/login" replace />
              )}
            </>
          }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
