import express from 'express';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;
import {
    createUser,
    retrieveUsersList,
    retrieveUserById,
    retrieveUser,
    updateUser,
    deleteUser,
    VaildUser
} from "../../Database/User-dao.js";
import basicAuth from "basic-auth";

const router = express.Router();
let user_id;
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const auth = async (req, res, next) => {
    const credentials = basicAuth(req);
    let Vailduser = await VaildUser(credentials.name, credentials.pass)
    if (!credentials || Vailduser === false) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
        res.status(401).send('Authorization Required');
        return;
    }
    user_id = Vailduser[0]._id
    next();
};
router.get('/', async (req, res) => {

    res.json("hello world");
});
router.post('/NewUser', async (req, res) => {
    const newUser = await createUser(req.body);

    if (newUser) return res.status(HTTP_CREATED)
        .header('Location', `/api/user/${newUser._id}`)
        .json(newUser);

    return res.sendStatus(422);
});
router.post('/login',auth, async (req, res) => {
    const user = await retrieveUserById(user_id);
    return res.header('Location', `/api/user/${user._id}`)
        .json(user);
});
router.post('/UpdateUserInfo', auth, async (req,res) => {
    if (!new ObjectId(user_id).equals(req.body._id)){
        res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
        return res.status(401).send('Authorization Required');
    }
    const User = await updateUser(req.body);
    if (User !== null) return res.status(HTTP_OK)
        .header('Location', `/api/user/${User._id}`)
        .json(User);

    return res.sendStatus(HTTP_NOT_FOUND);
})

export default router;
