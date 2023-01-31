"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
function adminMiddleware(req, res, next) {
    var _a;
    const tokenBearer = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ");
    const AUTH_TOKEN = tokenBearer[1];
    if (AUTH_TOKEN) {
        jwt.verify(AUTH_TOKEN, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                res.status(401);
                res.json({
                    status: "error",
                    message: "Invalid token",
                });
            }
            else {
                req.selfUser = { id: data.userId };
                if (data.userAccountType === "admin") {
                    next();
                }
                else {
                    res.json({
                        status: 401,
                        message: "Unauthorized",
                    });
                }
            }
        });
    }
    else {
        res.json({
            status: 401,
            message: "Unauthorized",
        });
    }
}
module.exports = adminMiddleware;
