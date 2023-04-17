import React, {useEffect, useState} from "react";
import LayoutHeader from "./LayoutHeader.jsx";
import Player from "./Player.jsx";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./index.css"
import Search from "./Search.jsx";


function Layout(props) {
    return (
            <div>
                <Row style={{position: "fixed", width: "100%", zIndex: "10"}}>
                    <LayoutHeader/>
                </Row>

                <Row>
                    <Col className={"side_color"}></Col>
                    <Col className={"col_layout"} xs={8}>
                        <Row>
                            <Col className={"search_section"} xs={3}>
                                <Search/>
                            </Col>
                            <Col className={"search_section"}>
                                <Row></Row>
                                <Row>
                                    {props.children}
                                </Row>
                            </Col>

                        </Row>

                    </Col>
                    <Col className={"side_color"}></Col>

                </Row>

                <Row>
                    <Player/>
                </Row>
            </div>
    )
}

export default Layout;