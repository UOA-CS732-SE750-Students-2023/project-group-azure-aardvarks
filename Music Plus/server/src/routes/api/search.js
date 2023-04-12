import * as dotenv from 'dotenv';
import {returnMsg} from "../../utils/commonUtils.js";
import express from "express";
dotenv.config();

const router = express.Router();

router.get('/search/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const songSearchResponse = await fetch(process.env.NeteaseCloudMusicApi+'/search/?keywords='+id+"&type=1");
        let songSearchData = await songSearchResponse.json();
        songSearchData = songSearchData
        console.log(songSearchData)

    }catch (e) {
        console.log(e)
    }
});

export default router;