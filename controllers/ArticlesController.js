const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/User");
const Article = require('../models/Article');

router.post("/article/new", (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let authorId = req.body.authorId;
    let categoryId = req.body.categoryId;
    let edited = req.body.edited ? req.body.title : 0;
    let likes = req.body.likes ? req.body.likes : 0;
    let unlikes = req.body.unlikes ? req.body.unlikes : 0;
    console.log('sim');
    Article.create({
        title: title,
        body: body,
        authorId: authorId,
        categoryId: categoryId,
        edited: 0,
        likes: likes,
        unlikes: unlikes
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
        console.log(error)
    })
})

module.exports = router;