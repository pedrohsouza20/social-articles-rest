import { Request, Response, NextFunction } from "express";

const jwt = require('jsonwebtoken');
import IJWTPayload from "../interfaces/IJWTPayload";

function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    const tokenBearer = req.headers['authorization']?.split(' ');
    const AUTH_TOKEN = tokenBearer![1];

    if (AUTH_TOKEN) {
        jwt.verify(AUTH_TOKEN, process.env.JWT_SECRET, (err: Error, data: IJWTPayload) => {
            if (err) {
                res.status(401);
                res.json({
                    "status": "error",
                    "message": "Invalid token"
                })
            } else {
                req.selfUser = { id: data.userId }
                
                if (data.userAccountType === 'admin') {
                    next();
                } else {
                    res.json({
                        "status": 401,
                        "message": "Unauthorized"
                    })
                }
            }
        })
    }
    else {
        res.json({
            "status": 401,
            "message": "Unauthorized"
        })
    }
}

module.exports = adminMiddleware;

export { }