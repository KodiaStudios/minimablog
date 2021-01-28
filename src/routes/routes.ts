import { Router } from "express";

import indexRouter from "./index.routes";

const router = Router();

router.use("/", indexRouter);

export default router;
