"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.checkExpStatus = exports.decodeSession = exports.encodeSession = exports.secretEnv = void 0;
const jwt_simple_1 = require("jwt-simple");
require("dotenv").config();
exports.secretEnv = process.env.JWT_SECRET;
const alg = "HS512";
const encodeSession = (secret, partialSession) => {
    const issued = Date.now();
    const tokenLife = 15 * 60 * 1000; /* 15 min */
    const expDate = issued + tokenLife;
    const session = Object.assign(Object.assign({}, partialSession), { issued, expires: expDate });
    return {
        token: (0, jwt_simple_1.encode)(session, secret, alg),
        issued,
        expires: expDate,
    };
};
exports.encodeSession = encodeSession;
const decodeSession = (secret, token) => {
    let result;
    try {
        result = (0, jwt_simple_1.decode)(token, secret, false, alg);
    }
    catch (_e) {
        const e = _e;
        // These error strings can be found here:
        // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js
        if (e.message === "No token suppl<ied" ||
            e.message === "Not enough or too many segments") {
            return {
                type: "invalid-token",
            };
        }
        if (e.message === "Signature verification failed" ||
            e.message === "Algorithm not supported") {
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
exports.decodeSession = decodeSession;
const checkExpStatus = (token) => {
    const now = Date.now();
    if (token.expires > now)
        return "active";
    const renewalPeriod = 3 * 60 * 60 * 1000; /* 3hrs */
    const renewalPeriodExpires = token.expires + renewalPeriod;
    if (renewalPeriod > now)
        return "grace";
    return "expired";
};
exports.checkExpStatus = checkExpStatus;
const authMiddleware = (req, res, next) => {
    const authFailed = (msg) => {
        return res.status(401).send("ERROR! " + msg);
    };
    const reqHeader = "X-JWT-Token";
    const resHeader = "X-Renewed-JWT-Token";
    const header = req.header(reqHeader);
    if (!header) {
        authFailed("Required header not found");
        return;
    }
    const decoded = (0, exports.decodeSession)(exports.secretEnv, header);
    if (decoded.type === "integrity-error" || decoded.type === "invalid-token") {
        authFailed(decoded.type);
        return;
    }
    const exp = (0, exports.checkExpStatus)(decoded.session);
    if (exp === "expired") {
        authFailed("Token Expired");
        return;
    }
    let session;
    if (exp === "grace") {
        const { token, expires, issued } = (0, exports.encodeSession)(exports.secretEnv, decoded.session);
        session = Object.assign(Object.assign({}, decoded.session), { expires,
            issued });
        return res.setHeader(resHeader, token);
    }
    else {
        session = decoded.session;
    }
    res.locals = Object.assign(Object.assign({}, res.locals), { session });
    next();
};
exports.authMiddleware = authMiddleware;
