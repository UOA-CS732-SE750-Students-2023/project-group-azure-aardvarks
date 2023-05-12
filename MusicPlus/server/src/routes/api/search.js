import * as dotenv from 'dotenv';
import {formatDateTime, returnMsg} from "../../utils/commonUtils.js";
import express from "express";
import {retrievePlayList} from "../../Database/Playlist-dao.js";

import axios from "axios";

dotenv.config();

const router = express.Router();

router.get('/search/:id/:pagenum/:pagesize', async (req, res) => {
    //综合搜索（音乐，作者，歌单,专辑） params:被搜索的内容/偏移数量/取出数量
    try {
        const {id, pagenum, pagesize} = req.params;
        const songSearchResponse = await fetch(process.env.NeteaseCloudMusicApi + '/search/?keywords=' + id + "&type=1&offset=" + pagenum * pagesize + "&limit=" + pagesize);
        let songSearchData = await songSearchResponse.json();
        songSearchData = songSearchData.result.songs.map(song => ({
            name: song.name,
            id: song.id,
            artists: song.artists.map(artist => ({name: artist.name, id: artist.id})),
            album: {name: song.album.name, id: song.album.id}
        }))
        const singerSearchResponse = await fetch(process.env.NeteaseCloudMusicApi + '/search/?keywords=' + id + "&type=100&offset=" + pagenum * pagesize + "&limit=" + pagesize);
        let singerSearchData = await singerSearchResponse.json();
        singerSearchData = singerSearchData.result.artists.map(singer => ({
            name: singer.name,
            id: singer.id,
            picUrl: singer.picUrl
        }))
        const albumSearchResponse = await fetch(process.env.NeteaseCloudMusicApi + '/search/?keywords=' + id + "&type=10&offset=" + pagenum * pagesize + "&limit=" + pagesize);
        let albumSearchData = await albumSearchResponse.json();
        albumSearchData = albumSearchData.result.albums.map(album => ({
            name: album.name,
            id: album.id,
            picUrl: album.picUrl,
            artist: {name: album.artist.name, id: album.artist.id, picUrl: album.artist.picUrl},
            size: album.size
        }))
        return res.json(returnMsg(1, 200, {
            song: songSearchData,
            singer: singerSearchData,
            playlist: await retrievePlayList(id),
            album: albumSearchData
        }))
    } catch (e) {
        console.log(e);
        return res.status(501).json(returnMsg(0, 501, e));
    }
});
router.get('/similarSongs/:id', async (req, res) => {
    //显示该音乐的相似音乐
    try {
        const {id} = req.params;
        const songSearchResponse = await fetch(process.env.NeteaseCloudMusicApi + '/simi/song?id=' + id);
        let songSearchData = await songSearchResponse.json();
        songSearchData = songSearchData.songs.map(song => ({
            name: song.name,
            id: song.id,
            artists: song.artists.map(artist => ({name: artist.name, id: artist.id})),
            picUrl: song.album.picUrl,
            album: {name: song.album.name, id: song.album.id}
        }))
        //console.log(songSearchData)
        return res.json(returnMsg(1, 200, {song: songSearchData}))
    } catch (e) {
        console.log(e);
        return res.status(501).json(returnMsg(0, 501, e));
    }
});

/**
 * @param name required search music,
 * @param pageNum not required
 * @param pageSize not required
 * @return {
 *     "status": 1,
 *     "code": 200,
 *     "data": {
 *         "song": [
 *             {
 *                 "name": "愿与愁",
 *                 "id": 2041026502,
 *                 "artists": [
 *                     {
 *                         "name": "林俊杰",
 *                         "id": 3684
 *                     }
 *                 ],
 *                 "album": {
 *                     "name": "愿与愁",
 *                     "id": 164109253
 *                 }
 *             }
 *         ],
 *         "singer": [
 *             {
 *                 "name": "林俊杰",
 *                 "id": 52331015,
 *                 "picUrl": "https://p2.music.126.net/yCvMMpNbyMGyUCQ9UDvnSQ==/109951167316708118.jpg"
 *             }
 *         ],
 *         "playlist": [],
 *         "album": [
 *             {
 *                 "name": "谢幕",
 *                 "id": 162700227,
 *                 "picUrl": "http://p4.music.126.net/vzoGQUawsbxwFLmKAAM4Mg==/109951168505296524.jpg",
 *                 "artist": {
 *                     "name": "林俊杰",
 *                     "id": 3684,
 *                     "picUrl": "http://p4.music.126.net/78q0jUUJ0h08GxAs2G-tCA==/109951168529051968.jpg"
 *                 },
 *                 "size": 1
 *             }
 *         ]
 *     }
 * }
 */
router.get('/' , async (req, res) => {
    try{
        const {pageNum=0, pageSize=20, keyword} =req.query
        const requests = [
            axios.get(`${process.env.NeteaseCloudMusicApi}/search/?keywords=${keyword}&type=1&offset=${pageNum}&limit=${pageSize}`),
            axios.get(`${process.env.NeteaseCloudMusicApi}/search/?keywords=${keyword}&type=100&offset=${pageNum}&limit=${pageSize}`),
            axios.get(`${process.env.NeteaseCloudMusicApi}/search/?keywords=${keyword}&type=10&offset=${pageNum}&limit=${pageSize}`),
        ]
        const searchResponse = await axios.all(requests)
        const songResponse =  searchResponse[0].data
        const singerResponse =  searchResponse[1].data
        const albumResponse =  searchResponse[2].data


        const songSearchData = songResponse.result.songs.map(song => ({
            name: song.name,
            id: song.id,
            artists: song.artists.map(artist => ({name: artist.name, id: artist.id})),
            album: {name: song.album.name, id: song.album.id}
        }))

        const singerSearchData = singerResponse.result.artists.map(singer => ({
            name: singer.name,
            id: singer.id,
            picUrl: singer.picUrl
        }))
        const albumSearchData = albumResponse.result.albums.map(album => ({
            name: album.name,
            id: album.id,
            picUrl: album.picUrl,
            artist: {name: album.artist.name, id: album.artist.id, picUrl: album.artist.picUrl},
            size: album.size
        }))
        // const searchResponse = await axios.get(`${process.env.NeteaseCloudMusicApi}/search/?keywords=${keyword}&type=1&offset=${1}&limit=${1}`)
        // const songResponse = searchResponse.data.result
        // for (const key in songResponse.songs) {
        //     songResponse.songs[key].album
            // const date = new Date(searchResponse.data.result.songs[key].album.publishTime)
            // searchResponse.data.result.songs[key].album.publishTime = formatDateTime(date)
        // }
        return res.send(returnMsg(1,200,{
            song: songSearchData,
            singer: singerSearchData,
            playlist: await retrievePlayList(keyword),
            album: albumSearchData
        }))
    }catch (e){
        return res.send(returnMsg(0,500,e))
    }

})

export default router;
