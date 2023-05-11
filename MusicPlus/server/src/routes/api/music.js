import express from 'express';

import { pipeline } from 'stream';
import { promisify } from 'util';
import * as dotenv from 'dotenv';
import {returnMsg} from "../../utils/commonUtils.js";
import axios from "axios";
import {CookieModel, login} from "../../Database/Schemas/Schema.js";
dotenv.config();

const router = express.Router();
const pipelineAsync = promisify(pipeline);
router.get('/play/:id', async (req, res) => {
    //播放音乐
    try{
        const { id } = req.params;
        const cookies = await login()
        //console.log(cookies.cookie)
        const res1 = await axios({
            url: process.env.NeteaseCloudMusicApi+'/song/url/v1?id='+id+"&level=standard",
            method: 'post',
            data: {
                cookie: cookies ? cookies.cookie : '',
            },
        })
        //console.log(res.data.data[0].url);
        const data = res1.data;
        console.log(data)
        if (data.data[0].url === null){
            res.status(400).json(returnMsg(0, 400, 'Error fetching the audio file'));
            return;
        }
        const musicFileResponse = await fetch(data.data[0].url);
        if (!musicFileResponse.ok) {
            res.status(musicFileResponse.status).json(returnMsg(0, musicFileResponse.status, 'Error fetching the audio file'));
            return;
        }

        res.setHeader('Content-Type', musicFileResponse.headers.get('Content-Type'));
        await pipelineAsync(musicFileResponse.body, res);
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
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
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
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
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
});

router.get('/detail/:id', async (req, res) => {
    //音乐详情
    try{
        const { id } = req.params;
        const styleResponse = await fetch(process.env.NeteaseCloudMusicApi+'/song/wiki/summary?id='+id);
        const stylrData = await styleResponse.json();
        console.log(stylrData)
        let style = "null"
        let styleTagId = "null"
        if (stylrData.data.blocks[1].creatives[0].resources[0]){
            style = stylrData.data.blocks[1].creatives[0].resources[0].uiElement.mainTitle.title.split("-")[1]
            styleTagId = stylrData.data.blocks[1].creatives[0].resources[0].uiElement.mainTitle.action.clickAction.targetUrl
            styleTagId = styleTagId.substring(styleTagId.indexOf("tagId=")+6)
        }

        const response = await fetch(process.env.NeteaseCloudMusicApi+'/song/detail?ids='+id);
        const data = await response.json();
        let name = data.songs[0].name
        return res.json(returnMsg(1,200,{
            name: name, singer: data.songs[0].ar, album: data.songs[0].al,style: {id: styleTagId, name: style}
        }))
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
});


export default router;
