
import { User, playList } from './Schemas/Schema.js';


async function createUser(user) {
    let check = await retrieveUser(user.username)
    if (check.length === 0){
        const dbUser = new User(user);
        const favoriteMusic = new playList({
            name : dbUser.username + "Love",
            private : true,
            owner : dbUser._id
        })
        dbUser.favoriteMusic = favoriteMusic._id
        await dbUser.save();
        await favoriteMusic.save()
        return dbUser;
    }
    else {
        return {"Error": "Username unavailable!"}
    }
}

async function retrieveUsersList() {
    const user = await User.find()
    return user.map(user => ({address: user.address, dateOfBirth: user.dateOfBirth, email: user.email, favoriteMusic: user.favoriteMusic, firstName: user.firstName, lastName:user.lastName, favoritePlayList: user.favoritePlayList, username: user.username, _id:user._id}));
}
async function retrieveUser(username) {
    const user = await User.find({username: username})
    return user
    //return user.map(user => ({address: user.address, dateOfBirth: user.dateOfBirth, email: user.email, favoriteMusic: user.favoriteMusic, firstName: user.firstName, lastName:user.lastName, favoritePlayList: user.favoritePlayList, username: user.username, _id:user._id}));
}
async function retrieveUserById(id) {
    const user = await User.findById(id)
    return user
    //return {address: user.address, dateOfBirth: user.dateOfBirth, email: user.email, favoriteMusic: user.favoriteMusic, firstName: user.firstName, lastName:user.lastName, favoritePlayList: user.favoritePlayList, username: user.username, _id:user._id};
}
async function retrieveUserByIdWithPass(id) {
    const user = await User.findById(id)
    return user
}
async function vaildUser(credentials) {
    if (credentials){
        let username = credentials.name;
        let password = credentials.pass;
        const user = await User.find({username: username});
        if (user[0] == null){
            return false
        }
        if (user[0].username !== username){
            return false;
        }
        if (user[0].password === password){
            return user;
        }
        return false;
    }
    return false
}
async function updateUser(user) {

    const dbUser = await User.findOneAndUpdate({ _id: user._id }, user);
    return dbUser;
}

async function deleteUser(id) {
    await User.deleteOne({ _id: id });
}
/**
 * return the basic profile of a user
 * @param id user id
 * @returns
 * {
 *      "_id": "64366fc18a753d1f42b35d3b",
 *      username": "2797146538",
 *      "email": "2797146538@qq.com",
 *       favoritePlayList": [],
 *      "musicGenre": [],
 * }
 */
async function retrieveUserBaseProfile(id){
    const user = await retrieveUserById(id)
    return {
        '_id' : user._id,
        'username':user.username,
        'email':user.email,
        "favoritePlayList": user.favoritePlayList,
        "musicGenre": user.musicGenre,
    }
}
export {
    createUser,
    retrieveUserById,
    retrieveUsersList,
    retrieveUser,
    updateUser,
    deleteUser,
    vaildUser,
    retrieveUserByIdWithPass,
    retrieveUserBaseProfile
}
