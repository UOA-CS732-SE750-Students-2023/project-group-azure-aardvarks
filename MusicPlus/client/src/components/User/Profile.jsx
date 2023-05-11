import React, {useContext} from "react";
import Layout from "../Layout/Layout";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AllPlayList from "../Playlist/AllPlayList";
import {UserContext} from "../../utils/AppContextProvider.jsx";
import UserDetail from "../LoginPage/UserDetail.jsx";


function Profile() {
    const { userDetail } = useContext(UserContext)
    return (<Layout>
        <h1>Profile</h1>
            <Tabs
                defaultActiveKey="MyPlayList"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
            <Tab eventKey="MyPlayList" title="MyPlayList">
                <AllPlayList id={userDetail._id} type={"all"}/>
            </Tab>
            <Tab eventKey="profile" title="Profile">
            <UserDetail/>
            </Tab>
        </Tabs>
    </Layout>)
}

export default Profile;