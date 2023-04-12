import express from "express";
import {Paginator, returnMsg} from '../../utils/commonUtils.js'
import { check, validationResult } from 'express-validator/check';
import { Comments,} from "../../Database/Schemas/commentSchema.js";
import {postComment, getCommentByUserId, replyComment} from "../../Database/commentDao.js";
import {auth} from "../../middleware/auth.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
const router = express.Router()




/**
 *  Add a new Comment for a song
 *  @route POST /api/comment/new
 *  @Login required
 *  @param songId string,  require
 *  @param commentId string,  require
 */
router.post('/new', [auth, [
    check('songId', "'songId' field is required").notEmpty(),
    check('comment', "'comment' field is required").notEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.send(
            returnMsg(0,400,errors.array())
        )
    }
    const userId = req.user_id
    const data = {
        "userId" : userId,
        "songId":req.body.songId,
        "comment":req.body.comment
    }
    await postComment(data)
    return res.send(returnMsg(1,200,"Add a comment successfully"))
})



/**
 * Get all comments by a UserId, and sorted by number of likes
 * @route GET /api/comment/user/:userId
 * @param pageNum
 * @param pageSize
 */
router.get('/user/:userId', async(req, res)=>{
    const {userId} = req.params;
    const {pageNum=1, pageSize=20} =req.query
    // const c =  await getCommentByUserId(userId);
    const commentDb = await Comments.find({userId: userId});
    commentDb.sort((a, b) => b.likes.length - a.likes.length) // sort the comment model by likes rank
    const data = Paginator(pageSize, pageNum, commentDb, (x)=>{
        for (let i=0; i<x.length; i++){
            x[i].likes = x[i].likes.length
        }
        // return x.sort((a, b) => b.likes - a.likes);
    })
    return res.send(returnMsg(1,200,data))

})

/**
 * Get all comment by a commentId, and sorted by number of likes
 * @route /api/comment/all
 * @param pageNum
 * @param pageSize
 */
router.get('/all', async (req, res)=>{
    const {pageNum=1, pageSize=20} =req.query
    const commentDb = await Comments.find();
    commentDb.sort((a, b) => b.likes.length - a.likes.length) // sort the comment model by likes rank
    const data = Paginator(pageSize, pageNum, commentDb, (x)=>{
        for (let i=0; i<x.length; i++){
            x[i].likes = x[i].likes.length
        }
        // return x.sort((a, b) => b.likes - a.likes);
    })
    return res.send(returnMsg(1,200,data))
})


/**
 * Delete a comment by a commentId
 * @route DELETE /api/comment/delete/:commentId
 * @Login required
 */
router.delete('/delete/:commentId',auth,async (req, res)=>{
    const {commentId} = req.params
    const userId = req.user_id
    if (commentId){
        await Comments.find({userId: userId}).deleteOne({_id:commentId})
        return res.send(returnMsg(1,200,`delete ${commentId} successfully`))
    }
})

/**
 * Edit a comment by a commentId
 * @route DELETE /api/comment/edit/:commentId
 * @Login required
 * @param newComment
 */
router.put('/edit/:commentId', [auth, [check("newComment", "'newComment field' is required").notEmpty()]], async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.send(
            returnMsg(0,400,errors.array())
        )
    }
    const {commentId} = req.params
    const userId = req.user_id
    const newComment = req.body.newComment
    if (newComment === "" || newComment === undefined){
        return res.send(returnMsg(0,500,`Your new message can not be empty`))
    }
    else{
        // Edit Comment and update edit time
        await Comments.find({userId: userId}).findOneAndUpdate({_id:commentId}, {comment:newComment, lastEditTime:Date.now()})
        return res.send(returnMsg(1,200,`Edit ${commentId} successfully`))
    }
})

/**
 * Like and Dislike comment by a commentId
 * @route PUT /api/comment/like/:commentId
 * @Login required
 */
router.put('/like/:commentId', auth, async (req, res)=>{
    const {commentId} = req.params
    const userId = req.user_id
    const commentObject = await Comments.findById(commentId);
    let likeStatus = false
    for(let i = 0; i<commentObject.likes.length; i++){
        if (commentObject.likes[i].toString() === userId.toString()){
            likeStatus =true
        }
    }
    if (likeStatus){
        await Comments.findOneAndUpdate({_id:commentId }, {$pull:{likes:userId}})
        return res.send(returnMsg(1,200,`Dislike ${commentId} successfully`))
    }else{
        await Comments.findOneAndUpdate({_id:commentId }, {$push:{likes:userId}})
        return res.send(returnMsg(1,200,`like ${commentId} successfully`))
    }

})


export default router;