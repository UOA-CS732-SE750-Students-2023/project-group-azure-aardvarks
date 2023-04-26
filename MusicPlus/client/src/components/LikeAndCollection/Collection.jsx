import React, { useState } from "react";
import Layout from "../Layout/Layout.jsx";
import { Container, Row, Col, Image, Button, Table, Alert, Modal, Form } from "react-bootstrap";
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import "./index.css"


function Collection() {
    const [originalName, setoriginalName] = useState('');
    const [newName, setNewName] = useState('Collection');
    const [showModal_1, setShowModal_1] = useState(false);

    const handleCloseModal_1 = () => {
        setShowModal_1(false);
    };

    const handleCloseModal_cancel = () => {
        setNewName(originalName);
        setShowModal_1(false);
    };


    const handleShowModal = () => {
        setoriginalName(newName)
        setShowModal_1(true);
    }

    const handleChangeName = () => {

        console.log(`New name: ${newName}`);
        handleCloseModal_1();
    }


    const [showModal, setShowModal] = useState(false);
    const [showShareOptions, setShowShareOptions] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
        setShowShareOptions(false);
    };

    const handleShowShareOptions = () => {
        setShowShareOptions(true);
        setShowModal(true);
    }




    const [songList, setSongList] = useState([
        {
            id: 1,
            name: "Dancing in the Moonlight",
            artist: "Toploader",
            album: "Onka's Big Moka",
            duration: "3:53",
        },
        {
            id: 2,
            name: "没有",
            artist: "没有",
            album: "无",
            duration: "6:19",
        },
        {
            id: 3,
            name: "Yellow",
            artist: "Coldplay",
            album: "Parachutes",
            duration: "4:29",
        },


    ]);

    return (
        <>
            <Layout>
                <Container>
                    <Row>
                        <Col xs={12} md={5} className="text-center">
                            <Image src="public\default_photo.png" alt="Image" fluid className="like-image" style={{ height: "150px" }} />
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="d-flex flex-column justify-content-center align-items-center h-100">
                                <h2 className="text-center">{newName}</h2>
                                <div className="mt-4 d-flex justify-content-between">
                                    <Button className="button"style={{width: "200px"}}>PLAY</Button>
                                    <Button className="button" onClick={handleShowShareOptions}style={{width: "200px"}}>Share</Button>
                                    <Modal show={showModal} onHide={handleCloseModal}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>{showShareOptions ? 'Share on' : 'Change Name'}</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <Button className="button" onClick={() => { window.open('https://www.facebook.com/'); }}>
                                                <FaFacebook />
                                                &nbsp;Share on Facebook
                                            </Button>
                                            <Button className="button" onClick={() => { window.open('https://www.instagram.com/'); }}>
                                                <FaInstagram />
                                                &nbsp;Share on Instagram
                                            </Button>
                                        </Modal.Body>

                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>

                                        </Modal.Footer>
                                    </Modal>
                                    <Button className="button" onClick={handleShowModal}style={{width: "200px"}}>Change Name</Button>
                                    <Modal show={showModal_1} onHide={handleCloseModal_1}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Change Name</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form.Control type="text" placeholder="Enter new name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseModal_cancel}>Cancel</Button>
                                            <Button variant="primary" onClick={handleChangeName}>Save changes</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <hr className="mt-3" />
                <Row className="bg-light" style={{ marginLeft: "4px" }}>
                    <Col xs={6} md={5} className="d-flex justify-content-center align-items-center">
                        <h5>Song name</h5>
                    </Col>
                    <Col xs={6} md={2} className="d-flex justify-content-center align-items-center">
                        <h5>Singer</h5>
                    </Col>
                    <Col xs={6} md={3} className="d-flex justify-content-center align-items-center">
                        <h5>Album</h5>
                    </Col>
                    <Col xs={6} md={2} className="d-flex justify-content-center align-items-center">
                        <h5>Time</h5>
                    </Col>
                </Row>

                <Container className="py-4">
                    {songList.length > 0 ? (
                        <Table striped bordered hover responsive>
                            <tbody>
                                {songList.map((song) => (
                                    <tr key={song.id}>
                                        <td><Button variant="link">{song.name}</Button></td>
                                        <td><Button variant="link">{song.artist}</Button></td>
                                        <td><Button variant="link">{song.album}</Button></td>
                                        <td>{song.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <Alert variant="info">No favorite songs yet.</Alert>
                    )}
                </Container>




            </Layout>
        </>
    );
}

export default Collection;