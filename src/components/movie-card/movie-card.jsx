import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Card style={{ width: '18rem'}} className="h-100">
          <Card.Img variant="top" src={movie.ImagePath}></Card.Img>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                <Button variant="dark">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        id: PropTypes.string,
        Description: PropTypes.string,
        Featured: PropTypes.bool,
        ImagePath: PropTypes.string,
        Director: PropTypes.shape({
            Name: PropTypes.string,
            Bio: PropTypes.string,
            Birth: PropTypes.string,
            Death: PropTypes.string
        }),
        Genre: PropTypes.shape({
            Name: PropTypes.string,
            Description: PropTypes.string
        })
    }).isRequired,
    onMovieClick: PropTypes.func
} 