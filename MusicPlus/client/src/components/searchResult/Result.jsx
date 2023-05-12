import Layout from "../Layout/Layout.jsx";
import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";
import PlayerContext, {useToast} from "../../utils/AppContextProvider.jsx";
import {Link, useLocation, useParams} from "react-router-dom";
import {Col, ListGroup, Row} from "react-bootstrap";
import "./index.css"
import Page from "./page";
import Loading from "./Loading";
import AlbumPage from "./AlbumPage";

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
        // console.log(extractedSearchTerm)
        const searchParams = new URLSearchParams(location.search);
        const keyword = searchParams.get('keyword');

        setSearchTerm(keyword);
        setShowPlayer(true);

        const getResult = async () => {
            try {
                setIsLoading(true);
                // await axios.get(`${BACKEND_API}/api/search/search/${encodeURIComponent(extractedSearchTerm)}/${0}/${100}`).then(response => {
                //     setResult(response.data.data.song)
                //     setSinger(response.data.data.singer)
                //     setAlbum(response.data.data.album)
                //     // console.log(response.data.data.singer)
                //     setIsLoading(false);
                // });
                await axios.get(`${BACKEND_API}/api/search?keyword=${keyword}&pageNum=${0}&pageSize=${20}`).then(
                    (response)=>{
                        setResult(response.data.data.song)
                        setSinger(response.data.data.singer)
                        setAlbum(response.data.data.album)
                        console.log(response.data.data)
                        setIsLoading(false);
                    }
                )
                // console.log(result)
                // setIsLoading(false);
            } catch (error) {
                console.log(error);
                addToast("search music error! Please contact us! We will fix it ASAP!")
            }
        };
        getResult()

    }, [location]);


    return (
        <Layout>
            <Row><h1>SEARCHING: {new URLSearchParams(location.search).get('keyword')}</h1></Row>
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
                {isLoading?
                    (<Loading></Loading>) :
                    (<Page data={result} category="song"></Page>)
                }

            </div>

            <div style={{display: singerSearch?"block":"none"}}>
                {isLoading?
                    (<Loading></Loading>) :
                    (<Page data={singer} category="singer"></Page>)
                }
            </div>

            <div style={{display: albumSearch?"block":"none"}}>
                {isLoading?
                    (<Loading></Loading>) :
                    (<AlbumPage data={album} category="album"></AlbumPage>)
                }
            </div>



        </Layout>

    );
}

function extractSearchTermFromUrl(location) {
    const hash = location.pathname;
    return decodeURIComponent(hash.split('/').pop());
}
