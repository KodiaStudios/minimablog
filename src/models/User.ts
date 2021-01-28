import mongoose, {Schema} from "mongoose";

export default mongoose.model("User", new Schema({
    githubId: Number,
    displayName: String,
    githubUsername: String,
    blogger: {
        type: Boolean,
        default: false,
        required: true
    }
}));
