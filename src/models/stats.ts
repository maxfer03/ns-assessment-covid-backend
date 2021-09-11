import { Schema, model } from "mongoose";
import { Icases, Ideaths, Itests } from "../utils/interfaces";

const CountryStatSchema = new Schema({
  continent:    {type: String},
  country:      {type: String},
  population:   {type: Number},
  cases:        {type: Number},
  deaths:       {type: Number},
  tests:        {type: Number},
  day:          {type: String},
  time:         {type: String}
});

export default model("CountryStat", CountryStatSchema);