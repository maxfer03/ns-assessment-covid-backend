import { Schema, model } from "mongoose";
import { Icases, Ideaths, Itests } from "../utils/interfaces";

const CountryStatSchema = new Schema({
  continent:    {type: String},
  country:      {type: String},
  population:   {type: Number},
  cases:        {
    new:          {type: String},
    active:       {type: Number},
    critical:     {type: Number},
    recovered:    {type: Number},
    "1M_pop":     {type: String},
    total:        {type: Number}
  },
  deaths:       {
    new:          {type: String},
  "1M_pop":       {type: String},
  total:          {type: Number}
  },
  tests:        {
    "1M_pop":     {type: String},
    total:        {type: Number}
  },
  day:          {type: String},
  time:         {type: String}
});

export default model("CountryStat", CountryStatSchema);