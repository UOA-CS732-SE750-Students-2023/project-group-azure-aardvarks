import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 *
 *
 */
const commentSchema = new Schema({
    userId:{type:Schema.Types.ObjectId, ref:'User', require:true},
    songId:{type:String},
    comment:{type:String, require: true},
    likes:{type:Number, default:0},
    publishTime:{type:Date, default:Date.now},
    lastEditTime:{type:Date, default:Date.now},
});

export const Comments = mongoose.model('comment', commentSchema);