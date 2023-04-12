import express from 'express';
import basicAuth from "basic-auth";
import {createUser, vaildUser} from "../../Database/User-dao.js";
import {
    createPlayList,
    retrievePlayList,
    retrievePlayListById,
    retrievePlayListsList,
    retrievePlayListByOwnerId, retrievePlayListsListPublic, updatePlayList, retrievePlayListByIdNoSongInfo
} from "../../Database/playList-dao.js";
import {returnMsg} from "../../utils/commonUtils.js"
import mongoose from 'mongoose';
import vaildSongAvailable from "../../utils/vaildSongAvailable.js";
import {auth} from "../../middleware/auth.js";

const { ObjectId } = mongoose.Types;
const router = express.Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;


router.post('/newPlayList', auth, async (req, res) => {
    //新建歌单
    try{
        req.body.owner = new ObjectId(req.user_id)
        const newPlayList = await createPlayList(req.body);

        if (newPlayList) return res.status(HTTP_CREATED)
            .header('Location', `/api/playList/${newPlayList._id}`)
            .json(returnMsg(1, HTTP_CREATED, newPlayList) );

        return res.send(returnMsg(0, 422, "Error!"));
    }catch (e) {
        console.log(e)
    }
});
router.get('/allPlayList', async (req, res) => {
    //展示所有public的歌单
    try{
        return res.json(returnMsg(1, HTTP_OK, await retrievePlayListsListPublic()) )
    }
    catch (e) {
        console.log(e)
    }
});
router.get('/searchPlayListByName/:id', async (req, res) => {
    //根据歌单名搜索歌单（public）
    try {
        const { id } = req.params;
        let playLists = await retrievePlayList(id);

        return res.json(returnMsg(1, HTTP_OK, playLists))
    }catch (e){
        console.log(e)
    }
});
router.get('/searchPlayListById/:id', async (req, res) => {
    //根据歌单ID搜索（忽略public）
    try{
        const { id } = req.params;
        return res.json(returnMsg(1, HTTP_OK, await retrievePlayListById(new ObjectId(id))) )
    }catch (e) {
        console.log(e)
    }

});
router.get('/searchPlayListByOwnerId/:id', async (req, res) => {
    //根据ownerid搜索（忽略public）
    try{
        const { id } = req.params;
        return res.json(returnMsg(1, HTTP_OK, await retrievePlayListByOwnerId(id)) )
    }catch (e) {
        console.log(e)
    }
});
router.post('/addSong', auth,async (req, res) => {
    //向歌单添加歌曲
    try{
        let existsArray = [];
        let songIdErrorArray = [];
        let playList = await retrievePlayListByIdNoSongInfo(new ObjectId(req.body._id))
        if(playList){
            if (new ObjectId(req.user_id).equals(playList.owner)){
                for (let song in req.body.songs){
                    if (playList.songs.indexOf(req.body.songs[song]) === -1 && await vaildSongAvailable(req.body.songs[song])){
                        playList.songs.push(req.body.songs[song])
                    }else if(playList.songs.indexOf(req.body.songs[song]) !== -1){
                        existsArray.push(req.body.songs[song])
                    }else if(!await vaildSongAvailable(req.body.songs[song])){
                        songIdErrorArray.push(req.body.songs[song])
                    }
                }
                const afterChange = await updatePlayList(playList)
                if (existsArray.length !== 0 || songIdErrorArray.length !== 0){
                    return res.status(400).json(returnMsg(0, 400, 'These songs are already in the playlist: ['+ existsArray.toString()+ "]. These songs ID are wrong: [" + songIdErrorArray + "]. The remaining ones have been successfully added. The current playlist has [" + playList.songs +"]."))
                }
                if (afterChange !== null) return res.status(HTTP_OK).header('Location', `/api/playList/${afterChange._id}`).json(returnMsg(1, HTTP_OK, await retrievePlayListById(afterChange._id)));
                return res.json(returnMsg(0, HTTP_NOT_FOUND, "Error!"))
            }
            res.setHeader('WWW-Authenticate' , 'Basic realm="Authorization Required"');
            return res.status(401).json(returnMsg(0, 401, 'Authorization Required'));
        }
        return res.json(returnMsg(0, 500, "ID Error!"))
    }catch (e) {
        console.log(e)
    }

});
router.post('/deleteSong', auth,async (req, res) => {
    //删除歌单歌曲
    try{
        let playList = await retrievePlayListByIdNoSongInfo(new ObjectId(req.body._id))
        if (playList){
            if (new ObjectId(req.user_id).equals(playList.owner)){
                for (let song in req.body.songs){
                    const index = playList.songs.indexOf(req.body.songs[song]);
                    if (index !== -1) {
                        playList.songs.splice(index, 1);
                    }
                }
                const afterChange = await updatePlayList(playList)
                if (afterChange !== null) return res.status(HTTP_OK).header('Location', `/api/playList/${afterChange._id}`).json(returnMsg(1, HTTP_OK, await retrievePlayListById(afterChange._id)));

                return res.sendStatus(HTTP_NOT_FOUND).json(returnMsg(0, HTTP_NOT_FOUND, "Error!"));
            }
            res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
            return res.status(401).json(returnMsg(0, 401, 'Authorization Required'));
        }
        return res.json(returnMsg(0, 500, "ID Error!"))
    }catch (e) {
        console.log(e)
    }
});
router.post('/changePlayListInfo', auth,async (req, res) => {
    //更改歌单信息
    try{
        let playList = await retrievePlayListByIdNoSongInfo(new ObjectId(req.body._id))
        if(playList){
            if (new ObjectId(req.user_id).equals(playList.owner)){
                playList.name = req.body.name;
                playList.private = req.body.private;
                const afterChange = await updatePlayList(playList)
                if (afterChange !== null) return res.status(HTTP_OK).header('Location', `/api/playList/${afterChange._id}`).json(returnMsg(1, HTTP_OK, await retrievePlayListById(afterChange._id)));

                return res.sendStatus(HTTP_NOT_FOUND).json(returnMsg(0, HTTP_NOT_FOUND, "Error!"));
            }
            res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
            return res.status(401).json(returnMsg(0, 401, 'Authorization Required'));
        }
        return res.json(returnMsg(0, 500, "ID Error!"))
    }catch (e) {
        console.log(e)
    }
});
export default router;