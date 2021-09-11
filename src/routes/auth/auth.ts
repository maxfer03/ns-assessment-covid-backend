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

auth.post("/signup", (req: Request, res: Response) => {
  const user: Iuser = req.body;
  console.log(user);
  if (!user) {
    return res.status(400).send("ERROR: Empty user.");
  } else {
    
    return res.json(`User ${user.username} created.`);
  }
});

export default auth;
