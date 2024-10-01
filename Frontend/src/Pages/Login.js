import React, { useState } from 'react';
import './Login.css';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { loginData } from '../api';
import { useDispatch } from 'react-redux';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const dispatch = useDispatch();

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Password validation function (e.g., min 6 characters)
    const validatePassword = (password) => {
        return password.length >= 6;
    };

    async function login(e) {
        e.preventDefault(); 

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password should be at least 6 characters long.');
            return;
        }

        setError(''); 
        await loginData({ email, password }, dispatch);
    }

    return (
        <div className="login-page">
            <Container>
                <Row className="justify-content-center align-items-center h-100">
                    <Col md={8} lg={6} xl={4}>
                        <Card className="login-card shadow-lg">
                            <Card.Body>
                                <h2 className="text-center mb-4">Login</h2>
                                {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                                <Form onSubmit={login}>
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

                                    <Button variant="primary" type="submit" className="w-100">
                                        Login
                                    </Button>
                                </Form>

                                <div className="text-center mt-3">
                                    <p className="small fw-bold mt-2 pt-1 mb-2">
                                        Don't have an account? <Link to={'/Signup'}>Sign up</Link>
                                    </p>
                                    <p className="small fw-bold mt-2 pt-1 mb-2">
                                        <Link to={'/Admin'}>Or Admin</Link>
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

export default Login;
