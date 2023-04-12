import express from 'express';
import {retrievePlayListByOwnerId} from "../../Database/Playlist-dao.js";
import { pipeline } from 'stream';
import { promisify } from 'util';
import * as dotenv from 'dotenv';
import {returnMsg} from "../../utils/commonUtils.js";
dotenv.config();

const router = express.Router();
const pipelineAsync = promisify(pipeline);
router.get('/play/:id', async (req, res) => {
    //播放音乐
    try{
        const { id } = req.params;
        const response = await fetch(process.env.NeteaseCloudMusicApi+'/song/url/v1?id='+id+"&level=standard");
        const data = await response.json();
        const musicFileResponse = await fetch(data.data[0].url);
        if (!musicFileResponse.ok) {
            res.status(musicFileResponse.status).json(returnMsg(0, musicFileResponse.status, 'Error fetching the audio file'));
            return;
        }

        res.setHeader('Content-Type', musicFileResponse.headers.get('Content-Type'));
        await pipelineAsync(musicFileResponse.body, res);
    }catch (e) {
        console.log(e)
    }
});
router.get('/image/:id', async (req, res) => {
    //音乐插图
    try{
        const { id } = req.params;
        const response = await fetch(process.env.NeteaseCloudMusicApi+'/song/detail?ids='+id);
        const data = await response.json();
        const imageFileResponse = await fetch(data.songs[0].al.picUrl);
        if (!imageFileResponse.ok) {
            res.status(imageFileResponse.status).json(returnMsg(0, imageFileResponse.status, 'Error fetching the image file'));
            return;
        }
        res.setHeader('Content-Type', imageFileResponse.headers.get('Content-Type'));
        await pipelineAsync(imageFileResponse.body, res);
    }catch (e) {
        console.log(e)
    }
});
router.get('/lyric/:id', async (req, res) => {
    //歌词
    try{
        const { id } = req.params;
        const response = await fetch(process.env.NeteaseCloudMusicApi+'/lyric?id='+id);
        const data = await response.json();
        return res.json(returnMsg(1,200,data.lrc.lyric))
    }catch (e) {
        console.log(e)
    }
});

router.get('/detail/:id', async (req, res) => {
    //音乐详情
    try{
        const { id } = req.params;
        const styleResponse = await fetch(process.env.NeteaseCloudMusicApi+'/song/wiki/summary?id='+id);
        const stylrData = await styleResponse.json();
        let style = stylrData.data.blocks[1].creatives[0].resources[0].uiElement.mainTitle.title.split("-")[1]
        let styleTagId = stylrData.data.blocks[1].creatives[0].resources[0].uiElement.mainTitle.action.clickAction.targetUrl
        styleTagId = styleTagId.substring(styleTagId.indexOf("tagId=")+6)
        const response = await fetch(process.env.NeteaseCloudMusicApi+'/song/detail?ids='+id);
        const data = await response.json();
        let name = data.songs[0].name
        return res.json(returnMsg(1,200,{
            name: name, singer: data.songs[0].ar, style: {id: styleTagId, name: style}
        }))
    }catch (e) {
        console.log(e)
    }
});


export default router;
