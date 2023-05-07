import express from "express";
import {returnMsg} from "../../utils/commonUtils.js";

const router = express.Router();

router.get('/:id', async (req, res) => {
    // 显示该歌手音乐
    // params:被搜索的内容
    try{
        const { id, pagenum, pagesize  } = req.params;
        const songsSearchResponse = await fetch(process.env.NeteaseCloudMusicApi+'/album?id='+id);
        let songsSearchData = await songsSearchResponse.json();
        return res.json(returnMsg(1, 200, {album: {name: songsSearchData.album.name, id: songsSearchData.album.id, picUrl: songsSearchData.album.picUrl, artist:{name:songsSearchData.album.artist.name, id:songsSearchData.album.artist.id, picUrl:songsSearchData.album.artist.picUrl}, size:songsSearchData.album.size} ,songs:songsSearchData.songs.map(song => ({name: song.name, id: song.id, artists: song.ar.map(artist => ({name: artist.name, id: artist.id})), album: {name: song.al.name, id: song.al.id}}))}))
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
});

export default router;
