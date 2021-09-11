import { Router, Request, Response } from "express";
import auth from "./auth/auth";
import { requestCovidStats } from "../utils/axios";
import { IcovidStats } from "../utils/interfaces";
import User from "../models/user";
import Stats from "../models/stats";
import stats from "./stats/stats";
const routes: Router = Router();

routes.use("/auth", auth);

routes.use('/stats', stats)


routes.get("/sync", async (req: Request, res: Response) => {
  await Stats.deleteMany({});
  const covidSyncedStats: any = await requestCovidStats();
  for (let country of covidSyncedStats.response) {
    try {
      country.country = country.country.toLowerCase();
      const DBsyncedStats = new Stats(country);
      await DBsyncedStats.save();
      console.log("Country successfully added: ", country.country);
    } catch (e) {
      console.log(e);
      return res.status(400).send("ERROR!");
    }
  }
  return res.send('Stats sinced successfully.');
});

routes.get("/users", async (req: Request, res: Response) => {
  const users = await User.find();
  return res.json(users);
});

export default routes;

