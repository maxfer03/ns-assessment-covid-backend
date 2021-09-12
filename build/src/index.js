"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var morgan = require("morgan");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3001;
//configs
app.set("port", process.env.PORT || port);
//middlewares
app.use(express_1.default.json());
app.use(morgan("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use("/", routes_1.default);
app.get("/", (req, res) => {
    return res.json({
        msg: "NS Assessment Covid API",
        endpoints: {
            auth: {
                login: "/auth/login         -> log in a user",
                signup: "/auth/signup       -> register a user",
            },
            stats: {
                msg: "Paths protected",
                sync: "/stats/sync          -> syncs with external API",
                all: "/stats/all            -> gets all country stats",
                country: "/stats/name/:country    -> gets specific country stats",
                edit: "/stats/edit/:country       -> edit specific country stats",
            },
            users: "/users (protected)    -> get all users",
        },
    });
});
app.listen(app.get("port"), () => {
    console.log(`Server running on port ${app.get("port")}.`);
});
(0, db_1.connectToMongoAtlas)(process.env.DB_CONN_STRING);
