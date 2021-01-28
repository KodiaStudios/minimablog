import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/github", passport.authenticate("github"));

router.get("/github/callback",
passport.authenticate("github", { failureRedirect: "/login" }),
(req: any, res: any) => {
    // Successful authentication, redirect home.
    res.redirect("/");
});

export default router;
