import React, {useEffect, useState} from "react";
import Figure from 'react-bootstrap/Figure'
// import defaultPlayListImage from '../../../public/default_photo.png'
import defaultPlayListImage from '../../assets/default_photo.png'
import {Link} from "react-router-dom";
import PlaylistContent from "./PlaylistContent.jsx";
// import default_photo from "../../../public/default_photo.png";
import default_photo from '../../assets/default_photo.png'
import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";


/**
 * Playlist Cover Or Album Cover
 * @param playList Input an object type  Eg:
 *      {
 *             "_id": "643d60804efbe854b2855475",
 *             "name": "test2",                    # required
 *             "private": false,
 *             "songs": [],
 *             "owner": {
 *                 "_id": "64366fc18a753d1f42b35d3b",
 *                 "username": "2797146538",     # required
 *                 "email": "2797146538@qq.com",
 *                 "favoritePlayList": [],
 *                 "musicGenre": []
 *             },
 *             "notes": [],
 *             "createdAt": "2023-04-17T15:06:40.447Z",
 *             "updatedAt": "2023-04-17T15:06:40.447Z",
 *             "__v": 0
 *         }
 * @returns {JSX.Element}
 * @constructor
 */
function PlaylistCover({playList, width=200, height=200, showMiniInfo=false, fixMiniInfo=false}){
    const [isHovered, setIsHovered] = useState(false);
    const [contentShow, setContentShow] = useState(false)
    const [picUrl, setPicUrl] = useState(null)
    const [loading, setLoading] = useState(true)

    let [figureCaption, setFigureCaption] = useState({
        playListName:'',
        authorName:''
    });
    useEffect(()=>{
        if (fixMiniInfo){
            setFigureCaption({playListName: playList.name, authorName: `Author: ${playList.owner.username}`})
        }else{
            if (isHovered){
                setFigureCaption({playListName: playList.name, authorName: `Author: ${playList.owner.username}`})
            }else {
                setFigureCaption({
                    playListName:'',
                    authorName:''
                })
            }
        }

    }, [isHovered])

    useEffect(()=>{
        // console.log(playList.songs)

        const getAlbumPicUrl = async () => {
            setLoading(true)
            try {
                if (playList.songs.length !== 0){
                    await axios.get(`${BACKEND_API}/api/music/detail/${playList.songs[playList.songs.length-1]}`).then(response => {
                        // console.log(response.data.data.album.picUrl)
                        setPicUrl(response.data.data.album.picUrl)
                        setLoading(false)
                    });
                }

            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        };
        if (playList.songs.length === 0){
            setPicUrl(defaultPlayListImage)
            setLoading(false)
        }else{
            getAlbumPicUrl()
        }
    },[])

    function openPlaylistContent(){
        setContentShow(true)
    }



    return (
        <div style={{padding:35}}>
            <Link
                to={`/playlist/${playList._id}`}
                // onClick={()=>openPlaylistContent()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
            <Figure>
                <Figure.Image
                    width={width}
                    height={height}
                    alt="180x180"
                    src={(playList.cover===''|| playList.cover === undefined) ?
                        (playList.songs.length === 0)?
                                default_photo:
                                picUrl

                        :playList.cover}
                    style={{borderRadius: 20}}
                />
                {showMiniInfo?(
                    <>
                        <Figure.Caption style={{textAlignLast: "center"}}>
                            {figureCaption.playListName}
                        </Figure.Caption>
                        <Figure.Caption style={{textAlignLast: "center"}}>
                            {figureCaption.authorName}
                        </Figure.Caption>
                    </>
                    ):(
                        <></>
                    )}
            </Figure>
            </Link>
            {/*<img src={picUrl}/>*/}

            {/*<PlaylistContent*/}
            {/*    show={contentShow}*/}
            {/*    onHide={()=>setContentShow(false)}*/}
            {/*    playlist={playList} // react dom cannot recognize the playList, so  playlist instead*/}
            {/*/>*/}
        </div>
    )
}

export default PlaylistCover;
