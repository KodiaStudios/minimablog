import cors from "cors";
import express from "express";
import createError from "http-errors";
import mongoose from "mongoose";
import logger from "morgan";
import path from "path";

import config from "./config";
import router from "./routes/routes";

const app = express();
const PORT = process.env.port || 3000;

app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

const dbUrl = `mongodb://${config.db.user}:${config.db.password}@${config.db.host}/${config.db.database}`;

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

app.use(router);

// catch 404 and forward to error handler
app.use((req: any, res: any, next: any) => {
    next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    console.log(req.originalUrl);
    res.json({
        errorCode: 1337,
        errorMsg: "Invalid endpoint"
    });
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
});

