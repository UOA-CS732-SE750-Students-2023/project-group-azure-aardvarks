import React from "react";
import Layout from "../Layout/Layout";
import UserDetail from "../LoginPage/UserDetail";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AllPlayList from "../Playlist/AllPlayList";


function Profile() {
    return (<Layout>
        <h1>Profile</h1>
            <Tabs
                defaultActiveKey="MyPlayList"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
            <Tab eventKey="MyPlayList" title="MyPlayList">
                <AllPlayList/>
            </Tab>
            <Tab eventKey="profile" title="Profile">
            <UserDetail/>
            </Tab>
        </Tabs>



    </Layout>)
}

export default Profile;