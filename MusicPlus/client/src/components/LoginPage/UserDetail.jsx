import Layout from "../Layout/Layout.jsx";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./UserDetail.css";
import {useContext, useEffect} from "react";
import PlayerContext from "../../utils/AppContextProvider.jsx";
import {useNavigate} from "react-router-dom";


function UserDetail(){
    const { setShowPlayer } = useContext(PlayerContext);
    const history = useNavigate();
    useEffect(() => {
        setShowPlayer(true);
        return () => {
            setShowPlayer(false);
        };
    }, [setShowPlayer]);
    return(
        <>
            <Layout>
                <h2>User Detail</h2>
                <Container className="user-detail-container">
                    <Row>
                        {/* Basic Information */}
                        <Col md={12}>
                            {/* Basic Information */}
                            <Card className="mb-4">
                                <Card.Header>Basic information</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>头像</Form.Label>
                                            <Form.Control type="file" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>照片</Form.Label>
                                            <Form.Control type="file" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>DOB</Form.Label>
                                            <Form.Control type="date" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Check
                                                type="radio"
                                                label="M"
                                                name="gender"
                                                id="male"
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="F"
                                                name="gender"
                                                id="female"
                                            />
                                        </Form.Group>
                                        <Button type="submit">Save</Button>
                                    </Form>
                                </Card.Body>
                            </Card>

                            {/* Contact Information */}
                            <Card className="mb-4">
                                <Card.Header>Contact</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="example@example.com" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control type="tel" placeholder="123-456-7890" />
                                        </Form.Group>
                                        <Button type="submit">Save</Button>
                                    </Form>
                                </Card.Body>
                            </Card>

                            {/* Address */}
                            <Card className="mb-4">
                                <Card.Header>Address</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Street</Form.Label>
                                            <Form.Control type="text" placeholder="1234 Main St" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="text" placeholder="City" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Postcode</Form.Label>
                                            <Form.Control type="text" placeholder="ZIP" />
                                        </Form.Group>
                                        <Button type="submit">Save</Button>
                                    </Form>
                                </Card.Body>
                            </Card>

                            {/* Password */}
                            <Card className="mb-4">
                                <Card.Header>Password</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Current Password</Form.Label>
                                            <Form.Control type="password" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>New password</Form.Label>
                                            <Form.Control type="password" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>double check password</Form.Label>
                                            <Form.Control type="password" />
                                        </Form.Group>
                                        <Button type="submit">change password</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </>
    )
}
export default UserDetail
