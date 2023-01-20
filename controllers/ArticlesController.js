const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/User");
const Article = require('../models/Article');

router.post("/article/new", (req, res) => {
    let { title, body, authorId, categoryId, edited, likes, unlikes } = req.body;

    Article.create({
        title,
        body,
        authorId,
        categoryId,
        edited: 0,
        likes,
        unlikes
    }).then((comment) => {
        res.json({
            "status": 201,
            "message": "Article created successfully."
        })
    }).catch((error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while creating a new article."
        })
    })
})

module.exports = router;