import { Schema, model } from "mongoose";
import { Icases, Ideaths, Itests } from "../utils/interfaces";

const CasesSchema = new Schema({
  new:          {type: String},
  active:       {type: Number},
  critical:     {type: Number},
  recovered:    {type: Number},
  "1M_pop":     {type: String},
  total:        {type: Number}
});

export default model("Cases", CasesSchema);