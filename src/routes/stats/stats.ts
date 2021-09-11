import { Router, Request, Response } from "express";
import { requestCovidStats } from "../../utils/axios";
import { IcovidStats } from "../../utils/interfaces";
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

stats.get("/edit/:country", (req: Request, res: Response) => {
  let { country } = req.params;
  country = country.toLowerCase();
  return res.json("stats posted");
});

export default stats;
