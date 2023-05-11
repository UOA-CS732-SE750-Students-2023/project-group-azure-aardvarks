import * as dotenv from 'dotenv';
import {formatDateTime, returnMsg} from "../../utils/commonUtils.js";
import express from "express";
import {auth} from "../../middleware/auth.js";
import {retrieveUserById, updateUser} from "../../Database/User-dao.js";
import {playList} from "../../Database/Schemas/Schema.js";
dotenv.config();

const router = express.Router();

export async function getStyleSongs(styleId) {
    const response = await fetch(process.env.NeteaseCloudMusicApi + `/style/song?tagId=${styleId}&sort=0`);
    let data = await response.json();
    data = data.data.songs
    const result = []
    for (const song in data){
        result.push(data[song].id)
    }
    //data = data.map(song => ({id: song.id, artists: song.ar.map(artist => ({name: artist.name, id: artist.id})), album: {name: song.al.name, id: song.al.id}}))
    return result
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
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
});

router.get('/songs/:id', async (req, res) => {
    //展示某个曲风下的所有歌曲
    try{
        const { id } = req.params;
        let data = await getStyleSongs(id)
        return res.json(returnMsg(1, 200, data))
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
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
            //result.push(data.sort(() => 0.5 - Math.random()).slice(0, 2));
            const temp = data.sort(() => 0.5 - Math.random()).slice(0, 2)
            for (const t in temp){
                if (!result.includes(temp[t])) {
                    result.push(temp[t]);
                }
            }
        }
        let list = {
            "_id": user._id+"1",
            "username": "System",
            "email": "System@email.com",
            "favoritePlayList": [],
            "musicGenre": [],
            "favoriteMusic": user._id+"1"
        }
        const now = new Date();
        const result1 = {
            "_id" : "125154"+list._id,
            "name":"Random Recommendation",
            "private":true,
            "songs":result,
            "createAt":now.toLocaleString(),
            "updatedAt":now.toLocaleString(),
            "owner": list
        }
        return res.json(returnMsg(1, 200, result1))
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
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
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
});
export default router;
