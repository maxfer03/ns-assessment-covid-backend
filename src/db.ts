const mongoose = require("mongoose");

export const connectToMongoAtlas = (url: string | undefined): any => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(url, connectionParams)
    .then(() => {
      console.log("Connected to database. ");
    })
    .catch((err: any) => {
      console.error(`Error connecting to the database. \n${err}`);
    });
};
