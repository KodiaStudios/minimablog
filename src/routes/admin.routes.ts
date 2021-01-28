import express from "express";
import { Validator } from "node-input-validator";
import Post from "../models/Post";

const router = express.Router();

router.use((req: any, res: any, next: any) => {
    if (!req.user) {
        return res.render("pages/404");
    }
    return next();
});

router.get("/", async (req: any, res: any) => {
    console.log(req.user);
    let posts: any = [];
    try {
        posts = await Post.find({});
    } catch (err) {
        console.log(err);
        posts = [];
    }
    return res.render("pages/admin/index", {user: req.user, posts});
});

router.get("/edit", async (req: any, res: any) => {
    found = false;
    let post: any = null;
    try {
        if (req.query.id)
            post = await Post.findOne({_id: req.query.id});
        if (post) found = true;
    } catch (err) {
        console.log(err);
        found = false;
    }
    return res.render("pages/admin/edit", {valid: found, user: req.user, post});
});

router.post("/edit", async (req: any, res: any) => {
    const reqs = {
        title: "required|string|minLength:1|maxLength:64",
        body: "required|string",
        thumbnail_url: "required|string",
        thumbnail_alt: "required|string"
    };
    const val = new Validator(req.body, reqs);
    let post: any = null;
    try {
        if (req.query.id) post = await Post.findOne({_id: req.query.id});
    } catch (err) {
        console.log(err);
    }
    if (!await val.check()) {
        return res.render("pages/admin/edit", {user: req.user, error: val.errors});
    }
    try {
        if (!post) {
            post = new Post();
            post.author = req.user._id;
        }
        post.title = req.body.title;
        post.body = req.body.body.replace("\n", "\\n");
        post.thumbnail = {url: req.body.thumbnail_url, alt: req.body.thumbnail_alt};
        await post.save();
    } catch (err) {
        console.log(err);
        return res.render("pages/admin/edit", {user: req.user, post: req.body, error: err});
    }
    return res.redirect("/admin");
});


export default router;
