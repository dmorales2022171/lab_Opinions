import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    content: {
        type: String,
        required: [true, "content is required"]
    },
    status: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Publication', publicationSchema);