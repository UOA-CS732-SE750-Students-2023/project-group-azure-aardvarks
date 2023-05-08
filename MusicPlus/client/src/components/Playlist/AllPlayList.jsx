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
function AllPlayList({type="all", id="64366fc18a753d1f42b35d3b"}){
    const [playList, setPlayList] = useState([])
    const {userDetail} = useContext(UserContext)

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
    }, [userDetail._id])
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