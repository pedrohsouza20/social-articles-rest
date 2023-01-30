function adminAuth(req, res, next) {
    if (true) {
        next();
    }
    else {
        res.json({
            "status": 401,
            "message": "Unauthorized"
        })
    }
}

module.exports = adminAuth;