"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoAtlas = void 0;
const mongoose = require("mongoose");
const connectToMongoAtlas = (url) => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    mongoose
        .connect(url, connectionParams)
        .then(() => {
        console.log("Connected to database. ");
    })
        .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });
};
exports.connectToMongoAtlas = connectToMongoAtlas;
