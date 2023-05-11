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
    vaildUser, retrieveUserByIdWithPass
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

        return res.status(422).json(returnMsg(0, 422, "Error"));
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }

});
router.get('/logIn',auth, async (req, res) => { //登录
    try{
        const user = await retrieveUserById(req.user_id);
        return res.header('Location', `/api/user/logIn/${user._id}`)
            .json(returnMsg(1,HTTP_OK, user));
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }

});
router.put('/updateUserInfo', auth, async (req,res) => { //更改个人信息，用户只能更改自己的信息
    try{
        const vaild = await retrieveUserById(req.user_id)
        if (!new ObjectId(req.user_id).equals(req.body._id) && req.body.password !== vaild.password && req.body.username !== vaild.username){
            res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
            res.status(401).json(returnMsg(0, 401, 'Authorization Required'));
            return res
        }
        const User = await updateUser(req.body);
        if (User !== null) return res.status(HTTP_OK)
            .header('Location', `/api/user/logIn/${User._id}`)
            .json(returnMsg(1, HTTP_OK, await retrieveUserById(User._id)));

        return res.status(HTTP_NOT_FOUND).json(returnMsg(0, HTTP_NOT_FOUND));
    }catch (e){
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }

})


router.get('/validUsername/:username',  async (req,res) => { //检查username是否可用
    try{
        const { username } = req.params;
        const user = await retrieveUser(username);
        console.log(user)
        return res.status(HTTP_OK).json(returnMsg(1, HTTP_OK, user.length === 0))
    }catch (e){
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
})
router.put('/changePassword',  auth,async (req,res) => { //修改密码
    try{
        if (!new ObjectId(req.user_id).equals(req.body._id)){
            res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
            res.status(401).json(returnMsg(0, 401, 'Authorization Required'));
            return res
        }
        const User = await retrieveUserByIdWithPass(req.body._id);
        console.log(User)
        if (User.password !== req.body.oldPassword){
            res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
            res.status(401).json(returnMsg(0, 401, 'Wrong password'));
            return res
        }
        User.password = req.body.newPassword
        const user = updateUser(User)
        if (user !== null) return res.status(HTTP_OK)
            .header('Location', `/api/user/logIn/${User._id}`)
            .json(returnMsg(1, HTTP_OK, await retrieveUserById(User._id)));

        return res.status(HTTP_NOT_FOUND).json(returnMsg(0, HTTP_NOT_FOUND));
    }catch (e){
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
})

export default router;
