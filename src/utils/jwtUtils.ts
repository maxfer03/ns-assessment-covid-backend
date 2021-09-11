import { decode, encode, TAlgorithm } from "jwt-simple";
import {
  DecodeResult,
  EncodeResult,
  Isession,
  PartialSession,
} from "./interfaces";
require("dotenv").config();
const secret: any = process.env.JWT_SECRET;
const alg: TAlgorithm = "HS512";

export const encodeSession = (partialSession: PartialSession): EncodeResult => {
  const issued = Date.now();
  const tokenLife = 15 * 60 * 1000;
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

export const decodeSession = (token: string): DecodeResult => {
  let result: Isession;
  try {
    result = decode(token, secret, false, alg);
  } catch (_e: any) {
      const e: Error = _e
    // These error strings can be found here:
    // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js
    if (
      e.message === "No token supplied" ||
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
