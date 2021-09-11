import { Router, Request, Response } from "express";
import auth from "./auth/auth";
import { requestCovidStats } from "../utils/axios";
import { IcovidStats } from "../utils/interfaces";
import User from "../models/user";
const routes: Router = Router();

routes.use("/auth", auth);

routes.get("/statistics", async (req: Request, res: Response) => {
  const info: IcovidStats | string = await requestCovidStats();
  return res.json(info);
  //return res.json('stats')
});

routes.post("/statistics", (req: Request, res: Response) => {
  return res.json("stats posted");
});

routes.get("/sync", (req: Request, res: Response) => {
  return res.json("sync");
});

routes.get("/users", async (req: Request, res: Response) => {
  const users = await User.find();
  return res.json(users);
});

export default routes;
