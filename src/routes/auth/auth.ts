import { Router, Request, Response } from "express";
import { Iuser } from "../../utils/interfaces";
import User from "../../models/user";

const auth: Router = Router();

auth.get("/", (req: Request, res: Response) => {
  return res.send("auth path");
});

auth.post("/login", (req: Request, res: Response) => {
  return res.json("log in");
});

auth.post("/signup", async (req: Request, res: Response) => {
  const user: Iuser = {
    username: req.body.username,
    password: req.body.password,
  };
  if (!user.password || !user.username) {
    return res.status(400).send("ERROR: Invalid user.");
  } else {
    try {
        const {username, password} = user
        const newUser =  new User({username, password})
        await newUser.save()
      return res.json(`User ${user.username} created.`);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e)
    }
  }
});

export default auth;
