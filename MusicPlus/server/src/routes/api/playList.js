import express from 'express';
import basicAuth from "basic-auth";
import {createUser, retrieveUserBaseProfile, retrieveUserById, vaildUser} from "../../Database/User-dao.js";
import {
    createPlayList,
    retrievePlayList,
    retrievePlayListById,
    retrievePlayListsList,
    retrievePlayListByOwnerId,
    retrievePlayListsListPublic,
    updatePlayList,
    retrievePlayListByIdNoSongInfo,
    retrievePlayListByOwnerIdPublicOnly, retrievePlayListByOwnerIdPrivateOnly, deletePlayList
} from "../../Database/playList-dao.js";
import {formatDateTime, returnMsg} from "../../utils/commonUtils.js"
import mongoose from 'mongoose';
import vaildSongAvailable from "../../utils/vaildSongAvailable.js";
import {auth} from "../../middleware/auth.js";
import {playList} from "../../Database/Schemas/Schema.js";

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
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
});
router.get('/allPlayList', async (req, res) => {
    //展示所有public的歌单
    try{
        return res.json(returnMsg(1, HTTP_OK, await retrievePlayListsListPublic()) )
    }
    catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
});
router.get('/searchPlayListByName/:id', async (req, res) => {
    //根据歌单名搜索歌单（public）
    try {
        const { id } = req.params;
        let playLists = await retrievePlayList(id);

        return res.json(returnMsg(1, HTTP_OK, playLists))
    }catch (e){
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
});
router.get('/searchPlayListById/:id', async (req, res) => {
    //根据歌单ID搜索（忽略public）
    try {
        const { id } = req.params;
        const result = await retrievePlayListById(id)
        return res.json(returnMsg(1, HTTP_OK, result))
    }catch (e){
        return res.json(returnMsg(0, 500, e))
    }


});
router.get('/searchPlayListByOwnerId/:id', async (req, res) => {
    //根据ownerid搜索（忽略public）
    try{
        const { id } = req.params;
        let result = await retrievePlayListByOwnerId(id)
        return res.json(returnMsg(1, HTTP_OK, result) )
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
});

/**
 * @param type required ("public", "private" or "all")
 * @param id required
 */
router.post('/search/owner/id', async (req, res) => {
    try{
        const {id, type} = req.body
        if (type === "public"){
            return res.json(returnMsg(1, HTTP_OK, await retrievePlayListByOwnerIdPublicOnly(id)) )
        }else if (type === "private"){
            return res.json(returnMsg(1, HTTP_OK, await retrievePlayListByOwnerIdPrivateOnly(id)) )
        }
        else if(type === "all"){
            return res.json(returnMsg(1, HTTP_OK, await retrievePlayListByOwnerId(id)) )
        }else{
            return res.status(501).json(returnMsg(0, 501,"Input error"));
        }

    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
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
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
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
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
});
router.put('/changePlayListInfo', auth,async (req, res) => {
    //更改歌单信息
    try{
        let playList = await retrievePlayListByIdNoSongInfo(new ObjectId(req.body._id))
        if(playList){
            if (new ObjectId(req.user_id).equals(playList.owner)){
                playList.name = req.body.name;
                playList.private = req.body.private;
                playList.description = req.body.description;
                playList.cover = req.body.cover
                const afterChange = await updatePlayList(playList)
                if (afterChange !== null) return res.status(HTTP_OK).header('Location', `/api/playList/${afterChange._id}`).json(returnMsg(1, HTTP_OK, await retrievePlayListById(afterChange._id)));

                return res.sendStatus(HTTP_NOT_FOUND).json(returnMsg(0, HTTP_NOT_FOUND, "Error!"));
            }
            res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
            return res.status(401).json(returnMsg(0, 401, 'Authorization Required'));
        }
        return res.json(returnMsg(0, 500, "ID Error!"))
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
});

/**
 * Take a number of public playlist randomly. takes min(num, playList.length)
 */
router.get('/random/:num',async (req, res)=>{
    try{
        let {num} = req.params

        num = Number(num)
        if(isNaN(num)){
            return res.send(returnMsg(0, 500, "type error: " + num))
        }

        const pipeline = []
        pipeline.push({
            $match:{
                private:false
            }
        })
        pipeline.push({
            $sample:{
                size:num
            }
        })

        const result = await playList.aggregate(pipeline)

        for (const resultKey in result) {
            const author = await retrieveUserBaseProfile(result[resultKey].owner)
            result[resultKey].owner = author
            result[resultKey].createdAt = formatDateTime(result[resultKey].createdAt)
            result[resultKey].updatedAt = formatDateTime(result[resultKey].updatedAt)
            // result[resultKey].updatedAt = result[resultKey].updatedAt.format("yyyy-MM-dd:mm")
        }

        return res.send(returnMsg(1, 200, result))
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }

})

/**
 * Delete a playlist by playlist's id
 */
router.delete('/delete/:id', auth,async (req, res)=>{
    const { id } = req.params;
    try{
        await deletePlayList(id)
        return res.send(returnMsg(0, 500, `delete ${id} successfully`))
    }catch (e){
        return res.send(returnMsg(0, 500, e))
    }
})


router.get('/user/:id',async (req, res)=>{
    try{
        const { id } = req.params;
        let lists = await playList.find({owner:id}).populate('owner');
        return res.send(returnMsg(1, 200, lists))
    } catch (e) {
        console.log(e);
        return res.status(501).json(returnMsg(0, 501, e));
    }
});
router.get('/randomEnglish',async (req, res)=>{
    try {
        const response = await fetch(`${process.env.NeteaseCloudMusicApi}/style/album?tagId=1032`);
        const data = await response.json();
        return res.send(returnMsg(1, 200, data))

    } catch (e) {
        console.log(e);
        return res.status(501).json(returnMsg(0, 501, e));
    }
    try{
        const { id } = req.params;
        let lists = await playList.find({owner:id}).populate('owner');
        return res.send(returnMsg(1, 200, lists))
    } catch (e) {
        console.log(e);
        return res.status(501).json(returnMsg(0, 501, e));
    }
});
export default router;
