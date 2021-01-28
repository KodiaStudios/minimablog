import express from "express";

const router = express.Router();
import Post from "../models/Post";
router.get("/", async (req: any, res: any) => {
    console.log(req.user);
    return res.render("index", {title: "yoooo", message: "hhaaaa"});
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

export default router;
