import React, {useContext, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {UserContext} from "../../utils/AppContextProvider.jsx";



const backendAPI = import.meta.env.VITE_BACKEND_BASE_URL;

function  LoginForm(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {userDetail, setUserDetail} = useContext(UserContext)

     async function handleLogin(){
         const detail = await axios.get(`${backendAPI}/api/user/logIn`,{headers:{
                'Content-Type': 'application/json', // 设置请求头，指定数据类型为JSON
                'Authorization': 'Basic ' + btoa(`${username}:${password}`)
            }})
         setUserDetail(detail.data.data)
         alert(userDetail.username)
    }


    return (
        <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email or Username</Form.Label>
                <Form.Control
                    placeholder="Enter email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant="outline-primary" type="submit" >
                Submit
            </Button>

        </Form>

    );
}

export default LoginForm;