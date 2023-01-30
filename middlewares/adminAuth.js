function adminAuth(req, res, next) {
    if (req.session.user?.accountType === 'admin') {
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