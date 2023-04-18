import React, {useContext, useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import {NavLink, useLocation, useNavigate, redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import axios from "axios";

import {UserContext} from "../../utils/AppContextProvider.jsx";
import {Card, Col, Container, Row} from "react-bootstrap";
import { FaUserCircle, FaLock } from 'react-icons/fa';
import { RiArrowGoBackFill } from 'react-icons/ri';
import './LoginForm.css';



const backendAPI = import.meta.env.VITE_BACKEND_BASE_URL;

function  LoginForm(){
    const history = useNavigate();
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {userDetail, setUserDetail} = useContext(UserContext)
     async function handleSubmit(){
         const detail = await axios.get(`${backendAPI}/api/user/logIn`,{headers:{
                'Content-Type': 'application/json', // 设置请求头，指定数据类型为JSON
                'Authorization': 'Basic ' + btoa(`${username}:${password}`)
            }})
         setUserDetail(detail.data.data)
         //console.log(detail.data.data)

    }
    useEffect(() => {
        if (userDetail && userDetail.username) {
            console.log(userDetail.username);
            //alert(userDetail.username);
        }
    }, [userDetail]);
    function handleRegister(){
        history("/register");
    }
    function handleLastPage(){
        history(-1)
    }
    const handleNext = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };


    return (
        <Container fluid className="login-container">
            <Row className="h-100">
                <Col className="d-none d-md-flex col-md-5 col-lg-7" />
                <Col className="d-flex align-items-center col-12 col-md-6 col-lg-4">
                    <Card className="login-card">
                        <Button
                            variant="link"
                            className="back-button hover-text-button"
                            onClick={handleLastPage}

                        >
                            <RiArrowGoBackFill />
                        </Button>
                        <Card.Body>

                            <h1 className="text-center mb-4">MusicPlus</h1>
                            {step === 1 ? (
                                <Form onSubmit={handleNext}>
                                    <Form.Group className="mb-3 mt-4">
                                        <Form.Label>
                                            <FaUserCircle /> Username
                                        </Form.Label>
                                        <Form.Control
                                            type="username"
                                            placeholder="Please input username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100 mt-4">
                                        Next
                                    </Button>
                                    <Button
                                        variant="link"
                                        className="w-100 text-center mt-2 "
                                        onClick={handleRegister}
                                    >
                                        Register
                                    </Button>

                                </Form>
                            ) : (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <FaLock /> password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Please input password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100 mt-4">
                                        Log in
                                    </Button>
                                    <Button
                                        variant="link"
                                        className="w-100 text-center mt-2 "
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginForm;
