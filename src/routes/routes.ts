import { Router, Request, Response } from "express";
import auth from "./auth/auth";
import { requestCovidStats } from "../utils/axios";
import { IcovidStats } from "../utils/interfaces";
import { authMiddleware } from "../utils/jwtUtils";
import User from "../models/user";
import Stats from "../models/stats";
import stats from "./stats/stats";
const routes: Router = Router();

routes.use("/auth", auth);

routes.use("/stats", authMiddleware, stats);

routes.get("/users", authMiddleware, async (req: Request, res: Response) => {
  const users = await User.find();
  return res.json(users);
});

export default routes;
