import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../utils/AppContextProvider.jsx";
import defaultImg from "../../../public/default_photo.png";
import {Button, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";

/**
 *  required "type", type="new" or type="edit"
 *  not required "cover","private", "name", "description"
 *  eg: <PlaylistTemplate type="new" cover="xxxx" private="public" name="xxx" description="xxx">
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
function PlaylistTemplate(props){
    const [cover, setCover] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const {userDetail, newUserPlaylist,updateUserPlaylist} = useContext(UserContext)



    function handleFileSelect(e) {
        const file = e.target.files[0];
        const maxFileSize = 5 * 1024 * 1024; // 5MB

        if (file.size > maxFileSize) {
            alert('The image size exceeds the 5MB limit.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {

            setCover(e.target.result);
        };
        reader.readAsDataURL(file);
    }


    const handleNewPlaylist = async (cover) =>{
        const playlist = {
            name:name===''?"Unnamed":name,
            private:isPrivate,
            description:description,
            cover:cover
        }
        await newUserPlaylist(playlist)
        setCover(defaultImg)
        props.onClose();
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={"static"}
            animation={true}
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    {/*Add a playlist*/}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div
                    style={{
                        display:"flex",
                        flexDirection:"row",
                        padding: 50
                    }}>
                    <img
                        alt={"img not found"}
                        src={cover===''?defaultImg:cover}
                        width={300}
                        height={300}
                        style={{
                            boxShadow: "6px 3px 15px #b9b5b5",
                            borderRadius: 30
                        }}
                        onClick={() => document.getElementById("playlistCover").click()}
                    />
                    <input
                        type="file"
                        id="playlistCover"
                        style={{ display: "none" }}
                        onChange={handleFileSelect}
                    />
                    <div style={{alignSelf:"center", padding:50}}>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control
                                    placeholder={props.name !== undefined?props.name:"Name"}
                                    size={"lg"}
                                    style={{border:"white"}}
                                    value={name}
                                    onChange={
                                        (e)=>{setName(e.target.value)}
                                    }
                                />
                            </Form.Group>
                            <hr/>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                                <Form.Control
                                    as="textarea"
                                    placeholder={props.description !== undefined?props.description:"New description"}
                                    style={{border:"white"}}
                                    value={description}
                                    onChange={
                                        (e)=>{setDescription(e.target.value)}
                                    }
                                />
                            </Form.Group>
                            <Form.Check
                                type="switch"
                                label={"private"}
                                onClick={()=>{setIsPrivate(true)}}
                            />
                        </Form>
                    </div>
                </div>
                {/*<hr/>*/}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onClose}>Cancel</Button>
                { props.type === 'new'? (<Button onClick={()=>{handleNewPlaylist(cover)}}>New</Button>):(<></>)}
            </Modal.Footer>
        </Modal>
    )
}

export default PlaylistTemplate