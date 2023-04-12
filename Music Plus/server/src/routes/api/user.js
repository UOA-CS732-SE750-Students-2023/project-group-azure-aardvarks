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
    vaildUser
} from "../../Database/User-dao.js";
import basicAuth from "basic-auth";
import {returnMsg} from "../../utils/commonUtils.js";
import {auth} from "../../middleware/auth.js";

const router = express.Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

router.post('/newUser', async (req, res) => { //创建user
    try {
        const newUser = await createUser(req.body);

        if (newUser) return res.status(HTTP_CREATED)
            .header('Location', `/api/user/logIn/${newUser._id}`)
            .json(returnMsg(1, HTTP_OK, newUser));

        return res.sendStatus(422).json(returnMsg(0, 422, "Error"));
    }catch (e) {
        console.log(e)
    }

});
router.post('/logIn',auth, async (req, res) => { //登录
    try{
        const user = await retrieveUserById(req.user_id);
        return res.header('Location', `/api/user/logIn/${user._id}`)
            .json(returnMsg(1,HTTP_OK, user));
    }catch (e) {
        console.log(e)
    }

});
router.post('/updateUserInfo', auth, async (req,res) => { //更改个人信息，用户只能更改自己的信息
    try{
        if (!new ObjectId(req.user_id).equals(req.body._id)){
            res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
            res.status(401).json(returnMsg(0, 401, 'Authorization Required'));
            return res
        }
        const User = await updateUser(req.body);
        if (User !== null) return res.status(HTTP_OK)
            .header('Location', `/api/user/logIn/${User._id}`)
            .json(returnMsg(1, HTTP_OK, await retrieveUserById(User._id)));

        return res.sendStatus(HTTP_NOT_FOUND).json(returnMsg(0, HTTP_NOT_FOUND));
    }catch (e){
        console.log(e)
    }

})

export default router;
