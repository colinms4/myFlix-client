import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const SignupView = () => {
    const [ username, setUsername ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ birthday, setBirthday ] = useState(null);
    const [ email, setEmail ] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Birthday: birthday,
            Email: email
        };
        fetch("https://myflixdb-movies123-5a87d32f5f6f.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup Successful");
                window.location.reload();
            } else {
                alert("Signup Failed");
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group>
               <Form.Label>Email:</Form.Label>
                <Form.Control type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </Form.Group>
            <Button type="submit" variant="primary">Submit</Button>
        </Form>
    );
};