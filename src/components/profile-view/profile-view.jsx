import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { UserInfo } from "../profile-view/user-info";

export const ProfileView = ({ user, setUser, token, onLoggedOut }) => {
  // State to hold the editable user data
  const [formData, setFormData] = useState({
    username: user.Username || '',
    email: user.Email || '',
    birthday: user.Birthday || '',
    password: '',
    favoriteMovies: user.FavoriteMovies || []
  });
  const [users, setUsers] = useState([]);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      Username: formData.username,
      Email: formData.email,
      Birthday: formData.birthday
    };

    // Simulate API call to update user details
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser); // Update the main app state with new user data
    alert('Profile updated!');
  };

  const ProfileDelete = () => {
    fetch(`https://myflixdb-movies123-5a87d32f5f6f.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    }).then((response) => {
      if (response.ok) {
        alert("Account Deleted Successfully");
        onLoggedOut(); e
      } else {
        alert("Failed to Unregister Account");
      }
    }).catch((error) => console.error("Error:", error)); k
  };


  useEffect(() => {
    if (user) {
      fetch('https://myflixdb-movies123-5a87d32f5f6f.herokuapp.com/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).then((response) => response.json())
        .then((data) => {
          const usersFromApi = data.map((user) => {
            return {
              Username: user.Username,
              Password: user.Password,
              Email: user.Email,
              Birthday: user.Birthday,
              FavoriteMovies: user.FavoriteMovies || [],
              Id: user._id
            }
          })
          setUsers(usersFromApi);
          console.log(usersFromApi);
        })
    }
  }, []);

  return (
    <Container>
      <h2 className='mt-5'>User Information</h2>
      <UserInfo user={user} />
      <h2 className="mt-5">Update Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formBirthday" className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Update Profile
        </Button>
        <Row>
          <Col>
            <h4>Favorite Movies</h4>
            <ul>
              {formData.favoriteMovies.length > 0 ? (
                formData.favoriteMovies.map((movie, index) => <li key={index}>{movie}</li>)
              ) : (
                <p>No favorite movies added.</p>
              )}
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant='danger' type='submit' onClick={ProfileDelete}>Delete Profile</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

