import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Card} from "react-bootstrap";
import CardTest from '../../../public/download.jpg'
import {UserContext} from "../../utils/AppContextProvider.jsx";
import {useContext} from "react";
import Form from "react-bootstrap/Form";
import {FaLock, FaUserCircle} from "react-icons/fa";
import Button from "react-bootstrap/Button";


function LayoutHeader() {
    const {userDetail, setUserDetail} = useContext(UserContext)
    function handleSelect(selectedKey) {
        if (selectedKey === "1"){
            setUserDetail({})
        }
        console.log('You selected key: ', selectedKey);

    }
    console.log(userDetail)
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="./#/home">Music Plus</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="./#/home">Home</Nav.Link>
                        <Nav.Link href="#pricing">充钱</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Nav>
                        {userDetail._id === undefined ? (
                            <NavDropdown title={"Login"} >
                                <NavDropdown.Item href="./#/login">Exist an account</NavDropdown.Item>
                                <NavDropdown.Item href="./#/register">Register an account</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <NavDropdown title={userDetail.username} onSelect={handleSelect}>
                                <NavDropdown.Item href="./#/user/detail">User Detail</NavDropdown.Item>
                                <NavDropdown.Item eventKey="1">Log out</NavDropdown.Item>
                            </NavDropdown>
                        )}

                    </Nav>
                </Navbar.Collapse>
                {userDetail._id !== undefined ? (
                <Card style={{ width: '35px' }}>
                    <Card.Img variant="top" src={userDetail.avatar} alt={"img not found"}/>
                </Card>
                    ) : (
                    <Card style={{ display: "none" }}>
                        <Card.Img variant="top" src={CardTest} alt={"img not found"}/>
                    </Card>
                ) }
            </Container>
        </Navbar>
    );
}

export default LayoutHeader;
