import axios from "axios";

export const requestCovidInfo = async (endpoint: string): Promise<any> => {
  const response: any = await axios.get(`https://covid-193.p.rapidapi.com/${endpoint}`, {
    headers: {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "1b35a63c84mshc9052ba10fd06c4p10de48jsnf329ef38663f",
    },
  });
  return response.data;
};
