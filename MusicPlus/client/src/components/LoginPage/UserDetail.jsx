import Layout from "../Layout/Layout.jsx";
import { Container, Row, Col, Form, } from "react-bootstrap";
import "./UserDetail.css";
import { useContext, useEffect, useState } from "react";
import user from "../../static/user.jpg"
import PlayerContext, { UserContext } from "../../utils/AppContextProvider.jsx";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../utils/AppContextProvider.jsx";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {BACKEND_API} from "../../utils/env.js";



function UserDetail() {
    const { addToast } = useToast();
    const { setShowPlayer } = useContext(PlayerContext);
    const { userDetail, setUserDetail } = useContext(UserContext)
    const history = useNavigate();
    const [userAvatar, setUserAvatar] = useState("");
    const [userDOB, setUserDOB] = useState("");
    const [userLastName, setUserLastName] = useState("")
    const [userFirstName, setUserFirstName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userOldPassword, setUserOldPassword] = useState("")
    const [userNewPassword, setUserNewPassword] = useState("")
    const [userCheckNewPassword, setUserCheckNewPassword] = useState("")
    const [userAddressNumber, setUserAddressNumber] = useState("")
    const [userAddressStreet, setUserAddressStreet] = useState("")
    const [userAddressCity, setUserAddressCity] = useState("")
    const [userAddressPostcode, setUserAddressPostcode] = useState("")



    useEffect(() => {
        // 检查userDetail.avatar是否具有有效值
        if (userDetail.avatar) {
            setUserAvatar(userDetail.avatar);
        }
        if (userDetail.dateOfBirth) {
            setUserDOB(userDetail.dateOfBirth.substring(0, 10));
        }
        if (userDetail.firstName) {
            setUserFirstName(userDetail.firstName);
        }
        if (userDetail.lastName) {
            setUserLastName(userDetail.lastName);
        }
        if (userDetail.email) {
            setUserEmail(userDetail.email);
        }
        if (userDetail.address) {
            if (userDetail.address.number) {
                setUserAddressNumber(userDetail.address.number);
            }
            if (userDetail.address.street) {
                setUserAddressStreet(userDetail.address.street);
            }
            if (userDetail.address.city) {
                setUserAddressCity(userDetail.address.city);
            }
            if (userDetail.address.postcode) {
                setUserAddressPostcode(userDetail.address.postcode);
            }
        }

    }, [userDetail]);
    useEffect(() => {
        setShowPlayer(true);
        return () => {
            setShowPlayer(false);
        };
    }, [setShowPlayer]);


    async function changeUserInfo(event) {
        event.preventDefault();
        try {
            const response = await fetch(`${BACKEND_API}/api/user/updateUserInfo`, {
                method: 'PUT', // 指定请求方法为POST
                headers: {
                    'Content-Type': 'application/json', // 设置请求头，指定数据类型为JSON
                    'Authorization': 'Basic ' + btoa(`${userDetail.username}:${userDetail.password}`)
                },
                body: JSON.stringify({
                    "_id": userDetail._id,
                    "username": userDetail.username,
                    "password": userDetail.password,
                    "email": userEmail,
                    "avatar": userAvatar,
                    "firstName": userFirstName,
                    "lastName": userLastName,
                    "dateOfBirth": userDOB,
                    "address": { "number": userAddressNumber, "street": userAddressStreet, "city": userAddressCity, "postcode": userAddressPostcode }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json(); // 假设服务器返回的是JSON格式数据
            console.log(responseData.data)
            setUserDetail(responseData.data)
            addToast('Updated successfully!');
            // const response = await axios.post(`${API_BASE_URL}/playList/newPlayList`)
        } catch (error) {
            console.error('Error posting data:', error);
            addToast("Something wrong! We will fix it ASAP!")
        }
    }
    async function changePassword(event) {
        event.preventDefault();
        if (userNewPassword === userCheckNewPassword) {
            try {
                const response = await fetch(`${BACKEND_API}/api/user/changePassword`, {
                    method: 'PUT', // 指定请求方法为POST
                    headers: {
                        'Content-Type': 'application/json', // 设置请求头，指定数据类型为JSON
                        'Authorization': 'Basic ' + btoa(`${userDetail.username}:${userDetail.password}`)
                    },
                    body: JSON.stringify({
                        "_id": userDetail._id,
                        "oldPassword": userOldPassword,
                        "newPassword": userNewPassword
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json(); // 假设服务器返回的是JSON格式数据
                setUserDetail({})
                history("/login")
                addToast('Updated successfully!');
                // const response = await axios.post(`${API_BASE_URL}/playList/newPlayList`)
            } catch (error) {
                console.error('Error posting data:', error);
                addToast("Something wrong! We will fix it ASAP!")
            }
        }
        else {
            addToast("Passwords do not match!")
        }
    }
    function handleFileSelect(e) {
        const file = e.target.files[0];
        const maxFileSize = 5 * 1024 * 1024; // 5MB

        if (file.size > maxFileSize) {
            alert('The image size exceeds the 5MB limit.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {

            setUserAvatar(e.target.result);
        };
        reader.readAsDataURL(file);

    }
    return (
        <>
            {/* <Layout> */}
            <h2>Update User Detail</h2>
            <hr></hr>

            <h4>User Avatar</h4>
            
            <Form>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Form.Group className="avatar-right-top">
                    <div className="mb-3">
                        <img
                            src={userAvatar || user}
                            alt="profile"
                            className="profile-image"
                            onClick={() => document.getElementById("avatarInput").click()}
                        />
                        <input
                            type="file"
                            id="avatarInput"
                            style={{ display: "none" }}
                            onChange={handleFileSelect}
                        />
                    </div>
                </Form.Group>
                </div>
                <Form.Group>
                    <Form.Label>DOB</Form.Label>
                    <Form.Control type="date" value={userDOB} onChange={(event) => {
                        setUserDOB(event.target.value); 
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="name" value={userLastName} onChange={(event) => {
                        setUserLastName(event.target.value);
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="name" value={userFirstName} onChange={(event) => {
                        setUserFirstName(event.target.value); // 更新日期值
                    }} />
                </Form.Group>

            </Form>

            <hr></hr>
            <h4>Contact</h4>

            <Form>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="example@example.com" value={userEmail} onChange={(event) => {
                        setUserEmail(event.target.value); // 更新日期值
                    }} />
                </Form.Group>


                <Form.Group>
                    <Form.Label>Street Number</Form.Label>
                    <Form.Control type="" placeholder="Main St" value={userAddressNumber} onChange={(event) => {
                        setUserAddressNumber(event.target.value); // 更新日期值
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="" placeholder="1234 Main St" value={userAddressStreet} onChange={(event) => {
                        setUserAddressStreet(event.target.value); // 更新日期值
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="" placeholder="City" value={userAddressCity} onChange={(event) => {
                        setUserAddressCity(event.target.value); // 更新日期值
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Postcode</Form.Label>
                    <Form.Control type="" placeholder="ZIP" value={userAddressPostcode} onChange={(event) => {
                        setUserAddressPostcode(event.target.value);
                    }} />
                </Form.Group>

                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <Button type="submit" style={{ marginRight: "20px" }} onClick={(event) => changeUserInfo(event)}>Save</Button>
                    <Button type="submit" style={{ marginLeft: "20px" }} onClick={() => {
                        setUserDetail({})
                        history("/home")
                        addToast('Log out successfully!');
                    }}>Log Out</Button>
                </div>
            </Form>

            <hr></hr>
            <h3>Reset password</h3>
            <Form>
                <Form.Group>
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control type="password" onChange={(event) => {
                        setUserOldPassword(event.target.value);
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" onChange={(event) => {
                        setUserNewPassword(event.target.value);
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Double Check Password</Form.Label>
                    <Form.Control type="password" onChange={(event) => {
                        setUserCheckNewPassword(event.target.value);
                    }} />
                </Form.Group>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Button type="submit" onClick={(event) => changePassword(event)} style={{ marginTop: "1vh" }}>Change Password</Button>
            
                </div>
                
            </Form>





            {/* <Container className="user-detail-container"> */}
            {/* <Row> */}
            {/* Basic Information */}
            {/* <Col md={12}> */}
            {/* Basic Information */}
            {/* <Card className="mb-4">
                        <Card.Header>Basic information</Card.Header>
                        <Card.Body className="avatar-container">
                            <Form>
                                <Form.Group className="avatar-right-top">
                                    <Form.Label>User Avatar</Form.Label>
                                    <div className="mb-3">
                                        <img
                                            src={userAvatar || user}
                                            alt="profile"
                                            className="profile-image"
                                            onClick={() => document.getElementById("avatarInput").click()}
                                        />
                                        <input
                                            type="file"
                                            id="avatarInput"
                                            style={{ display: "none" }}
                                            onChange={handleFileSelect}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>DOB</Form.Label>
                                    <Form.Control type="date" value={userDOB} onChange={(event) => {
                                        setUserDOB(event.target.value); // 更新日期值
                                    }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="name" value={userLastName} onChange={(event) => {
                                        setUserLastName(event.target.value);
                                    }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="name" value={userFirstName} onChange={(event) => {
                                        setUserFirstName(event.target.value); // 更新日期值
                                    }} />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card> */}

            {/* Contact Information */}
            {/* <Card className="mb-4">
                        <Card.Header>Contact</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="example@example.com" value={userEmail} onChange={(event) => {
                                        setUserEmail(event.target.value); // 更新日期值
                                    }} />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card> */}

            {/* Address */}
            {/* <Card className="mb-4">
                        <Card.Header>Address</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Street Number</Form.Label>
                                    <Form.Control type="" placeholder="Main St" value={userAddressNumber} onChange={(event) => {
                                        setUserAddressNumber(event.target.value); // 更新日期值
                                    }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Street</Form.Label>
                                    <Form.Control type="" placeholder="1234 Main St" value={userAddressStreet} onChange={(event) => {
                                        setUserAddressStreet(event.target.value); // 更新日期值
                                    }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="" placeholder="City" value={userAddressCity} onChange={(event) => {
                                        setUserAddressCity(event.target.value); // 更新日期值
                                    }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Postcode</Form.Label>
                                    <Form.Control type="" placeholder="ZIP" value={userAddressPostcode} onChange={(event) => {
                                        setUserAddressPostcode(event.target.value);
                                    }} />
                                </Form.Group>

                            </Form>
                        </Card.Body>
                    </Card> */}
            {/* <Button type="submit" onClick={(event) => changeUserInfo(event)}>Save</Button> */}
            {/* Password */}
            {/* <Card className="mb-4" style={{ marginTop: "1vh" }}>
                            <Card.Header>Password</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Current Password</Form.Label>
                                        <Form.Control type="password" onChange={(event) => {
                                            setUserOldPassword(event.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>New password</Form.Label>
                                        <Form.Control type="password" onChange={(event) => {
                                            setUserNewPassword(event.target.value);
                                        }} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>double check password</Form.Label>
                                        <Form.Control type="password" onChange={(event) => {
                                            setUserCheckNewPassword(event.target.value);
                                        }} />
                                    </Form.Group>
                                    <Button type="submit" onClick={(event) => changePassword(event)} style={{ marginTop: "1vh" }}>change password</Button>
                                </Form>
                            </Card.Body>
                        </Card> */}
            {/* <Button type="submit" onClick={() => {
                            setUserDetail({})
                            history("/home")
                            addToast('Log out successfully!');
                        }} style={{ marginTop: "1vh" }}>Log out</Button> */}
            {/* </Col>
            </Row> */}
            {/* </Container> */}
            {/* </Layout> */}
        </>
    )
}
export default UserDetail
