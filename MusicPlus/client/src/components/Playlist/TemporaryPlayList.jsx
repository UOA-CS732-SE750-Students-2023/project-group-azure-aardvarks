import React, {useContext, useEffect, useState} from "react";
import {NotificationContext, TemporaryPlayListContext} from "../../utils/AppContextProvider.jsx";
import {Button, Spinner, ToastContainer} from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

function TemporaryPlayList() {
    const {
        show,
        removeTemporaryPlaylist,
        addToCurrentPlaylist,
        lastUpdate,
        temporaryPlaylistDetail
    } = useContext(TemporaryPlayListContext)
    const [isLoading, setIsLoading] = useState(false);

    async function handleAddToCurrentPlaylist(){
        setIsLoading(true)
        await addToCurrentPlaylist()
        removeTemporaryPlaylist()
        setIsLoading(false)
    }

    return (
        <>
            <ToastContainer position={'top-center'}>
                <Toast
                    show={show}
                    delay={3000}
                    bg={"secondary"}
                    onClose={()=>{removeTemporaryPlaylist()}}

                >
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt=""/>
                        <strong className="me-auto">Temporary playlist</strong>
                        <small className="text-muted">Last update: {lastUpdate}</small>
                    </Toast.Header>
            {isLoading ? (
                <div>
                    <Spinner animation="grow" />
                    adding to current play list, please wait !!
                </div>
            ):(

                        <Toast.Body>
                            <p>
                            </p>
                            {temporaryPlaylistDetail}
                            <hr/>
                            <Button
                                variant={"secondary"}
                                onClick={handleAddToCurrentPlaylist}
                            >Push</Button>
                        </Toast.Body>
            )}
                </Toast>
            </ToastContainer>
        </>
    );
}
export default TemporaryPlayList