import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Card} from "react-bootstrap";
import CardTest from '../../../public/download.jpg'
import {UserContext} from "../../utils/AppContextProvider.jsx";
import user from "../../static/user.jpg"
import React, {useContext} from "react";

import {useNavigate} from "react-router-dom";


function LayoutHeader() {
    const Navigate = useNavigate();
    const {userDetail, setUserDetail} = useContext(UserContext)

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <div className="musicLogo">
                    <span className="letter-m">M</span>
                    <span className="letter-u">u</span>
                    <span className="letter-s">s</span>
                    <span className="letter-i">i</span>
                    <span className="letter-c">c</span>
                    <span className="letter-plus">+</span>
                </div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">



                </Navbar.Collapse>
                <div style={{display: "flex"}}>
                    {userDetail._id === undefined ? (
                        <span style={{color:"white"}} onClick={() => Navigate("/login")}>
                    Log in
                    </span>
                    ) : (
                        <span style={{color:"white"}} onClick={() => Navigate("/user/detail")}>
                    {userDetail.username}
                    </span>
                    )}

                    {userDetail._id !== undefined ? (
                        <Card style={{ width: '35px', marginLeft: "0.5vh"}}>
                            {userDetail.avatar === "" || !userDetail.avatar? (
                                <Card.Img variant="top" src={user} alt={"img not found"}  onClick={() => Navigate("/user/detail")}/>
                            ):(
                                <Card.Img variant="top" src={userDetail.avatar} alt={"img not found"}  onClick={() => Navigate("/user/detail")}/>
                            )}

                        </Card>
                    ) : (
                        <Card style={{ display: "none" }}>
                            <Card.Img variant="top" src={CardTest} alt={"img not found"}/>
                        </Card>
                    ) }
                </div>

            </Container>
        </Navbar>
    );
}

export default LayoutHeader;
