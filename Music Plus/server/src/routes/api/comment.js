import express from "express";
import {returnMsg} from '../../utils/commonUtils.js'
import { check, validationResult } from 'express-validator/check';

const router = express.Router()
router.get('/', (req, res) => {
    console.log(123)
    return res.send(returnMsg(1, 200, "This is a common api"))
})

router.post('/comment', [
    check('userId', "'userId' field is required").notEmpty(),
    check('songId', "'songId' field is required").notEmpty(),
    check('comment', "'comment' field is required").notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.send(
            returnMsg(0,400,errors.array())
        )
    }
    console.log(req.body)
    return res.sendStatus(200)
})

export default router;