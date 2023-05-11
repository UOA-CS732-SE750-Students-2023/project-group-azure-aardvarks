import React, { useContext, useEffect, useState} from "react";
import Layout from "../Layout/Layout.jsx";
import ActionSlide from "./ActionSlide.jsx";
import {useToast} from "../../utils/AppContextProvider.jsx";
import PlaylistCover from "../Playlist/PlaylistCover.jsx";
import "./index.css"
import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";
import PlayerContext from "../../utils/AppContextProvider.jsx";




const Home = () => {
    const [playList, setPlayList] = useState({});

    useEffect(() => {
        const getPlayList = async () => {
            try {
                const playListDetail = await axios.get(`${BACKEND_API}/api/playList/random/4`);
                if (playListDetail.data.status === 1) {
                    setPlayList(playListDetail.data.data);
                }
            } catch (e) {
                console.log(e);
            }
        };
        getPlayList();
    }, []);

    return (
        <>
            <Layout>
                <h2>Explore</h2>

                <hr />
                <div className={"container-home"}>
                    <div className={"container-content-actionSlide"}>
                        <ActionSlide />
                    </div>
                    <br />
                    <h2>Recommendation</h2>
                    <hr />
                    <div className={"container-content-recommendation"}>
                        {Object.values(playList).map((playlist) => (
                            <PlaylistCover key={playlist._id} playList={playlist} showMiniInfo={true}fixMiniInfo={true} />
                            // <AlbumCover key={playlist._id} playList={playlist}/>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
};
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
