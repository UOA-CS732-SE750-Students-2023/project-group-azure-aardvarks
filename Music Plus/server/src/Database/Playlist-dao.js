import { Playlist } from './schema';

async function createPlaylist(user) {

    const dbPlaylist = new Playlist(user);
    await dbPlaylist.save();
    return dbPlaylist;
}

async function retrievePlaylistsList() {
    return await Playlist.find();
}
async function retrievePlaylistsList_public() {
    return await Playlist.find({private : false});
}
async function retrievePlaylist(name) {
    const regex = new RegExp(name, 'i');
    return await Playlist.find({$and:[{name: { $regex: regex }}, {private : false}]});
}
async function retrievePlaylistById(id) {
    return await Playlist.findById(id);
}
async function retrievePlaylistByOwnerId(id) {
    return await Playlist.find({owner:id});
}
async function updatePlaylist(playlist) {

    const dbPlaylist = await Playlist.findOneAndUpdate({ _id: playlist._id }, playlist);
    return dbPlaylist;
}

async function deletePlaylist(id) {
    await Playlist.deleteOne({ _id: id });
}

export {
    createPlaylist,
    retrievePlaylistById,
    retrievePlaylistsList,
    retrievePlaylist,
    updatePlaylist,
    deletePlaylist,
    retrievePlaylistByOwnerId,
    retrievePlaylistsList_public
}
