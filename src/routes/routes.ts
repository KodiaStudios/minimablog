import { Router } from "express";

import indexRouter from "./index.routes";
import postRouter from "./post.routes";
import passportRouter from "./passport.routes";

const router = Router();

router.use("/", indexRouter);
router.use("/posts", postRouter);
router.use("/auth", passportRouter);

export default router;
