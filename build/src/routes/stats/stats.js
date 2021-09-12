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
const axios_1 = require("../../utils/axios");
const stats_1 = __importDefault(require("../../models/stats"));
const sort_1 = require("../../utils/sort");
const stats = (0, express_1.Router)();
stats.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbInfo = yield stats_1.default.find();
        let sortedByContinent = dbInfo.sort(sort_1.compareContinent);
        return res.json(sortedByContinent);
    }
    catch (e) {
        console.log(e);
        return res.status(400).send("ERROR!");
    }
}));
stats.get("/name/:country", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { country } = req.params;
    country = country.toLowerCase();
    const detail = yield stats_1.default.findOne({ country });
    return res.json(detail);
}));
stats.post("/edit/:country", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { country } = req.params;
    const newInfo = req.body;
    country = country.toLowerCase();
    yield stats_1.default.findOneAndUpdate({ country }, newInfo);
    console.log(`${country} updated succesfully`);
    return res.json({
        country,
        newInfo,
    });
}));
stats.get("/sync", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield stats_1.default.deleteMany({});
    const covidSyncedStats = yield (0, axios_1.requestCovidStats)();
    for (let country of covidSyncedStats.response) {
        try {
            country.country = country.country.toLowerCase();
            const DBsyncedStats = new stats_1.default(country);
            yield DBsyncedStats.save();
            console.log("Country successfully added: ", country.country);
        }
        catch (e) {
            console.log(e);
            return res.status(400).send("ERROR!");
        }
    }
    return res.send("Stats sinced successfully.");
}));
exports.default = stats;
