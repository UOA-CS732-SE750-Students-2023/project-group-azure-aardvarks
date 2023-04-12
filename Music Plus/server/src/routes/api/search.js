import * as dotenv from 'dotenv';
import {returnMsg} from "../../utils/commonUtils.js";
import express from "express";
import {retrievePlayList} from "../../Database/Playlist-dao.js";
dotenv.config();

const router = express.Router();

router.get('/search/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const songSearchResponse = await fetch(process.env.NeteaseCloudMusicApi+'/search/?keywords='+id+"&type=1");
        let songSearchData = await songSearchResponse.json();
        songSearchData = songSearchData.result.songs.map(song => ({name: song.name, id: song.id, artists: song.artists.map(artist => ({name: artist.name, id: artist.id}))}))
        const singerSearchResponse = await fetch(process.env.NeteaseCloudMusicApi+'/search/?keywords='+id+"&type=100");
        let singerSearchData = await singerSearchResponse.json();
        singerSearchData = singerSearchData.result.artists.map(singer => ({name: singer.name, id: singer.id, picUrl: singer.picUrl}))
        //console.log(singerSearchData)
        return res.json(returnMsg(1, 200, {song: songSearchData, singer: singerSearchData, playlist: await retrievePlayList(id)}))
    }catch (e) {
        console.log(e)
    }
});
router.get('/similarSongs/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const songSearchResponse = await fetch(process.env.NeteaseCloudMusicApi+'/simi/song?id='+id);
        let songSearchData = await songSearchResponse.json();
        songSearchData = songSearchData.songs.map(song => ({name: song.name, id: song.id, artists: song.artists.map(artist => ({name: artist.name, id: artist.id})), picUrl: song.album.picUrl}))
        //console.log(songSearchData)
        return res.json(returnMsg(1, 200, {song: songSearchData}))
    }catch (e) {
        console.log(e)
    }
});

export default router;