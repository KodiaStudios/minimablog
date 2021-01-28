import {Strategy as GitHubStrategy} from "passport-github";

import config from "./config";

import User from "./models/User";

export default (passport: any) => {
    passport.use(new GitHubStrategy({
         clientID: config.github.client_id,
         clientSecret: config.github.client_secret,
         callbackURL: config.github.callback_url
    }, async (accessToken, refreshToken, profile, cb) => {
        User.findOneAndUpdate({githubId: profile.id}, {
            displayName: profile.displayName,
            githubUsername: profile.username
        }, {upsert: true, new: true, setDefaultsOnInsert: true}, async (err: any, user: any) => {
            return cb(err, user);
        });
    }));
    passport.serializeUser((user: any, done: any) => {
        done(null, user);
    });
    passport.deserializeUser((user: any, done: any) => {
        done(null, user);
    })
};
