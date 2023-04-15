import basicAuth from "basic-auth";
import {vaildUser} from "../Database/User-dao.js";

export async function auth(req, res, next){
    //身份验证
    const credentials = basicAuth(req);
    let Vailduser = await vaildUser(credentials)
    if (!credentials || Vailduser === false) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
        res.status(401).send('Authorization Required');
        return;
    }
    req.user_id = Vailduser[0]._id
    next();
}