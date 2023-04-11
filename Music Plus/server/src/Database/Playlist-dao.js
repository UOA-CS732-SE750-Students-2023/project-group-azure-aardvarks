import { Playlist } from './schema';

async function createPlaylist(user) {

    const dbPlaylist = new Playlist(user);
    await dbPlaylist.save();
    return dbPlaylist;
}

async function retrievePlaylistsList() {
    let lists = await Playlist.find();
    return await GetSongInfo(lists);
}
async function retrievePlaylistsList_public() {
    let lists = await Playlist.find({private : false});
    return await GetSongInfo(lists);
}
async function retrievePlaylist(name) {
    const regex = new RegExp(name, 'i');
    let lists = await Playlist.find({$and:[{name: { $regex: regex }}, {private : false}]});
    return await GetSongInfo(lists);
}
async function retrievePlaylistById(id) {
    let lists = await Playlist.find({_id:id});
    return await GetSongInfo(lists);
}
async function retrievePlaylistById_NoSongInfo(id) {

    return await Playlist.findById(id);
}
async function retrievePlaylistByOwnerId(id) {
    let lists = await Playlist.find({owner:id});
    return await GetSongInfo(lists);
}
async function updatePlaylist(playlist) {

    const dbPlaylist = await Playlist.findOneAndUpdate({ _id: playlist._id }, playlist);
    return dbPlaylist;
}

async function deletePlaylist(id) {
    await Playlist.deleteOne({ _id: id });
}

async function GetSongInfo(playlists){
    let result=[]
    for (let playlist in playlists){
        let songs = {};
        for (let song in playlists[playlist].songs){
            const response = await fetch('http://127.0.0.1:4000/song/detail?ids='+playlists[playlist].songs[song]);
            const data = await response.json();
            let singer1 = ""
            for (let ar in data.songs[0].ar){
                singer1 += data.songs[0].ar[ar].name + " /"
            }
            singer1 = singer1.slice(0, -2);
            songs[playlists[playlist].songs[song]] = {name: data.songs[0].name, singer:singer1}
        }
        let playlist1 = {_id: playlists[playlist]._id, name: playlists[playlist].name, private: playlists[playlist].private, songs:songs, owner: playlists[playlist].owner, notes: playlists[playlist].notes}
        result.push(playlist1)
    }
    return result
}

export {
    createPlaylist,
    retrievePlaylistById,
    retrievePlaylistsList,
    retrievePlaylist,
    updatePlaylist,
    deletePlaylist,
    retrievePlaylistByOwnerId,
    retrievePlaylistsList_public,retrievePlaylistById_NoSongInfo
}
