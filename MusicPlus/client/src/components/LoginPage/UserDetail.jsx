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
                                <Card.Header>基础信息</Card.Header>
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
                                            <Form.Label>生日</Form.Label>
                                            <Form.Control type="date" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>性别</Form.Label>
                                            <Form.Check
                                                type="radio"
                                                label="男"
                                                name="gender"
                                                id="male"
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="女"
                                                name="gender"
                                                id="female"
                                            />
                                        </Form.Group>
                                        <Button type="submit">保存</Button>
                                    </Form>
                                </Card.Body>
                            </Card>

                            {/* Contact Information */}
                            <Card className="mb-4">
                                <Card.Header>联系方式</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>邮箱</Form.Label>
                                            <Form.Control type="email" placeholder="example@example.com" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>手机号</Form.Label>
                                            <Form.Control type="tel" placeholder="123-456-7890" />
                                        </Form.Group>
                                        <Button type="submit">保存</Button>
                                    </Form>
                                </Card.Body>
                            </Card>

                            {/* Address */}
                            <Card className="mb-4">
                                <Card.Header>地址</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>街道</Form.Label>
                                            <Form.Control type="text" placeholder="1234 Main St" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>城市</Form.Label>
                                            <Form.Control type="text" placeholder="City" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>邮政编码</Form.Label>
                                            <Form.Control type="text" placeholder="ZIP" />
                                        </Form.Group>
                                        <Button type="submit">保存</Button>
                                    </Form>
                                </Card.Body>
                            </Card>

                            {/* Password */}
                            <Card className="mb-4">
                                <Card.Header>密码</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>当前密码</Form.Label>
                                            <Form.Control type="password" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>新密码</Form.Label>
                                            <Form.Control type="password" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>确认新密码</Form.Label>
                                            <Form.Control type="password" />
                                        </Form.Group>
                                        <Button type="submit">修改密码</Button>
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