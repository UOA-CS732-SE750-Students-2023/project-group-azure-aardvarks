import mongoose from 'mongoose';


const Schema = mongoose.Schema;



const commentSchema = new Schema({
    userId:{type:Schema.Types.ObjectId, ref:'User', require:true},
    type:{
        type:String,
        enum:['reply', 'comment'], // identify a reply or a comment type
        default:"comment"
    },
    songId:{type:String},
    likes:{type:Array, default:[]},
    comment:{type:String, require: true},
    publishTime:{type:Date, default:Date.now},
    lastEditTime:{type:Date, default:Date.now},
    replies:[]
})


const replySchema = new Schema({
    fromUserId:{type:Schema.Types.ObjectId, ref:'User', require:true},
    toUserId:{type:Schema.Types.ObjectId, ref:'User', require:true},
    commentId:{type:Schema.Types.ObjectId, ref:'comment', require:true},
    parentCommentId:{type:Schema.Types.ObjectId, ref:'comment', require:true},
})

export const Comments = mongoose.model('comment', commentSchema);
export const Replies =  mongoose.model('reply', replySchema);

