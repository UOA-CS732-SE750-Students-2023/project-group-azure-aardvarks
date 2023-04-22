import Layout from "../Layout/Layout.jsx";
import {Link, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";
import PlayerContext, {useToast} from "../../utils/AppContextProvider.jsx";
import {Col, Row, ListGroup} from "react-bootstrap";
import "./index.css"
import {map} from "react-bootstrap/ElementChildren";

export default function AlbumContent(){
    const {setShowPlayer} = useContext(PlayerContext)
    const { addToast } = useToast();
    const location = useLocation();

    const [album, setAlbum] = useState();
    const [song, setSong] = useState();
    const [load, setLoad] = useState(false);


    useEffect(() => {
        const extractedSearchTerm = extractSearchTermFromUrl(location);
        console.log(extractedSearchTerm)
        setShowPlayer(true);
        const getResult = async () => {
            setLoad(true)
            try {
                await axios.get(`${BACKEND_API}/api/album/${extractedSearchTerm}`).then(response => {
                    setAlbum(response.data.data.album);
                    setSong(response.data.data.songs);
                    console.log(response.data.data)
                });

            } catch (error) {
                console.log(error);
                addToast("search album error! Please contact us! We will fix it ASAP!")
            }
            setLoad(false)
        };
        getResult();

    }, [location]);
    return(
        <Layout>
            {load?<p>loading...</p>:
                <div>
                    <Row>
                        <img className="imgSize" src={album.picUrl} alt="My Image" />
                        <Col>
                            <Row><h1>{album.name}</h1></Row>
                            <Row className="mt-4"><p>singer: {album.artist.name}</p></Row>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <ListGroup>
                            {song.map((s) => <ListGroup.Item>{s.name}</ListGroup.Item>)}

                        </ListGroup>

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
