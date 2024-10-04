import { useState } from "react";

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
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                />
            </label>
            <label>
                Password:
                <input type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            <label>
                Birthday:
                <input type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                />
            </label>
            <label>
                Email:
                <input type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};