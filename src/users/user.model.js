import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "user name is required"]
    },
    mail: {
        type: String,
        required: [true, "mail is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    role: {
        type: String,
        default: "USER_ROLE"
    },
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("User", userSchema);