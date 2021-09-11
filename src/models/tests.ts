import { Schema, model } from "mongoose";
import { Icases, Ideaths, Itests } from "../utils/interfaces";

const TestsSchema = new Schema({
  "1M_pop":     {type: String},
  total:        {type: Number}
});

export default model("Tests", TestsSchema);