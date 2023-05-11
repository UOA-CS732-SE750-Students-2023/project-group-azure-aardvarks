import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../utils/AppContextProvider.jsx";
// import defaultImg from "../../../public/default_photo.png";
import defaultImg from "../../assets/default_photo.png"
import {Button, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";

/**
 *  required "type", type="new" or type="edit"
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
        console.log(file)
    }


    const handleNewPlaylist = async (cover) =>{
        const playlist = {
            name:name===''?"Unnamed":name,
            private:isPrivate,
            description:description,
            cover:cover
        }
        await newUserPlaylist(playlist)
        if (cover !== ""){
            setCover(cover)
        }else{
            setCover(defaultImg)
        }
        props.onClose();
    }
    const handleEditPlaylist = async (cover, playlistId) =>{
        const playlist = {
            _id:playlistId,
            private:isPrivate
        }
        if(name!==''){
            playlist.name = name
        }
        if(description!==''){
            playlist.description = description
        }
        if(cover!==''){
            playlist.cover = cover
        }
        await updateUserPlaylist(playlist)
        if (cover !== ""){
            setCover(cover)
        }else{
            setCover(defaultImg)
        }

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
                    {props.type}
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
                        src={props.currentcover===undefined?cover===""?defaultImg:cover:props.currentcover}
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
                                    placeholder={props.currentplaylistname !== undefined?props.currentplaylistname:"Playlist Name"}
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
                                    placeholder={props.currentplaylistdescription !== undefined?props.currentplaylistdescription:"Description"}
                                    style={{border:"white"}}
                                    value={description}
                                    onChange={
                                        (e)=>{setDescription(e.target.value)}
                                    }
                                />
                            </Form.Group>
                            {/*<Form.Check*/}
                            {/*    type="switch"*/}
                            {/*    label={"private"}*/}
                            {/*    onClick={()=>{setIsPrivate(true)}}*/}
                            {/*/>*/}
                            <Form.Select
                                size="sm"
                                defaultValue={props.currentplaylistprivate !== undefined?props.currentplaylistprivate==="true"?"private":"public":"public"}
                                onChange={(e)=>{setIsPrivate(e.target.value === "private")}}
                            >
                                <option key={'public'}>public</option>
                                <option key={'private'} >private</option>
                            </Form.Select>
                        </Form>
                    </div>
                </div>
                {/*<hr/>*/}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onClose}>Cancel</Button>
                { props.type === 'new'? (<Button onClick={()=>{handleNewPlaylist(cover)}}>New</Button>):(<></>)}
                { props.type === 'edit'? (<Button onClick={()=>{handleEditPlaylist(cover, props._id)}}>Update</Button>):(<></>)}
            </Modal.Footer>
        </Modal>
    )
}

export default PlaylistTemplate
