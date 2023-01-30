const jwt = require('jsonwebtoken');

function adminMiddleware(req, res, next) {
    const tokenBearer = req.headers['authorization'].split(' ');
    const AUTH_TOKEN = tokenBearer[1];

    if (AUTH_TOKEN) {
        jwt.verify(AUTH_TOKEN, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                res.status(401);
                res.json({
                    "status": "error",
                    "message": "Invalid token"
                })
            } else {
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