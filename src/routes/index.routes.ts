import express from "express";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
    console.log(req.user);
    return res.render("index", {title: "yoooo", message: "hhaaaa"});
});

router.get("/logout", (req: any, res: any) => {
    req.logout();
    res.redirect("/");
});

export default router;
