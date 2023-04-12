import { playList } from './Schemas/Schema.js';
import * as dotenv from 'dotenv';
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
    let lists = await playList.find({_id:id});
    return await getSongInfo(lists);
}
async function retrievePlayListByIdNoSongInfo(id) {

    return await playList.findById(id);
}
async function retrievePlayListByOwnerId(id) {
    let lists = await playList.find({owner:id});
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
                let singer1 = ""
                if (!data.songs[0]){
                    throw "Song ID Error!"
                }
                for (let ar in data.songs[0].ar){
                    singer1 += data.songs[0].ar[ar].name + " /"
                }
                singer1 = singer1.slice(0, -2);
                songs[playLists[playList].songs[song]] = {name: data.songs[0].name, singer:singer1}
            } catch (error){
                songs[playLists[playList].songs[song]] = {error: error}
                console.log(error)
            }

        }
        let playList1 = {_id: playLists[playList]._id, name: playLists[playList].name, private: playLists[playList].private, songs:songs, owner: playLists[playList].owner, notes: playLists[playList].notes}
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
    retrievePlayListsListPublic,retrievePlayListByIdNoSongInfo
}
