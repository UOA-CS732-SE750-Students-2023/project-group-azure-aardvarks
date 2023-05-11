import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Card} from "react-bootstrap";
// import CardTest from '../../assets/download.jpg'
import CardTest from '../../assets/download.jpg'
import {UserContext} from "../../utils/AppContextProvider.jsx";
import user from "../../static/user.jpg"
import {useContext} from "react";

import {useNavigate} from "react-router-dom";


function LayoutHeader() {
    const Navigate = useNavigate();
    const {userDetail, setUserDetail} = useContext(UserContext)

    return (
        
        <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#32A67E" }}>

            <Container>
                <Navbar.Brand style={{fontSize: "1.7em" ,color: "white"}} href="./#/home">Music Plus</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <div style={{display: "flex"}}>
                    {userDetail._id === undefined ? (
                        <span style={{color:"white"}} onClick={() => Navigate("/login")}>
                    Log in
                    </span>
                    ) : (
                        <span style={{ color: "white", marginRight: "10px", fontSize: "1.6em" }} onClick={() => Navigate("/user/detail")}>
                     Welcome! {userDetail.username}
                    </span>
                    )}

                    {userDetail._id !== undefined ? (
                        <Card style={{ width: '35px', marginLeft: "0.5vh"}}>
                            {userDetail.avatar === "" || !userDetail.avatar? (
                                <Card.Img variant="top"style={{ width: "40px", height: "40px" }} src={user} alt={"img not found"}  onClick={() => Navigate("/user/detail")}/>
                            ):(
                                <Card.Img variant="top"style={{ width: "40px", height: "40px" }} src={userDetail.avatar} alt={"img not found"}  onClick={() => Navigate("/user/detail")}/>
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
