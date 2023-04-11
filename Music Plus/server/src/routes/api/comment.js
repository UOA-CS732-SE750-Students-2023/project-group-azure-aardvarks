import express from "express";
import {returnMsg} from '../../utils/commonUtils.js'
import { check, validationResult } from 'express-validator/check';

const router = express.Router()
router.get('/', (req, res) => {
    console.log(123)
    return res.send(returnMsg(1, 200, "This is a common api"))
})

router.post('/comment', [
    check()
], (req, res) => {
    console.log(req.body)
    return res.sendStatus(200)
})

export default router;