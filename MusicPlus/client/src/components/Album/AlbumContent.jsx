import Layout from "../Layout/Layout.jsx";
import {useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";
import PlayerContext, {useToast} from "../../utils/AppContextProvider.jsx";
import {Col, Row, ListGroup} from "react-bootstrap";
import "./index.css"
import Page from "../searchResult/page";


export default function AlbumContent(){
    const {setShowPlayer} = useContext(PlayerContext)
    const { addToast } = useToast();
    const location = useLocation();

    const [album, setAlbum] = useState(null);
    const [song, setSong] = useState(null);
    const [load, setLoad] = useState(false);


    useEffect(() => {
        const extractedSearchTerm = extractSearchTermFromUrl(location);
        console.log(extractedSearchTerm)
        setShowPlayer(true);
        const getResult = async () => {
            try {
                setLoad(true)
                await axios.get(`${BACKEND_API}/api/album/${extractedSearchTerm}`).then(response => {
                    setAlbum(response.data.data.album);
                    setSong(response.data.data.songs);
                    console.log(response.data.data.album)
                    setLoad(false)
                });

            } catch (error) {
                console.log(error);
                addToast("search album error! Please contact us! We will fix it ASAP!")
            }

        };
        getResult();

    }, [location]);

    return(
        <Layout>
            {load?<p>loading...</p>:
                <div>
                    <Row>
                        <img className="imgSize" src={album?album.picUrl:"a"} alt="My Image" />
                        <Col>
                            <Row><h1>{album?album.name:"a"}</h1></Row>
                            <Row className="mt-4"><p>singer: {album?album.artist.name:"a"}</p></Row>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        {/*<ListGroup>*/}
                        {/*    {song?song.map((s) => <ListGroup.Item key={s.id}>{s?s.name:"a"}</ListGroup.Item>):"test"}*/}
                        {/*</ListGroup>*/}
                        {song?<Page data={song} category={"song"}></Page>:"Album content song load error"}
                    </Row>
                </div>
            }

        </Layout>
    )
}


function extractSearchTermFromUrl(location) {
    const hash = location.pathname;
    return decodeURIComponent(hash.split('/').pop());
}
