import React, {useContext} from "react";
import { useState } from "react";
import {BACKEND_API} from "../../utils/env.js";
import axios from "axios";
import PlaylistCover from "./PlaylistCover.jsx";
import {UserContext} from "../../utils/AppContextProvider.jsx";

function AllPlayList(){
    const [playList, setPlayList] = useState([])
    const {userDetail} = useContext(UserContext)
    const getPlayList = async () => {
        const playListDetail = await axios.get(`${BACKEND_API}/api/playList/searchPlayListByOwnerId/${userDetail._id}`)
        if (playListDetail.data.status === 1){

            setPlayList(playListDetail.data.data)
        }
    }
    getPlayList()
    return (
        <div className={"container-content-recommendation"}>
            {(playList).map((playlist) => (
                <PlaylistCover key={playlist._id} playList={playlist} showMiniInfo={true}/>
                // <AlbumCover key={playlist._id} playList={playlist}/>
            ))}
        </div>
    )
}

export default AllPlayList;