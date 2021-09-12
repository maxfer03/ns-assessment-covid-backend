import { Router, Request, Response } from "express";
import { Iuser } from "../../utils/interfaces";
import User from "../../models/user";
import { hashPw, validatePw } from "../../utils/hash";
import { encodeSession, secretEnv } from "../../utils/jwtUtils";

const auth: Router = Router();

auth.get("/", (req: Request, res: Response) => {
  return res.send("auth path");
});

auth.post("/login", async (req: Request, res: Response) => {
  const user: Iuser = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const results: any = await User.findOne({ username: user.username });
    console.log(results);
    if (results) {
      const valid = await validatePw(user.password, results.password);
      if (valid) {
        //here goes the jwt
        const session = encodeSession(secretEnv, {
          username: user.username,
          dateCreated: Date.now(),
        });
        return res.json({
          msg: `${user.username} logged in.`,
          token: session,
        });
      } else {
        return res.status(400).send("ERROR. Invalid password");
      }
    }
    return res.status(404).send("ERROR. User not found");
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
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
      const { username, password } = user;
      const hashedPw: string = await hashPw(password);
      const newUser = new User({ username, password: hashedPw });
      await newUser.save();
      //here goes the jwt
      const session = encodeSession(secretEnv, {
        username: user.username,
        dateCreated: Date.now(),
      });
      return res.json({
        msg: `${username} logged in.`,
        token: session,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).send(e);
    }
  }
});

export default auth;
