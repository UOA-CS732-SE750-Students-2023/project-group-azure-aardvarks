import { Comments } from "./Schemas/commentSchema.js";
import mongoose from "mongoose";

async function postComment(comment){
    const c = new Comments(comment);
    await c.save();
    return c
}

async function replyComment(commentId, comment){
    try{
        // create a new Comment
        const newComment = await postComment(comment)
        // assign this comment to the replies field
        const c = await getCommentByCommentId(commentId)
        await Comments.findOneAndUpdate({_id: c._id}, {$push: {'repliesId': newComment._id}})

    }catch (e) {
        return e
    }

}

async function getCommentByCommentId(commentId){
    try{
        const c = await Comments.findById(commentId)
        return c
    }catch (e) {
        return e
    }

}

async function getCommentByUserId(userId){
    try{
        const c = await Comments.find({userId:userId})
        return c;
    }catch (e){
        return e
    }
}


export {
    postComment,
    replyComment,
    getCommentByUserId
}