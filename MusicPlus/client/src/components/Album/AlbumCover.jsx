import PlaylistCover from "../Playlist/PlaylistCover.jsx";
import {useParams} from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import SongList from "../SongList.jsx";

/**
 * Album cover is a type of playlist cover
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
export function AlbumCover({playList}){
    return (
        PlaylistCover({playList})
    )
}