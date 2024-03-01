import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "content is required"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    publication:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    }
})

export default mongoose.model('Comment', commentSchema)