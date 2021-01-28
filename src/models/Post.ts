import mongoose, {Schema} from "mongoose";

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    thumbnail: {
        url: String,
        alt: {
            type: String,
            default: "Blog Image"
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

PostSchema.path("thumbnail.url").validate((val: string) => {
    const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, "Invalid URL.");

export default mongoose.model("Post", PostSchema);
