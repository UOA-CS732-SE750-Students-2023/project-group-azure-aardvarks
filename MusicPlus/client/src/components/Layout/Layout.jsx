import React, {useEffect, useState} from "react";
import LayoutHeader from "./LayoutHeader.jsx";
import Player from "./Player.jsx";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./index.css"


function Layout(props) {
    return (
            <div>
                <Row>
                    <LayoutHeader/>
                </Row>

                <Row>
                    <Col className={"side_color"}></Col>
                    <Col className={"col_layout"} xs={8}>
                        <Row>
                            <Col className={"search_section"} xs={3}></Col>
                            <Col>
                                {props.children}
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