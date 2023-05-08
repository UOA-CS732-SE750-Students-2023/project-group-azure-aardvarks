import React, {useContext, useEffect} from "react";
import { useState } from "react";
import {BACKEND_API} from "../../utils/env.js";
import axios from "axios";
import PlaylistCover from "./PlaylistCover.jsx";
import {UserContext} from "../../utils/AppContextProvider.jsx";

/**
 * Eg <AllPlayList type=all id="64366fc18a753d1f42b35d3b">
 * @param type required  "public" or "private" or "all"
 * @param id required "userId"
 * @return {JSX.Element}
 * @constructor
 */
function AllPlayList({type="public", id}){
    const [playList, setPlayList] = useState([])
    const {userDetail,userPlaylist} = useContext(UserContext)

    useEffect(()=>{
        const getPlayList = async () => {
            // const playListDetail = await axios.get(`${BACKEND_API}/api/playList/searchPlayListByOwnerId/${id}`)
            const playListDetail = await axios.post(`${BACKEND_API}/api/playList/search/owner/id`,{
                id : id,
                type:type
            })
            if (playListDetail.data.status === 1){
                setPlayList(playListDetail.data.data)
            }
        }
        getPlayList();
    }, [userDetail._id,userPlaylist])
    return (
        <div className={"my-profile-playlist-cover"}>
            {(playList).map((playlist) => (
                <PlaylistCover key={playlist._id} playList={playlist} showMiniInfo={true} fixMiniInfo={true}/>
                // <AlbumCover key={playlist._id} playList={playlist}/>
            ))}
        </div>
    )
}

export default AllPlayList;