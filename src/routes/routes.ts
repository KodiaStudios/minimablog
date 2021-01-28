import { Router } from "express";

import indexRouter from "./index.routes";
import postRouter from "./post.routes";
import passportRouter from "./passport.routes";
import adminRouter from "./admin.routes";

const router = Router();

router.use("/", indexRouter);
router.use("/posts", postRouter);
router.use("/auth", passportRouter);
router.use("/admin", adminRouter);

export default router;
