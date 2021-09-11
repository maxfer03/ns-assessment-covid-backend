import { Router, Request, Response } from "express";
import { requestCovidStats } from "../../utils/axios";
import { IcovidStats, IuserCountryInfo } from "../../utils/interfaces";
import Stats from "../../models/stats";

const stats: Router = Router();

stats.get("/all", async (req: Request, res: Response) => {
  try {
    const dbInfo = await Stats.find();
    return res.json(dbInfo);
  } catch (e) {
    console.log(e);
    return res.status(400).send("ERROR!");
  }
});

stats.get("/name/:country", async (req: Request, res: Response) => {
  let { country } = req.params;
  country = country.toLowerCase();
  const detail = await Stats.findOne({ country });
  return res.json(detail);
});

stats.post("/edit/:country", async (req: Request, res: Response) => {
  let { country } = req.params;
  const newInfo: IuserCountryInfo = req.body;
  country = country.toLowerCase();

  await Stats.findOneAndUpdate({ country }, newInfo);
  console.log(`${country} updated succesfully`);
  return res.json({
    country,
    newInfo,
  });
});

stats.get("/sync", async (req: Request, res: Response) => {
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
  return res.send("Stats sinced successfully.");
});

export default stats;
