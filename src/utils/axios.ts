import axios from "axios";
import { IcovidStats } from "./interfaces";

export const requestCovidStats = async (): Promise<IcovidStats | string> => {
  try {
    const response = await axios.get(
      "https://covid-193.p.rapidapi.com/statistics",
      {
        headers: {
          "x-rapidapi-host": "covid-193.p.rapidapi.com",
          "x-rapidapi-key":
            "1b35a63c84mshc9052ba10fd06c4p10de48jsnf329ef38663f",
        },
      }
    );
    console.log("request successful");
    return response.data;
  } catch (e) {
    console.log(e);
    return "ERROR 404";
  }
};
