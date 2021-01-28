import express from "express";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
    return res.render("index", {title: "yoooo", message: "hhaaaa"});
});

router.get("/:test", async (req: any, res: any) => {
    return res.render("index", {title: "yoooo", message: req.params.test});
});

export default router;
