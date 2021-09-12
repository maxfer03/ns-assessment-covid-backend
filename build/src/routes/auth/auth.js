"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../../models/user"));
const hash_1 = require("../../utils/hash");
const jwtUtils_1 = require("../../utils/jwtUtils");
const auth = (0, express_1.Router)();
auth.get("/", (req, res) => {
    return res.send("auth path");
});
auth.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const results = yield user_1.default.findOne({ username: user.username });
        console.log(results);
        if (results) {
            const valid = yield (0, hash_1.validatePw)(user.password, results.password);
            if (valid) {
                //here goes the jwt
                const session = (0, jwtUtils_1.encodeSession)(jwtUtils_1.secretEnv, {
                    username: user.username,
                    dateCreated: Date.now(),
                });
                return res.json({
                    msg: `${user.username} logged in.`,
                    token: session,
                });
            }
            else {
                return res.status(400).send("ERROR. Invalid password");
            }
        }
        return res.status(404).send("ERROR. User not found");
    }
    catch (e) {
        console.log(e);
        return res.status(400).send(e);
    }
}));
auth.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    if (!user.password || !user.username) {
        return res.status(400).send("ERROR: Invalid user.");
    }
    else {
        try {
            const { username, password } = user;
            const hashedPw = yield (0, hash_1.hashPw)(password);
            const newUser = new user_1.default({ username, password: hashedPw });
            yield newUser.save();
            //here goes the jwt
            const session = (0, jwtUtils_1.encodeSession)(jwtUtils_1.secretEnv, {
                username: user.username,
                dateCreated: Date.now(),
            });
            return res.json({
                msg: `${username} logged in.`,
                token: session,
            });
        }
        catch (e) {
            console.log(e);
            return res.status(400).send(e);
        }
    }
}));
exports.default = auth;
