import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    category:{
        type: String,
        required: [true, "category is required"]
    },
    content: {
        type: String,
        required: [true, "content is required"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Publication', publicationSchema);