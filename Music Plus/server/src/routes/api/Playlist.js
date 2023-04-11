import express from 'express';
import basicAuth from "basic-auth";
import {createUser, VaildUser} from "../../Database/User-dao.js";
import {
    createPlaylist,
    retrievePlaylist,
    retrievePlaylistById,
    retrievePlaylistsList,
    retrievePlaylistByOwnerId, retrievePlaylistsList_public, updatePlaylist, retrievePlaylistById_NoSongInfo
} from "../../Database/Playlist-dao.js";
import mongoose from 'mongoose';
import {contentDisposition} from "express/lib/utils.js";
import vaildSongAvailable from "../../utils/vaildSongAvailable.js";

const { ObjectId } = mongoose.Types;
const router = express.Router();
let user_id;
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const auth = async (req, res, next) => {
    const credentials = basicAuth(req);
    let Vailduser = await VaildUser(credentials)
    if (!credentials || Vailduser === false) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
        res.status(401).send('Authorization Required');
        return;
    }
    user_id = Vailduser[0]._id
    next();
};

router.post('/NewPlaylist', auth, async (req, res) => {
    req.body.owner = new ObjectId(user_id)
    const newPlaylist = await createPlaylist(req.body);

    if (newPlaylist) return res.status(HTTP_CREATED)
        .header('Location', `/api/Playlist/${newPlaylist._id}`)
        .json(newPlaylist);

    return res.sendStatus(422);
});
router.get('/AllPlaylist', async (req, res) => {

    return res.json(await retrievePlaylistsList_public())
});
router.get('/SearchPlaylistByName/:id', async (req, res) => {
    const { id } = req.params;
    let playlists = await retrievePlaylist(id);

    return res.json(playlists)
});
router.get('/SearchPlaylistByid/:id', async (req, res) => {
    const { id } = req.params;

    return res.json(await retrievePlaylistById(new ObjectId(id)))
});
router.get('/SearchPlaylistByOwnerid/:id', async (req, res) => {
    const { id } = req.params;

    return res.json(await retrievePlaylistByOwnerId(id))
});
router.post('/Addsong', auth,async (req, res) => {
    try{
        let existsArray = [];
        let songIdErrorArray = [];
        let Playlist = await retrievePlaylistById_NoSongInfo(new ObjectId(req.body._id))
        if (new ObjectId(user_id).equals(Playlist.owner)){
            for (let song in req.body.songs){
                if (Playlist.songs.indexOf(req.body.songs[song]) === -1 && await vaildSongAvailable(req.body.songs[song])){
                    Playlist.songs.push(req.body.songs[song])
                }else if(Playlist.songs.indexOf(req.body.songs[song]) !== -1){
                    existsArray.push(req.body.songs[song])
                }else if(!await vaildSongAvailable(req.body.songs[song])){
                    songIdErrorArray.push(req.body.songs[song])
                }
            }
            const AfterChange = await updatePlaylist(Playlist)
            if (existsArray.length !== 0 || songIdErrorArray !== 0){
                return res.status(400).send('These songs are already in the playlist: ['+ existsArray.toString()+ "]. These songs ID are wrong: [" + songIdErrorArray + "]. The remaining ones have been successfully added. The current playlist has [" + Playlist.songs +"].")
            }
            if (AfterChange !== null) return res.status(HTTP_OK).header('Location', `/api/Playlist/${AfterChange._id}`).json(await retrievePlaylistById(AfterChange._id));
            return res.sendStatus(HTTP_NOT_FOUND);
        }
        res.setHeader('WWW-Authenticate' , 'Basic realm="Authorization Required"');
        return res.status(401).send('Authorization Required');
    }catch (e) {

    }

});
router.post('/Deletesong', auth,async (req, res) => {
    let Playlist = await retrievePlaylistById_NoSongInfo(new ObjectId(req.body._id))
    if (new ObjectId(user_id).equals(Playlist.owner)){
        for (let song in req.body.songs){
            const index = Playlist.songs.indexOf(req.body.songs[song]);
            if (index !== -1) {
                Playlist.songs.splice(index, 1);
            }
        }
        const AfterChange = await updatePlaylist(Playlist)
        if (AfterChange !== null) return res.status(HTTP_OK).header('Location', `/api/Playlist/${AfterChange._id}`).json(await retrievePlaylistById(AfterChange._id));

        return res.sendStatus(HTTP_NOT_FOUND);
    }
    res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
    return res.status(401).send('Authorization Required');
});
router.post('/ChangePlaylistInfo', auth,async (req, res) => {
    let Playlist = await retrievePlaylistById_NoSongInfo(new ObjectId(req.body._id))
    if (new ObjectId(user_id).equals(Playlist.owner)){
        Playlist.name = req.body.name;
        Playlist.private = req.body.private;
        const AfterChange = await updatePlaylist(Playlist)
        if (AfterChange !== null) return res.status(HTTP_OK).header('Location', `/api/Playlist/${AfterChange._id}`).json(await retrievePlaylistById(AfterChange._id));

        return res.sendStatus(HTTP_NOT_FOUND);
    }
    res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
    return res.status(401).send('Authorization Required');
});
export default router;
