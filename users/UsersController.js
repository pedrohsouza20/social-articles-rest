const express = require('express');
const router = express.Router();

const User = require("./User");

router.post("/user/new", (req, res) => {
    let userName = req.body.userName;
    let email = req.body.email;

    User.create({
        userName: userName,
        email: email
    }).then(() => {
        res.json({
            status: 201,
            message: "user created successfully"
        })
    })
})

module.exports = router;