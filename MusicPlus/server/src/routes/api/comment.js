import express from "express";
import {Paginator, PaginatorAsync, returnMsg} from '../../utils/commonUtils.js'

import {Comments, Replies} from "../../Database/Schemas/commentSchema.js";
import {getReplies, postComment} from "../../Database/commentDao.js";
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
router.post('/new', auth, async (req, res) => {
    try{


        const userId = req.user_id
        const data = {
            "userId":userId,
            "songId":req.body.songId,
            "comment":req.body.comment
        }
        await postComment(data)

        return res.send(returnMsg(1,200,"Add a comment successfully"))
    }
    catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }
})



/**
 * Get all comments by a UserId, and sorted by number of likes
 * @route GET /api/comment/user/:userId
 * @param pageNum
 * @param pageSize
 */
router.get('/user/:userId', async(req, res)=>{
    try{
        const {userId} = req.params;
        const {pageNum=1, pageSize=20} =req.query
        // const c =  await getCommentByUserId(userId);
        const commentDb = await Comments.find({userId: userId});
        commentDb.sort((a, b) => b.likes.length - a.likes.length) // sort the comment model by likes rank
        const data = await PaginatorAsync(pageSize, pageNum, commentDb, async (x)=>{
            for (let i=0; i<x.length; i++){
                x[i].likes = x[i].likes.length
                x[i].userId = {
                    "_id":x[i].userId._id,
                    "username":x[i].userId.username
                }
                const repliesDetails =  await getReplies(x[i]._id)
                const firstFiveRepliesDetails = Paginator(5, 1, repliesDetails,(x)=>{
                    for (let i=0; i<x.length;i++){
                        x[i].commentId.likes = x[i].commentId.likes.length
                    }
                })
                x[i].replies.push(firstFiveRepliesDetails)
            }

        })
        return res.send(returnMsg(1,200,data))
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }


})

/**
 * Get all comment with first 5 replies details by a commentId, and sorted by number of likes.
 * @route /api/comment/all
 * @param pageNum
 * @param pageSize
 */
router.get('/all', async (req, res)=>{
    try{
        const {pageNum=1, pageSize=20} =req.query
        const commentDb = await Comments.find({type:"comment"}).populate('userId')

        commentDb.sort((a, b) => b.likes.length - a.likes.length) // sort the comment model by likes rank
        const data = await PaginatorAsync(pageSize, pageNum, commentDb, async (x)=>{
            for (let i=0; i<x.length; i++){
                x[i].likes = x[i].likes.length
                x[i].userId = {
                    "_id":x[i].userId._id,
                    "username":x[i].userId.username
                };
                const repliesDetails =  await getReplies(x[i]._id)
                const firstFiveRepliesDetails = Paginator(5, 1, repliesDetails,(x)=>{
                    for (let i=0; i<x.length;i++){
                        x[i].commentId.likes = x[i].commentId.likes.length
                    }
                })
                x[i].replies.push(firstFiveRepliesDetails)
            }
        })
        return res.send(returnMsg(1,200,data))
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }

})


/**
 * Delete a comment by a commentId
 * @route DELETE /api/comment/delete/:commentId
 * @Login required
 */
router.delete('/delete/:commentId',auth,async (req, res)=>{
    try{
        const {commentId} = req.params
        const userId = req.user_id
        if (commentId){
            await Comments.find({userId: userId}).deleteOne({_id:commentId})
            return res.send(returnMsg(1,200,`delete ${commentId} successfully`))
        }
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }

})

/**
 * Edit a comment by a commentId
 * @route Edit /api/comment/edit/:commentId
 * @Login required
 * @param newComment
 */
router.put('/edit/:commentId', [auth], async (req, res)=>{
    try{
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
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }

})

/**
 * Like and Dislike comment by a commentId
 * @route PUT /api/comment/like/:commentId
 * @Login required
 */
router.put('/like/:commentId', auth, async (req, res)=>{
    try{
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
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }

})

/**
 * @param toUserId required, which user your want to reply.
 * @param comment required,reply message
 */
router.post('/reply/:parentCommentId', [auth], async (req, res)=>{
    try{

        if (req.body.comment === ''){
            return res.send(returnMsg(0,500,"Your comment cannot be empty"))
        }

        const userId = req.user_id
        const {parentCommentId} = req.params
        const parentCommentObject = await Comments.findById(parentCommentId)
        if (parentCommentObject.type !== "comment"){
            return res.send(returnMsg(0,500,"Your are selecting a 'reply' type comment, which is invalid"))
        }

        const replyCommentObject = new Comments({
            "type":"reply",
            "comment":req.body.comment
        })

        const replyObject = new Replies({
            "fromUserId":userId,
            "toUserId":req.body.toUserId,
            "commentId":replyCommentObject,
            "parentCommentId":parentCommentObject
        })

        await replyCommentObject.save()
        await replyObject.save()

        return res.send(returnMsg(1,200,`Add a reply successfully`))
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }

})


/**
 *  Click a Comment, then go into the replies chat
 *  @route /api/comment/click/:parentCommentId  # note enter a 'comment' type in :parentCommentId
 *  @param pageNum
 *  @param pageSize
 */
router.get('/click/:parentCommentId', async (req, res)=>{
    try{
        const {pageNum=1, pageSize=20} =req.query
        const {parentCommentId} = req.params
        const parentCommentObject = await Comments.findById(parentCommentId);
        if (parentCommentObject.type !== "comment"){
            return res.send(returnMsg(0,500,"Your are selecting a 'reply' type comment, which is invalid"))
        }
        const commentDetail = await getReplies(parentCommentId);
        const data = Paginator(pageSize,pageNum,commentDetail, (x)=>{
            for (let i=0; i<x.length;i++){
                x[i].commentId.likes = x[i].commentId.likes.length
            }
        })
        return res.send(returnMsg(1,200,data))
    }catch (e) {
        console.log(e);return res.status(501).json(returnMsg(0, 501,e));
    }

})

export default router;
