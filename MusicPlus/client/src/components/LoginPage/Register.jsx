import React, {useContext, useEffect, useState} from "react";
import Layout from "../Layout/Layout.jsx";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import PlayerContext from "../../utils/AppContextProvider.jsx";
import "./Register.css";
import {useToast} from "../../utils/AppContextProvider.jsx";
import './LoginForm.css';
import {RiArrowGoBackFill} from "react-icons/ri";
import {BACKEND_API} from "../../utils/env.js";

function Register(){
    const { addToast } = useToast();
    const { setShowPlayer } = useContext(PlayerContext);
    const history = useNavigate();
    useEffect(() => {
        setShowPlayer(true);
        return () => {
            setShowPlayer(false);
        };
    }, [setShowPlayer]);
    function handleLastPage(){
        history(-1)
    }
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    function handleEmailBlur() {
        setIsValidEmail(validateEmail(email));
    }
    function handlePasswordBlur() {
        setIsValidPassword(password === password1);
    }
    async function handleUsernameBlur() {
        setIsValidUsername(await validateUsername(username));
    }
    async function validateUsername(username){
        const response = await fetch(`${BACKEND_API}/api/user/validUsername/`+username)
        let result = await response.json()
        return result.data
    }
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValidEmail && isValidUsername && isValidPassword) {
            try {
                const response = await fetch(`${BACKEND_API}/api/user/newUser`, {
                    method: 'POST', // 指定请求方法为POST
                    headers: {
                        'Content-Type': 'application/json', // 设置请求头，指定数据类型为JSON
                    },
                    body: JSON.stringify({
                        "username": username,
                        "password": password,
                        "email": email

                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json(); // 假设服务器返回的是JSON格式数据
                console.log(responseData)
                history("/login")
                addToast("Registration successfully!")
                // const response = await axios.post(`${API_BASE_URL}/playList/newPlayList`)
            } catch (error) {
                console.error('Error posting data:', error);
                addToast("Something wrong! We will fix it ASAP!")
            }
        }
    };


    return (
        <Container fluid className="register-container">
            <Row className="h-100">
                <Col className="d-none d-md-flex col-md-5 col-lg-7" />
                <Col className="d-flex align-items-center col-12 col-md-6 col-lg-4">
                    <Card className="register-card">
                        <Button
                            variant="link"
                            className="back-button hover-text-button"
                            onClick={handleLastPage}

                        >
                            <RiArrowGoBackFill />
                        </Button>
                        <Card.Body>
                            <h1 className="text-center mb-4">Register</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="username"
                                        placeholder="Enter username"
                                        value={username}
                                        onBlur={handleUsernameBlur}
                                        isInvalid={!isValidUsername}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        Username is not available.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={handleEmailBlur}
                                        isInvalid={!isValidEmail} />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid email address.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password1}
                                        onChange={(e) => setPassword1(e.target.value)}
                                        onBlur={handlePasswordBlur}
                                        isInvalid={!isValidPassword}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid password.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mt-4">
                                    Register
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Register
