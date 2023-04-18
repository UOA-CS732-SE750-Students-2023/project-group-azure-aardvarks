import React, {useEffect, useState} from "react";
import Figure from 'react-bootstrap/Figure'
import defaultPlayListImage from '../../../public/default_photo.png'
import {Link} from "react-router-dom";
import PlaylistContent from "./PlaylistContent.jsx";


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
function PlaylistCover({playList}){
    const [isHovered, setIsHovered] = useState(false);
    const [contentShow, setContentShow] = useState(false)
    let [figureCaption, setFigureCaption] = useState({
        playListName:'',
        authorName:''
    });
    useEffect(()=>{
        if (isHovered){
            setFigureCaption({playListName: playList.name, authorName: `Author: ${playList.owner.username}`})
        }else {
            setFigureCaption({
                playListName:'',
                authorName:''
            })
        }
    }, [isHovered])

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
                    width={171}
                    height={180}
                    alt="171x180"
                    src={defaultPlayListImage}
                    style={{borderRadius: 20}}
                />
                <Figure.Caption style={{textAlignLast: "center"}}>
                    {figureCaption.playListName}
                </Figure.Caption>
                <Figure.Caption style={{textAlignLast: "center"}}>
                     {figureCaption.authorName}
                </Figure.Caption>
            </Figure>
            </Link>

            {/*<PlaylistContent*/}
            {/*    show={contentShow}*/}
            {/*    onHide={()=>setContentShow(false)}*/}
            {/*    playlist={playList} // react dom cannot recognize the playList, so  playlist instead*/}
            {/*/>*/}
        </div>
    )
}

export default PlaylistCover;