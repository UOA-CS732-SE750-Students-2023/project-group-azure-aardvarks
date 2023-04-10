import { User } from './schema';

async function createUser(user) {

    const dbUser = new User(user);
    await dbUser.save();
    return dbUser;
}

async function retrieveUsersList() {
    return await User.find();
}

async function retrieveUser(id) {
    return await User.findById(id);
}
async function VaildUser(username, password) {
    const user = await User.find({username: username});
    console.log(user[0].password === password)
    if (user[0] == null){
        return false
    }
    if (user[0].password === password){
        return true;
    }
    return false;
}
async function updateUser(user) {

    const dbUser = await User.findOneAndUpdate({ _id: user._id }, user);
    return dbUser !== undefined;
}

async function deleteUser(id) {
    await User.deleteOne({ _id: id });
}

export {
    createUser,
    retrieveUsersList,
    retrieveUser,
    updateUser,
    deleteUser,
    VaildUser
}
