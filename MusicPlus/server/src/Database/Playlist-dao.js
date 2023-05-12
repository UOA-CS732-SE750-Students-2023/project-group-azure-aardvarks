import { playList } from './Schemas/Schema.js';
import * as dotenv from 'dotenv';
import {formatDateTime} from "../utils/commonUtils.js";
dotenv.config();
async function createPlayList(user) {

    const dbPlayList = new playList(user);
    await dbPlayList.save();
    return dbPlayList;
}

async function retrievePlayListsList() {
    let lists = await playList.find();
    return await getSongInfo(lists);
}
async function retrievePlayListsListPublic() {
    let lists = await playList.find({private : false});
    return await getSongInfo(lists);
}
async function retrievePlayList(name) {
    const regex = new RegExp(name, 'i');
    let lists = await playList.find({$and:[{name: { $regex: regex }}, {private : false}]});
    return await getSongInfo(lists);
}
async function retrievePlayListById(id) {
    let list = await playList.findById(id).populate('owner');
    list.owner = {
        "_id": list.owner._id,
        "username": list.owner.username,
        "email": list.owner.email,
        "cover":list.owner.cover,
        "favoritePlayList": list.owner.favoritePlayList,
        "musicGenre": list.owner.musicGenre,
        "favoriteMusic": list.owner.favoriteMusic
    }
    const result = {
        "_id" : list.id,
        "name":list.name,
        "private":list.private,
        "songs":list.songs,
        "cover":list.cover,
        'description':list.description,
        "createAt":formatDateTime(list.createAt),
        "updatedAt":formatDateTime(list.updatedAt),
        "owner": list.owner
    }
    return result
}
async function retrievePlayListByIdNoSongInfo(id) {
    return await playList.findById(id);
}
async function retrievePlayListByOwnerId(id) {
    let lists = await playList.find({owner:id}).populate('owner');
    return await getSongInfo(lists);
}
async function retrievePlayListByOwnerIdPublicOnly(id) {
    let lists = await playList.find({owner:id, private:false}).populate('owner');
    return await getSongInfo(lists);
}
async function retrievePlayListByOwnerIdPrivateOnly(id) {
    let lists = await playList.find({owner:id, private:true}).populate('owner');
    return await getSongInfo(lists);
}
async function updatePlayList(playList1) {

    const dbPlayList = await playList.findOneAndUpdate({ _id: playList1._id }, playList1);
    return dbPlayList;
}

async function deletePlayList(id) {
    await playList.deleteOne({ _id: id });
}

async function getSongInfo(playLists){
    let result=[]
    for (let playList in playLists){
        let songs = {};
        for (let song in playLists[playList].songs){
            try{
                const response = await fetch(process.env.NeteaseCloudMusicApi+'/song/detail?ids='+playLists[playList].songs[song]);
                const data = await response.json();

                if (!data.songs[0]){
                    throw "Song ID Error!"
                }

                songs[playLists[playList].songs[song]] = {name: data.songs[0].name, singer:data.songs[0].ar.map(singer => ({name: singer.name, id: singer.id})), album: {name: data.songs[0].al.name, id: data.songs[0].al.id}, picUrl: data.songs[0].al.picUrl}
            } catch (error){
                songs[playLists[playList].songs[song]] = {error: error}
                console.log(error)
            }

        }
        let playList1 = {_id: playLists[playList]._id, name: playLists[playList].name, private: playLists[playList].private, songs:songs, owner: playLists[playList].owner, description: playLists[playList].description, cover: playLists[playList].cover}
        result.push(playList1)
    }
    return result
}



export {
    createPlayList,
    retrievePlayListById,
    retrievePlayListsList,
    retrievePlayList,
    updatePlayList,
    deletePlayList,
    retrievePlayListByOwnerId,
    retrievePlayListsListPublic,retrievePlayListByIdNoSongInfo,
    retrievePlayListByOwnerIdPublicOnly,
    retrievePlayListByOwnerIdPrivateOnly
}
