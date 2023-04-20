import React, {useContext, useEffect, useState} from "react";

import default_photo from '../../../public/default_photo.png'
import {useToast} from "../../utils/AppContextProvider.jsx";
import './index.css'
import {UserContext} from "../../utils/AppContextProvider.jsx";
import SongList from "../SongList.jsx";
import Layout from "../Layout/Layout.jsx";
import {useParams} from "react-router-dom";

import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";
import {Spinner} from "react-bootstrap";
import PlayerContext from "../../utils/AppContextProvider.jsx";



function PlaylistContent(props) {
    const {userDetail, setUserDetail} = useContext(UserContext)
    const { addToast } = useToast();
    const { id } = useParams();

    const [playList, setPlayList] = useState({});
    const [loading, setLoading] = useState(true);
    const { setShowPlayer } = useContext(PlayerContext);
    const [songList, setSongList] = useState([])
    const [loadingSong, setLoadingSong] = useState(true);

    useEffect(() => {
        setShowPlayer(true);
        return () => {
            setShowPlayer(false);
        };
    }, [setShowPlayer]);

    const getPlayList = async () => {

        try {
            let response
            if (props.link === "/playList/searchPlayListById"){
                response = await axios.get(`${BACKEND_API}/api${props.link}/${id}`);
            }else if(props.link === "/style/preference"){
                if (userDetail){
                    response = await axios.get(`${BACKEND_API}/api${props.link}`,{headers:{
                            'Content-Type': 'application/json', // 设置请求头，指定数据类型为JSON
                            'Authorization': 'Basic ' + btoa(`${userDetail.username}:${userDetail.password}`)
                        }})
                }

            }

            setPlayList(response.data.data);
            setLoading(false)
        } catch (error) {
            console.log(error);
            addToast("Something wrong! We will fix it ASAP!")
        }
    };

    const getSongList = async () => {
        if (playList.songs){
            const promises = playList.songs.map(async (songId) => {
                try {
                    const response = await axios.get(`${BACKEND_API}/api/music/detail/${songId}`);
                    const result = {
                        "_id":songId,
                        "name":response.data.data.name,
                        "singer":response.data.data.singer,
                        "album":response.data.data.album,
                        "style":response.data.data.style
                    }
                    return result
                } catch (err) {
                    console.log(err);
                    addToast("Something wrong! We will fix it ASAP!")
                    return null;
                }
            })
            const results = await Promise.all(promises);
            setSongList(results.filter((item) => item !== null));

            setLoadingSong(false);
        }
    };

    useEffect(() => {
        setPlayList({})
        setLoading(true);
        setLoadingSong(true)
        getPlayList();

    }, [id, userDetail]);

    useEffect(()=>{
        getSongList();
    }, [loading])

    return (
        <Layout>
            {loading ? (
                <Spinner animation="grow" />
            ) : (
                <>
                    <div className={"playlist-body-cover"}>
                        <img
                            src={default_photo}
                            width={171}
                            height={180}
                            className={"playlist-body-cover-img"}
                        />
                        <div className={"playlist-body-cover-info"}>
                            <div className={"playlist-body-cover-info-title"}>
                                {playList.name}
                            </div>
                            <div className={"playlist-body-cover-info-author"}>
                                {playList.owner.username} update at: {playList.updatedAt}
                            </div>
                            <div className={"playlist-body-cover-info-description"}>
                                {playList.description}
                            </div>
                        </div>
                    </div>
                    <hr />

                </>
            )}
            {loadingSong ? (
                <Spinner animation="grow" />
            ) : (
                playList.songs && playList.songs.length === 0 && props.link === "/style/preference" ? (
                    "There are no songs to recommend at the moment, listen to a few songs and come back to try again!"
                ) : (
                    <SongList songList={songList} />
                )
            )}
        </Layout>
    );
}

export default PlaylistContent;
