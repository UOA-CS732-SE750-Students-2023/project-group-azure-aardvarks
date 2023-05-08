import React, {useContext, useEffect, useState} from "react";
import {Button, ButtonGroup, DropdownButton, Modal} from "react-bootstrap";
import {NotificationContext, UserContext} from "../../utils/AppContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import './index.css'
import {Accordion} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import defaultImg from '../../../public/default_photo.png'
import i from '../../../public/image.png'
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";
import Dropdown from 'react-bootstrap/Dropdown';
import PlaylistTemplate from "./PlaylistTemplate.jsx";
function Playlist(){
    const {userPlaylist, userDetail, deleteUserPlaylist} = useContext(UserContext);
    const {addToast} = useContext(NotificationContext)
    const Navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    async function handleDeletePlaylist(playlist, position){
        const url = window.location.href
        const parts = url.split('/');
        const lastPart = parts.pop();
        if (userPlaylist[position]._id === lastPart){
           Navigate('/home')
        }
        await deleteUserPlaylist(playlist._id) // redirect
        addToast(`delete "${playlist.name}" successfully`)

    }
    useEffect(()=>{}, [userPlaylist])
    return (
        <>
            {userDetail.username===undefined?(<></>):(
                <div className={"playlist"}>
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><b>My playlists</b></Accordion.Header>
                            <Accordion.Body>
                                <div>
                                    {userPlaylist.map((value, i)=>(
                                        <div  key={i}>
                                            {/*<Link to={`/playlist/${value._id}`}><Button variant={"light"}>{value.name}</Button></Link>*/}
                                            <Button
                                                variant="light"
                                                type="button"
                                                onClick={() => {Navigate(`/playlist/${value._id}`);}}
                                                style={{width:"100%"}}
                                            >
                                                {value.name}
                                            </Button>
                                        </div>
                                    ))}
                                    <hr/>
                                    <div>
                                        <Button
                                            variant="light"
                                            onClick={handleShow}
                                        >
                                            New Playlist
                                        </Button>
                                    </div>
                                    <hr/>
                                    <div>
                                        <DropdownButton
                                            as={ButtonGroup}
                                            title="delete"
                                            id="bg-vertical-dropdown-2"
                                            style={{width:"100%"}}
                                        >
                                            {userPlaylist.map((value, key)=>(
                                                <Dropdown.Item
                                                    eventKey="2"
                                                    key={key}
                                                    onClick={()=>handleDeletePlaylist(value, key)}
                                                >
                                                    {value.name}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <PlaylistTemplate
                        show={show}
                        onClose={()=>setShow(false)}
                        type={"new"}
                    />
                </div>
            )}
        </>
    )
}
// function PlaylistTemplate(props){
//     const [cover, setCover] = useState('')
//     const [isPrivate, setIsPrivate] = useState(false)
//     const [name, setName] = useState('')
//     const [description, setDescription] = useState('')
//     const {userDetail, newUserPlaylist} = useContext(UserContext)
//
//     function handleFileSelect(e) {
//         const file = e.target.files[0];
//         const maxFileSize = 5 * 1024 * 1024; // 5MB
//
//         if (file.size > maxFileSize) {
//             alert('The image size exceeds the 5MB limit.');
//             return;
//         }
//         const reader = new FileReader();
//         reader.onload = (e) => {
//
//             setCover(e.target.result);
//         };
//         reader.readAsDataURL(file);
//     }
//
//
//     const handleNewPlaylist = async (cover) =>{
//         const playlist = {
//             name:name===''?"Unnamed":name,
//             private:isPrivate,
//             description:description,
//             cover:cover
//         }
//         await newUserPlaylist(playlist)
//         setCover(defaultImg)
//         props.onClose();
//     }
//     return (
//         <Modal
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//             backdrop={"static"}
//             animation={true}
//         >
//             <Modal.Header >
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     {/*Add a playlist*/}
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <div
//                     style={{
//                         display:"flex",
//                         flexDirection:"row",
//                         padding: 50
//                 }}>
//                     <img
//                         alt={"img not found"}
//                         src={cover===''?defaultImg:cover}
//                         width={300}
//                         height={300}
//                         style={{
//                             boxShadow: "6px 3px 15px #b9b5b5",
//                             borderRadius: 30
//                         }}
//                         onClick={() => document.getElementById("playlistCover").click()}
//                     />
//                     <input
//                         type="file"
//                         id="playlistCover"
//                         style={{ display: "none" }}
//                         onChange={handleFileSelect}
//                     />
//                     <div style={{alignSelf:"center", padding:50}}>
//                         <Form>
//                             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                                 <Form.Control
//                                     placeholder="Name"
//                                     size={"lg"}
//                                     style={{border:"white"}}
//                                     value={name}
//                                     onChange={
//                                         (e)=>{setName(e.target.value)}
//                                     }
//                                 />
//                             </Form.Group>
//                             <hr/>
//                             <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
//                                 <Form.Control
//                                     as="textarea"
//                                     placeholder={"description"}
//                                     style={{border:"white"}}
//                                     value={description}
//                                     onChange={
//                                         (e)=>{setDescription(e.target.value)}
//                                     }
//                                 />
//                             </Form.Group>
//                             <Form.Check
//                                 type="switch"
//                                 label={"private"}
//                                 onClick={()=>{setIsPrivate(true)}}
//                             />
//                         </Form>
//                     </div>
//                 </div>
//                 {/*<hr/>*/}
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="danger" onClick={props.onClose}>Cancel</Button>
//                 <Button onClick={()=>{handleNewPlaylist(cover)}}>New</Button>
//             </Modal.Footer>
//         </Modal>
//     )
// }

export default Playlist