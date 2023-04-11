import basicAuth from "basic-auth";
import {VaildUser} from "../Database/User-dao.js";

export async function auth(req, res, next){
    let user_id;
    const credentials = basicAuth(req);
    let Vailduser = await VaildUser(credentials)
    if (!credentials || Vailduser === false) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
        res.status(401).send('Authorization Required');
        return;
    }
    user_id = Vailduser[0]._id
    next();
}