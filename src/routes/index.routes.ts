import express from "express";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
    return res.redirect("/posts");
});

router.get("/logout", (req: any, res: any) => {
    req.logout();
    res.redirect("/posts");
});

export default router;
