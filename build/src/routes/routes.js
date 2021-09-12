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
const auth_1 = __importDefault(require("./auth/auth"));
const jwtUtils_1 = require("../utils/jwtUtils");
const user_1 = __importDefault(require("../models/user"));
const stats_1 = __importDefault(require("./stats/stats"));
const routes = (0, express_1.Router)();
routes.use("/auth", auth_1.default);
routes.use("/stats", jwtUtils_1.authMiddleware, stats_1.default);
routes.get("/users", jwtUtils_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find();
    return res.json(users);
}));
exports.default = routes;
