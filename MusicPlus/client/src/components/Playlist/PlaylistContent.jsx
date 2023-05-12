import React, {useContext, useEffect, useState} from "react";
import {useToast} from "../../utils/AppContextProvider.jsx";
import './index.css'
import {UserContext} from "../../utils/AppContextProvider.jsx";
import SongList from "../SongList.jsx";
import Layout from "../Layout/Layout.jsx";
import {useNavigate, useParams} from "react-router-dom";

import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";
import {Modal, Spinner} from "react-bootstrap";
import PlayerContext from "../../utils/AppContextProvider.jsx";
import PlaylistCover from "./PlaylistCover.jsx";



function PlaylistContent(props) {
    const {userDetail, setUserDetail, userPlaylist} = useContext(UserContext)
    const {addToast} = useToast();
    const {id} = useParams();

    const [playList, setPlayList] = useState({});
    const [loading, setLoading] = useState(true);
    const {setShowPlayer} = useContext(PlayerContext);
    const [songList, setSongList] = useState([]);
    const [loadingSong, setLoadingSong] = useState(true);
    // const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(  () => {
        if(props.link !== "/style/preference"){
            const url = window.location.href
            const parts = url.split('/');
            const lastPart = parts.pop();
            const fetchData = async () =>{
                const res = await axios.get(`${BACKEND_API}/api/playList/searchPlayListByOwnerId/${lastPart}`).catch(
                    (e)=>{
                        console.log(e)
                        navigate('/home')
                    }
                )

            }
            fetchData()
        }

        // check current playlist is yours or other users'
        // setIsCurrentUser(userPlaylist.find(u => u._id === lastPart) !== undefined);
    },[])

    useEffect(() => {
        setShowPlayer(true);
        return () => {
            setShowPlayer(false);
        };

    }, [setShowPlayer]);

    const getPlayList = async () => {
        try {
            let response
            if (props.link === "/playList/searchPlayListById") {
                response = await axios.get(`${BACKEND_API}/api${props.link}/${id}`);
            } else if (props.link === "/style/preference") {
                if (userDetail) {
                    response = await axios.get(`${BACKEND_API}/api${props.link}`, {
                        headers: {
                            'Content-Type': 'application/json', // 设置请求头，指定数据类型为JSON
                            'Authorization': 'Basic ' + btoa(`${userDetail.username}:${userDetail.password}`)
                        }
                    })
                }

            }
            setPlayList(response.data.data);
            console.log(playList)
            setLoading(false)
        } catch (error) {
            console.log(error);
            addToast("Something wrong! We will fix it ASAP!")
        }
    };

    const getSongList = async () => {
        if (playList.songs) {
            // if (playList.songs.length !== 0){
                const promises = playList.songs.map(async (songId) => {

                    try {

                        const response = await axios.get(`${BACKEND_API}/api/music/detail/${songId}`);
                        const result = {
                            "_id": songId,
                            "name": response.data.data.name,
                            "singer": response.data.data.singer,
                            "album": response.data.data.album,
                            "style": response.data.data.style
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
                // }else {
                // setLoadingSong(false);
            // }
            }





    };

    useEffect(() => {
        setPlayList({})
        setLoading(true);
        setLoadingSong(true)
        getPlayList();

    }, [id, userDetail, userPlaylist]);

    useEffect(() => {
        getSongList();
    }, [loading])

    return (
        <Layout>
            {loading ? (
                <Spinner animation="grow"/>
            ) : (
                <>
                    <div className={"playlist-body-cover"}>
                        <PlaylistCover playList={playList} width={250} height={250}/>
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
                            {/*{isCurrentUser === true ? (*/}
                            {/*    <div>*/}
                            {/*        <Button onClick={()=>setIsEditMode(true)}>EDIT</Button>*/}
                            {/*    </div>*/}
                            {/*) : (<></>)}*/}
                        </div>
                    </div>

                    <hr/>
                </>
            )}
            {loadingSong ? (
                <Spinner animation="grow"/>
            ) : (
                playList.songs && playList.songs.length === 0 && props.link === "/style/preference" ? (
                    "There are no songs to recommend at the moment, listen to a few songs and come back to try again!"
                ) : (
                    <SongList songList={songList}/>
                )
            )}
            {/*<PlaylistTe show={isEditMode}*/}
            {/*            onClose={()=>setIsEditMode(false)}*/}
            {/*/>*/}

        </Layout>
    );
}

export default PlaylistContent;
