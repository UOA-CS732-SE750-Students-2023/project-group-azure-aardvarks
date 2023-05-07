import React, {useEffect, useState} from "react";
import LayoutHeader from "./LayoutHeader.jsx";
import Player from "./Player.jsx";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./index.css"
import Search from "./Search.jsx";
import Darkmode from 'darkmode-js';
import DarkTheme from "../../assets/react.svg"


class Layout extends React.Component{
    render() {
        const options = {
            bottom: '20%', // default: '32px'
            right: 'unset', // default: '32px'
            left: '5%', // default: 'unset'
            time: '0.5s', // default: '0.3s'
            mixColor: '#fff', // default: '#fff'
            backgroundColor: '#fff',  // default: '#fff'
            buttonColorDark: '#100f2c',  // default: '#100f2c'
            buttonColorLight: '#fff', // default: '#fff'
            saveInCookies: true, // default: true,
            label: '🌓', // default: ''
            autoMatchOsTheme: true // default: true
        }

        const darkmode = new Darkmode(options);
        darkmode.showWidget();
        const div = <>
            <div className="layout-container">
                <Row style={{width: "100%", zIndex: "10"}}>
                    <LayoutHeader/>
                </Row>
                <div className="content-container">
                    <Row >
                        <Col className={"side_color"}></Col>
                        <Col className={"col_layout"} xs={8}>
                            <Row>
                                <Col className={"search_section"} xs={3}>
                                    <Search/>
                                </Col>
                                <Col className={"search_section"}>
                                    <Row></Row>
                                    <Row className={"content"}>
                                        {this.props.children}
                                    </Row>
                                </Col>

                            </Row>

                        </Col>
                        <Col className={"side_color"}></Col>

                    </Row>
                </div>


            </div>
        </>;
        return div
    }
}

export default Layout;
