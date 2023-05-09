import Layout from "../Layout/Layout.jsx";
import {useLocation} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";
import PlayerContext, {useToast} from "../../utils/AppContextProvider.jsx";
import {Col, Row, ListGroup} from "react-bootstrap";
import "./index.css"
import Loading from "../searchResult/Loading.jsx";
import Page from "../searchResult/page.jsx";
import AlbumPage from "../searchResult/AlbumPage";


export default function SingerContent(){
    const {setShowPlayer} = useContext(PlayerContext)
    const { addToast } = useToast();
    const location = useLocation();

    const [singer, setSinger] = useState(null);
    const [song, setSong] = useState(null);
    const [album, setAlbum] = useState(null);
    const [load, setLoad] = useState(false);
    const [albumLoad, setAlbumLoad] = useState(false);
    const [songLoad, setSongLoad] = useState(false);


    const [showSong,setShowSong] = useState(true)
    const [showAlbum,setShowAlbum] = useState(false)


    const showSongButton = ()=>{
        setShowSong(true);
        setShowAlbum(false);
    }
    const showAlbumButton = ()=>{
        setShowSong(false);
        setShowAlbum(true);
    }


    useEffect(() => {
        const extractedSearchTerm = extractSearchTermFromUrl(location);
        console.log(extractedSearchTerm)
        setShowPlayer(true);
        const getResult = async () => {
            try {
                setLoad(true)
                await axios.get(`${BACKEND_API}/api/singer/detail/${extractedSearchTerm}`).then(response => {
                    setSinger(response.data.data)
                    setLoad(false)
                });

            } catch (error) {
                console.log(error);
                addToast("search singer information error! Please contact us! We will fix it ASAP!")
            }
        };
        const getAlbum = async () => {
            setAlbumLoad(true)
            try {
                await axios.get(`${BACKEND_API}/api/singer/album/${extractedSearchTerm}/0/100`).then(response => {
                    setAlbum(response.data.data)
                    setAlbumLoad(false)
                });

            } catch (error) {
                console.log(error);
                addToast("search album error! Please contact us! We will fix it ASAP!")
            }
        };
        const getSong = async () => {
            setSongLoad(true)
            try {
                await axios.get(`${BACKEND_API}/api/singer/songs/${extractedSearchTerm}/0/100`).then(response => {
                    setSong(response.data.data)
                    // console.log(response.data.data)
                    setSongLoad(false)
                });

            } catch (error) {
                console.log(error);
                addToast("search song error! Please contact us! We will fix it ASAP!")
            }
        };
        getSong()
        getAlbum()
        getResult();
    }, [location]);


    return(
        <Layout>
            {load?<p>loading...</p>:
                <div>
                    <Row>
                        <img className="imgSize" src={singer?singer.image:"a"} alt="My Image" />
                        <Col>
                            <Row><h1>{singer?singer.name:"a"}</h1></Row>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col><button className="button" onClick={showSongButton}>song</button></Col>
                        <Col><button className="button" onClick={showAlbumButton}>Album</button></Col>
                    </Row>
                </div>
            }
            <Row style={{display:showAlbum?"block":"none"}} className="mt-4">
                {albumLoad?
                    (<Loading></Loading>) :
                    (<AlbumPage data={album?album:setAlbumLoad(true)} category="album"></AlbumPage>)
                }
            </Row>

            <Row style={{display:showSong?"block":"none"}} className="mt-4">
                {songLoad?
                    (<Loading></Loading>) :
                    (<Page data={song?song:setSongLoad(true)} category="song"></Page>)
                }
            </Row>

        </Layout>
    )
}


function extractSearchTermFromUrl(location) {
    const hash = location.pathname;
    return decodeURIComponent(hash.split('/').pop());
}
