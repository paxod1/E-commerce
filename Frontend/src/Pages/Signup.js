import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { SignupData } from '../api'; // Assuming this is your API function for signup
import { IoLogoFoursquare } from 'react-icons/io';

function Signup() {
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); // To show error messages
    const [success, setSuccess] = useState(false); // To show success message
    const navigate = useNavigate();

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Password confirmation validation
    const validatePasswordConfirmation = (password, confirmPassword) => {
        return password === confirmPassword;
    };

    // Handle form submission
    async function register(e) {
        e.preventDefault();

        // Check if email is valid
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Check if password matches confirm password
        if (!validatePasswordConfirmation(password, confirmPassword)) {
            setError('Passwords do not match.');
            return;
        }

        // Check if password length is at least 6 characters
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        // Clear error if all validations pass
        setError('');

        try {
            // Assuming SignupData is an API function that sends the data to the server
            await SignupData({ firstname, email, password });
            setSuccess(true); // Show success message
            setTimeout(() => {
                navigate('/'); // Redirect to home after signup
            }, 1500);
        } catch (err) {
            console.log(err);
            setError('An error occurred during registration.');
        }
    }

    return (
        <div className="signup-page">
            <Container>
                <Row className="justify-content-center align-items-center h-100">
                    <Col md={8} lg={6} xl={4}>
                    <div className="text-center platform-icon">
                    <IoLogoFoursquare size={35} /><p className="platform-text">amous</p>
                </div>
                        <Card className="signup-card shadow-lg">
                            <Card.Body>
                                <h2 className="text-center mb-4">Sign Up</h2>

                                {/* Show error message */}
                                {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                                {/* Show success message */}
                                {success && <Alert variant="success" className="text-center">Signup successful! Redirecting...</Alert>}

                                <Form onSubmit={register}>
                                    <Form.Group className="mb-3" controlId="formFirstName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter full name"
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="w-100">
                                        Sign Up
                                    </Button>
                                </Form>

                                <div className="text-center mt-3">
                                    <p className="small fw-bold mt-2 pt-1 mb-2">
                                        Already have an account? <Link to={'/'}>Login</Link>
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Signup;
