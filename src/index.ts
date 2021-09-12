require("dotenv").config();
var morgan = require("morgan");
import express from "express";
import routes from "./routes/routes";
import { authMiddleware, encodeSession } from "./utils/jwtUtils";
import { connectToMongoAtlas } from "./db";
import cors from "cors";

const app = express();
const port: number = 3001;

//configs
app.set("port", process.env.PORT || port);

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use("/", routes);

app.get("/", (req, res) => {
  return res.json({
    msg: "NS Assessment Covid API",
    endpoints: {
      auth: {
        login: "/auth/login         -> log in a user",
        signup: "/auth/signup       -> register a user",
      },
      stats: {
        msg: "Paths protected",
        sync: "/stats/sync          -> syncs with external API",
        all: "/stats/all            -> gets all country stats",
        country: "/name/:country    -> gets specific country stats",
        edit: "/edit/:country       -> edit specific country stats",
      },
      users: "/users (protected)    -> get all users",
    },
  });
});

app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}.`);
});
connectToMongoAtlas(process.env.DB_CONN_STRING);
