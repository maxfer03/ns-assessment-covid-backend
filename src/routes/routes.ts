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

/* routes.get("/statistics", async (req: Request, res: Response) => {
  const info: IcovidStats | string = await requestCovidStats();
  return res.json(info);
  //return res.json('stats')
});

routes.post("/statistics", (req: Request, res: Response) => {
  return res.json("stats posted");
}); */

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

/* const testObject = {
    continent: 'eurasia',
    country: 'polonia',
    population: 111123,
    cases: {
      new: '10000',
      active: 1323,
      critical: 1323,
      recovered: 13223,
      "1M_pop": 'te00st',
      total: 1323,
    },
    deaths: {
      new: 'eeee',
      "1M_pop": 'te2331st',
      total: 123,
    },
    tests: {
      "1M_pop": 'te322st',
      total: 123,
    },
    day: "tes322t",
    time: "tes322t",
  }; */
