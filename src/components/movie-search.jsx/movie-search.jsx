import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

export const MovieSearch = ({ movies, setFilterdMovies }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const filtered = movies.filter((movie) =>
            movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilterdMovies(filtered);
    }
    return (
        <Form className="d-flex mb-4" onSubmit={handleSearchSubmit} >
            <FormControl
                type="search"
                placeholder="search for a movie by title"
                className="me-2"
                value={searchTerm}
                onChange={handleSearch}
            />
            <Button variant="outline-success" type="submit">Search</Button>
        </Form>
    )
};