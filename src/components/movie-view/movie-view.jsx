import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export const MovieView = ({ movies, user, token, userFavMovies }) => {
   // const [favMovies, setFavMovies] = useState([]);
   // const { FavoriteMovies } = useParams();
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);
    // const favMovie = users.find((u) => u.FavoriteMovies === FavoriteMovies)
   
  
  const addFavMovie = () => {
    fetch(`https://myflixdb-movies123-5a87d32f5f6f.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(updatedUser => {
        setUser(updatedUser); // Update user in global state
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Update localStorage
        setFavMovie(userFavMovies); // Update UI
      })
      .catch(error => console.error('Error:', error));
  };

  const removeFavMovie = () => {
    fetch(`https://myflixdb-movies123-5a87d32f5f6f.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(updatedUser => {
        setUser(updatedUser); // Update user in global state
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Update localStorage
        setFavMovies(false); // Update UI
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <div>
        
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Bio: </span>
        <span>{movie.Director.Bio}</span>
      </div>
      <Link to={`/`}>
        <Button variant="dark">Back</Button>
      </Link>
        <Button variant="danger">Remove from Favorites</Button>
        <Button variant="primary" onClick={userFavMovies}>Add to Favorites</Button>
    </div>
  );
};
