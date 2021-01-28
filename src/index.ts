import cors from "cors";
import express from "express";
import createError from "http-errors";
import mongoose from "mongoose";
import logger from "morgan";
import path from "path";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import expressSession from "express-session";

import config from "./config";
import router from "./routes/routes";

import passport from "passport";
import passportSettings from "./passport";

const app = express();
const PORT = process.env.port || 3000;

app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(expressSession({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: Date.now() + (60  * 60 * 24 * 1000) }
}));

app.use(passport.initialize());
app.use(passport.session());

passportSettings(passport);

// Trust first proxy
app.set("trust proxy", 1);

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

