"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CountryStatSchema = new mongoose_1.Schema({
    continent: { type: String },
    country: { type: String },
    population: { type: Number },
    cases: {
        new: { type: String },
        active: { type: Number },
        critical: { type: Number },
        recovered: { type: Number },
        "1M_pop": { type: String },
        total: { type: Number }
    },
    deaths: {
        new: { type: String },
        "1M_pop": { type: String },
        total: { type: Number }
    },
    tests: {
        "1M_pop": { type: String },
        total: { type: Number }
    },
    day: { type: String },
    time: { type: String }
});
exports.default = (0, mongoose_1.model)("CountryStat", CountryStatSchema);
