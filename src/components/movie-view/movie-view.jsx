import { Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img className="image" src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
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
            <Button onClick={onBackClick} variant="dark">Back</Button>
        </div>
    );
};
