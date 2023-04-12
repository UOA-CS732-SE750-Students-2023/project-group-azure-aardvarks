import express from "express";
import {Paginator, returnMsg} from '../../utils/commonUtils.js'
import { check, validationResult } from 'express-validator/check';
import { Comments,} from "../../Database/Schemas/commentSchema.js";
import {postComment, getCommentByUserId, replyComment} from "../../Database/commentDao.js";

const router = express.Router()




/**
 *  Add a new Comment for a song
 *  @route POST /comment/new
 *  @param useId string,  require
 *  @param songId string,  require
 *  @param commentId string,  require
 */
router.post('/new', [ [
    check('userId', "'userId' field is required").notEmpty(),
    check('songId', "'songId' field is required").notEmpty(),
    check('comment', "'comment' field is required").notEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.send(
            returnMsg(0,400,errors.array())
        )
    }
    await postComment(req.body)
    return res.send(returnMsg(1,200,"Add a comment successfully"))
})



/**
 * Get all comments by a UserId
 * @route GET /comment/user/:userId
 * @param pageNum
 * @param pageSize
 */
router.get('/user/:userId', async(req, res)=>{
    const {userId} = req.params;
    const {pageNum=1, pageSize=20} =req.query
    // const c =  await getCommentByUserId(userId);
    const commentDb = Comments.findOne({userId: userId})
    const data = await Paginator(pageSize,pageNum,commentDb)
    return res.send(returnMsg(1,200,data))

})

/**
 * Get all comment by a commentId
 * @route /comment/all
 * @param pageNum
 * @param pageSize
 */
router.get('/all', async (req, res)=>{
    const {pageNum=1, pageSize=20} =req.query
    const commentDb =  Comments.find()
    const data = await Paginator(pageSize,pageNum,commentDb)
    return res.send(returnMsg(1,200,data))
})

export default router;