import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export const MovieView = ({ movies, user, token, setUser }) => {
  const [favMovies, setFavMovies] = useState(user.FavoriteMovies || []);
  const { movieId } = useParams();
  console.log("Movie ID:", movieId);
  const movie = movies.find((list) => list.id === movieId);


  if (!movie) {
    return <div>Loading movie details...</div>; // You can customize this message or add a spinner
  }

  const addFavMovie = () => {
    fetch(`https://myflixdb-movies123-5a87d32f5f6f.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
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
        setFavMovies(updatedUser.FavoriteMovies);
        alert("Movie sucessfully added to favorites");
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
        setFavMovies(updatedUser.FavoriteMovies); // Update UI with updated list of favorite movies
        alert("Movie sucessfully deleted from favorites");
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <div>
        <img src={movie.ImagePath} alt={movie.Title} />
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
      <Button variant="danger" onClick={removeFavMovie}>Remove from Favorites</Button>
      <Button variant="primary" onClick={addFavMovie}>Add to Favorites</Button>
    </div>
  );
};
