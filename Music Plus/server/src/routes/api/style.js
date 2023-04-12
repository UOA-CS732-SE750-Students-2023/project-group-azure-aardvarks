import * as dotenv from 'dotenv';
import {returnMsg} from "../../utils/commonUtils.js";
import express from "express";
import {auth} from "../../middleware/auth.js";
import {retrieveUserById, updateUser} from "../../Database/User-dao.js";
dotenv.config();

const router = express.Router();

async function getStyleSongs(styleId) {
    const response = await fetch(process.env.NeteaseCloudMusicApi + `/style/song?tagId=${styleId}&sort=0`);
    let data = await response.json();
    data = data.data.songs
    data = data.map(song => ({name: song.name, id: song.id, artists: song.ar.map(artist => ({name: artist.name, id: artist.id})), album: {name: song.al.name, id: song.al.id}}))
    return data
}

router.get('/allStyle', async (req, res) => {
    //展示所有曲风
    try{
        const response = await fetch(process.env.NeteaseCloudMusicApi+'/style/list');
        let data = await response.json();
        console.log(data.data)
        data = data.data.map(style => ({name: style.tagName, id: style.tagId, enName: style.enName, childStyle: style.childrenTags.map(childStyle => ({name: childStyle.tagName, id: childStyle.tagId, enName: childStyle.enName, picUrl: childStyle.picUrl})), picUrl: style.picUrl}))
        //console.log(songSearchData)
        return res.json(returnMsg(1, 200, data))
    }catch (e) {
        console.log(e)
    }
});

router.get('/songs/:id', async (req, res) => {
    //展示某个曲风下的所有歌曲
    try{
        const { id } = req.params;
        let data = await getStyleSongs(id)
        return res.json(returnMsg(1, 200, data))
    }catch (e) {
        console.log(e)
    }
});

router.get('/preference', auth,async (req, res) => {
    //根据用户个人偏好曲风推荐音乐
    try{
        let result = []
        let user = await retrieveUserById(req.user_id)
        let userGenre = user.musicGenre
        let top5UserGenre = userGenre.sort((a, b) => b.count - a.count).slice(0, 5);
        for (let userGenre in top5UserGenre){
            let data = await getStyleSongs(top5UserGenre[userGenre].type1)
            data = data.slice(0,10)
            result.push(data.sort(() => 0.5 - Math.random()).slice(0, 2));
        }
        return res.json(returnMsg(1, 200, result))
    }catch (e) {
        console.log(e)
    }
});

router.post('/setPreference/:id', auth,async (req, res) => {
    //添加用户曲风偏好
    try{
        const { id } = req.params;
        let user = await retrieveUserById(req.user_id)
        const userMusicGenre = user.musicGenre.find(style => style.type1 === id);

        if (userMusicGenre) {
            userMusicGenre.count += 1;
        } else {
            user.musicGenre.push({ type1: id, count: 1 });
        }
        await updateUser(user)
        return res.json(returnMsg(1, 200, await retrieveUserById(req.user_id)))
    }catch (e) {
        console.log(e)
    }
});
export default router;
