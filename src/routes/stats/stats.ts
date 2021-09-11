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
  console.log(`${country} updated succesfully`)
  return res.json({
    country,
    newInfo,
  });
});

export default stats;

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
