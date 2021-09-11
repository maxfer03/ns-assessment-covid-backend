import { Schema, model } from "mongoose";
import { Icases, Ideaths, Itests } from "../utils/interfaces";

const DeathsSchema = new Schema({
  new:          {type: String},
  "1M_pop":     {type: String},
  total:        {type: Number}
});

export default model("Deaths", DeathsSchema);