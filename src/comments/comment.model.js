import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    author:{
        type: String,
        required: [true, "author is required"]
    },
    content: {
        type: String,
        required: [true, "content is required"]
    },

    publication:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model('Comment', commentSchema)