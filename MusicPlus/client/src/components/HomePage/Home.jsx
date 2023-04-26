import React, {createContext, useContext, useEffect, useState} from "react";
import Layout from "../Layout/Layout.jsx";
import Carousel from "react-bootstrap/Carousel";
import downloadImage from "../../../public/download.jpg";
import code_structure from "../../../public/code_structure.png";
import ActionSlide from "./ActionSlide.jsx";
import {useToast} from "../../utils/AppContextProvider.jsx";
import PlaylistCover from "../Playlist/PlaylistCover.jsx";
import "./index.css"
import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";
import {AlbumCover} from "../Album/AlbumCover.jsx";
import PlayerContext from "../../utils/AppContextProvider.jsx";



class Home extends React.Component{
    state = {
        playList:{}
    }

    // has to use an async method once Mounting a component
    async componentDidMount() {
        try{
            const getPlayList = async () => {
                const playListDetail = await axios.get(`${BACKEND_API}/api/playList/random/4`)
                if (playListDetail.data.status === 1){
                    this.setState({playList:playListDetail.data.data})
                }
            }
            await getPlayList()
        }catch (e) {
            console.log(e);

        }



    }

    componentWillUnmount() {
        this.setState({playList:{}})
    }

    render() {
        return (
            <>
                <Layout>
                    <h2>Explore</h2>
                    <hr/>
                    <div className={"container-home"}>
                        <div className={"container-content-actionSlide"}>
                            <ActionSlide/>
                        </div>
                        <br/>
                        <h2>Recommendation</h2>
                        <hr/>
                        <div className={"container-content-recommendation"}>
                            {Object.values(this.state.playList).map((playlist) => (
                                <PlaylistCover key={playlist._id} playList={playlist} showMiniInfo={true}/>
                                // <AlbumCover key={playlist._id} playList={playlist}/>
                            ))}
                        </div>
                    </div>
                </Layout>
            </>
        )
    }
}
function HomeWithPlayerContext() {
    const { setShowPlayer } = useContext(PlayerContext);
    const { addToast } = useToast();
    useEffect(() => {
        setShowPlayer(true);
        return () => {
            setShowPlayer(false);
        };
    }, [setShowPlayer]);
    try{
        return <Home />;
    }catch (e) {
        addToast("Something wrong! We will fix it ASAP!")
    }

}

export default HomeWithPlayerContext;
//export default Home;
