import React from "react";
import Layout from "../Layout/Layout";
import UserDetail from "../LoginPage/UserDetail";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AllPlayList from "../Playlist/AllPlayList";
import back from '../../../public/back.jpg';
import { Image,Container,Col,Row } from "react-bootstrap";


function Profile() {
    return (<Layout >
        {/* <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image src="back.jpg" />
        </Col>
        <Col xs={6} md={4}>
          <Image src="holder.js/171x180" roundedCircle />
        </Col>
        <Col xs={6} md={4}>
          <Image src="holder.js/171x180" thumbnail />
        </Col>
      </Row>
    </Container> */}
        {/* <img src={back} alt="Image description" /> */}
        {/* <Image src={back} fluid />
        <div style={{ backgroundImage: `url(${back})`, backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat' }}>
    </div> */}
        <h1>Profile</h1>
        
            <Tabs
                defaultActiveKey="MyPlayList"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                
            <Tab eventKey="MyPlayList" title="MyPlayList">
                <AllPlayList/>
            </Tab>
            <Tab eventKey="Setting" title="Setting">
            <UserDetail/>
            </Tab>
        </Tabs>
        



    </Layout>)
}

export default Profile;