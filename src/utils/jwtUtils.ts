import { decode, encode, TAlgorithm } from "jwt-simple";
import { Request, Response, NextFunction } from "express";
import {
  DecodeResult,
  EncodeResult,
  ExpirationStatus,
  Isession,
  PartialSession,
} from "./interfaces";
require("dotenv").config();
export const secretEnv: any = process.env.JWT_SECRET;
const alg: TAlgorithm = "HS512";

export const encodeSession = (
  secret: string,
  partialSession: PartialSession
): EncodeResult => {
  const issued = Date.now();
  const tokenLife = 15 * 60 * 1000; /* 15 min */
  const expDate = issued + tokenLife;
  const session: Isession = {
    ...partialSession,
    issued,
    expires: expDate,
  };
  return {
    token: encode(session, secret, alg),
    issued,
    expires: expDate,
  };
};

export const decodeSession = (secret: string, token: string): DecodeResult => {
  let result: Isession;
  try {
    result = decode(token, secret, false, alg);
  } catch (_e: any) {
    const e: Error = _e;
    // These error strings can be found here:
    // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js
    if (
      e.message === "No token suppl<ied" ||
      e.message === "Not enough or too many segments"
    ) {
      return {
        type: "invalid-token",
      };
    }

    if (
      e.message === "Signature verification failed" ||
      e.message === "Algorithm not supported"
    ) {
      return {
        type: "integrity-error",
      };
    }

    // Handle json parse errors, thrown when the payload is nonsense
    if (e.message.indexOf("Unexpected token") === 0) {
      return {
        type: "invalid-token",
      };
    }

    throw e;
  }
  return {
    type: "valid",
    session: result,
  };
};

export const checkExpStatus = (token: Isession): ExpirationStatus => {
  const now = Date.now();
  if (token.expires > now) return "active";
  const renewalPeriod = 3 * 60 * 60 * 1000; /* 3hrs */
  const renewalPeriodExpires = token.expires + renewalPeriod;
  if (renewalPeriod > now) return "grace";
  return "expired";
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authFailed = (msg: string) => {
    return res.status(401).send("ERROR! " + msg);
  };
  const reqHeader = "X-JWT-Token";
  const resHeader = "X-Renewed-JWT-Token";
  const header = req.header(reqHeader);

  if (!header) {
    authFailed("Required header not found");
    return;
  }

  const decoded: DecodeResult = decodeSession(secretEnv, header);
  if (decoded.type === "integrity-error" || decoded.type === "invalid-token") {
    authFailed(decoded.type);
    return;
  }

  const exp: ExpirationStatus = checkExpStatus(decoded.session);
  if (exp === "expired") {
    authFailed("Token Expired");
    return;
  }

  let session: Isession;

  if (exp === "grace") {
    const { token, expires, issued } = encodeSession(
      secretEnv,
      decoded.session
    );
    session = {
      ...decoded.session,
      expires,
      issued,
    };
    return res.setHeader(resHeader, token);
  } else {
    session = decoded.session;
  }
  res.locals = {
    ...res.locals,
    session,
  };
  next();
};
