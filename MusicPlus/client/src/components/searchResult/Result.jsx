import Layout from "../Layout/Layout.jsx";
import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";
import PlayerContext, {useToast} from "../../utils/AppContextProvider.jsx";
import {Link, useLocation} from "react-router-dom";
import {Col, ListGroup, Row} from "react-bootstrap";
import "./index.css"
import Page from "./page";

export default function Result() {
    const {setShowPlayer} = useContext(PlayerContext)
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    const [songSearch, setSongSearch] = useState(true);
    const [singerSearch, setSingerSearch] = useState(false);
    const [albumSearch, setAlbumSearch] = useState(false);

    const [result, setResult] = useState(null)
    const [singer, setSinger] = useState(null)
    const [album, setAlbum] = useState(null)

    function clickSong(){
        setSongSearch(true)
        setSingerSearch(false)
        setAlbumSearch(false)
    }

    function clickSinger(){
        setSongSearch(false)
        setSingerSearch(true)
        setAlbumSearch(false)
    }

    function clickAlbum(){
        setSongSearch(false)
        setSingerSearch(false)
        setAlbumSearch(true)
    }


    const { addToast } = useToast();
    const location = useLocation();

    useEffect(() => {
        const extractedSearchTerm = extractSearchTermFromUrl(location);
        setSearchTerm(extractedSearchTerm);
        setShowPlayer(true);

        const getResult = async () => {
            try {
                await axios.get(`${BACKEND_API}/api/search/search/${extractedSearchTerm}/${0}/${100}`).then(response => {
                    setResult(response.data.data.song)
                    setSinger(response.data.data.singer)
                    setAlbum(response.data.data.album)
                    console.log(response.data.data)
                    setIsLoading(false);
                });
            } catch (error) {
                console.log(error);
                addToast("search music error! Please contect us! We will fix it ASAP!")
            }
        };
        getResult()

    }, [location]);


    return (
        <Layout>
            <Row className="mb-4">
                <Col>
                    <div className="wrap mt-4">
                        <button className="button_search" onClick={()=>clickSong()}>song</button>
                    </div>
                </Col>
                <Col>
                    <div className="wrap mt-4">
                        <button className="button_search" onClick={()=>clickSinger()}>singer</button>
                    </div>
                </Col>
                <Col>
                    <div className="wrap mt-4">
                        <button className="button_search" onClick={()=>clickAlbum()}>album</button>
                    </div>
                </Col>
            </Row>

            <div style={{display: songSearch?"block":"none"}}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ListGroup>
                    {result.map((song) =>
                        <ListGroup.Item key={song.id}> {song.name} </ListGroup.Item>
                    )}
                </ListGroup>
                )}
            </div>

            <div style={{display: singerSearch?"block":"none"}}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ListGroup>
                        {singer.map((s) =>
                            <ListGroup.Item key={s.id}> {s.name} </ListGroup.Item>
                        )}
                    </ListGroup>
                )}
            </div>

            <div style={{display: albumSearch?"block":"none"}}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ListGroup>
                        {album.map((a) =>
                            <ListGroup.Item key={a.id}> {a.name} </ListGroup.Item>
                        )}
                    </ListGroup>
                )}
            </div>

            {isLoading?(<p>Loading...</p>):
                (<Page data={result}></Page>)}

        </Layout>

    );
}

function extractSearchTermFromUrl(location) {
    const hash = location.pathname;
    return decodeURIComponent(hash.split('/').pop());
}
