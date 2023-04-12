import {Comments, Replies} from "./Schemas/commentSchema.js";
import mongoose from "mongoose";

async function postComment(comment){
    const c = new Comments(comment);
    await c.save();
    return c
}

async function getReplies(commentId){
    const commentDetail = await Replies.find({parentCommentId:commentId}).populate('toUserId').populate('fromUserId').populate('commentId')
    return commentDetail
}


export {
    postComment,
    getReplies,
}