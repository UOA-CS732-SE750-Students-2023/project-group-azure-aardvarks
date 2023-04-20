import express from "express";
import {returnMsg} from "../../utils/commonUtils.js";

const router = express.Router();

router.get('/detail/:id', async (req, res) => {
    //显示该歌手姓名，头像，音乐数量，专辑数量
    try{
        const { id } = req.params;
        const singerSearchResponse = await fetch(process.env.NeteaseCloudMusicApi+'/artist/detail?id='+id);
        let singerSearchData = await singerSearchResponse.json();
        return res.json(returnMsg(1, 200, {name: singerSearchData.data.artist.name, id: singerSearchData.data.artist.id, image: singerSearchData.data.artist.cover, musicSize: singerSearchData.data.artist.musicSize, albumSize: singerSearchData.data.artist.albumSize}))
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
});

router.get('/album/:id/:pagenum/:pagesize', async (req, res) => {
    // 显示该歌手专辑
    // params:被搜索的内容/偏移数量/取出数量
    try{
        const { id, pagenum, pagesize  } = req.params;
        const singerSearchResponse = await fetch(process.env.NeteaseCloudMusicApi+'/artist/album?id='+id + "&offset="+ pagenum*pagesize +"&limit="+pagesize);
        let singerSearchData = await singerSearchResponse.json();

        return res.json(returnMsg(1, 200, singerSearchData.hotAlbums.map(album => ({name: album.name, id: album.id, picUrl: album.picUrl, artist:{name:album.artist.name, id:album.artist.id, picUrl:album.artist.picUrl}, size:album.size}))))
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
});
router.get('/songs/:id/:pagenum/:pagesize', async (req, res) => {
    // 显示该歌手音乐
    // params:被搜索的内容/偏移数量/取出数量
    try{
        const { id, pagenum, pagesize  } = req.params;
        const songsSearchResponse = await fetch(process.env.NeteaseCloudMusicApi+'/artist/songs?id='+id + "&offset="+ pagenum*pagesize +"&limit="+pagesize);
        let songsSearchData = await songsSearchResponse.json();
        return res.json(returnMsg(1, 200, songsSearchData.songs.map(song => ({name: song.name, id: song.id, artists: song.ar.map(artist => ({name: artist.name, id: artist.id})), album: {name: song.al.name, id: song.al.id}}))))
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
});
export default router;
