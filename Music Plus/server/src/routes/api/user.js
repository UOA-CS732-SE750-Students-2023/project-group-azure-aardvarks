import express from 'express';
import {
    createUser,
    retrieveUsersList,
    retrieveUser,
    updateUser,
    deleteUser,
    VaildUser
} from "../../Database/User-dao.js";
import basicAuth from "basic-auth";

const router = express.Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const auth = (req, res, next) => {
    const credentials = basicAuth(req);
    if (!credentials || !VaildUser(credentials.name,credentials.pass ) ) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
        res.status(401).send('Authorization Required');
        return;
    }
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
router.post('/login',auth, (req, res, next) => {
    res.send('Success!');
});


export default router;
