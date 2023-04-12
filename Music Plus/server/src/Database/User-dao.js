
import { User, playList } from './schema';


async function createUser(user) {

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

async function retrieveUsersList() {
    return await User.find();
}
async function retrieveUser(username) {
    return await User.find({username: username});
}
async function retrieveUserById(id) {
    return await User.findById(id);
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

export {
    createUser,
    retrieveUserById,
    retrieveUsersList,
    retrieveUser,
    updateUser,
    deleteUser,
    vaildUser
}
