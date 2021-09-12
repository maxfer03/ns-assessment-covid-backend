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
exports.requestCovidStats = void 0;
const axios_1 = __importDefault(require("axios"));
const requestCovidStats = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://covid-193.p.rapidapi.com/statistics", {
            headers: {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "1b35a63c84mshc9052ba10fd06c4p10de48jsnf329ef38663f",
            },
        });
        console.log("request successful");
        return response.data;
    }
    catch (e) {
        console.log(e);
        return "ERROR 404";
    }
});
exports.requestCovidStats = requestCovidStats;
