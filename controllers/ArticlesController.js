const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/User");
const Article = require('../models/Article');

// Post new article
router.post("/article/new", (req, res) => {
    let { title, body, authorId, categoryId } = req.body;

    Article.create({
        title,
        body,
        authorId,
        categoryId,
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

// Get all articles
router.get("/articles", (req, res) => {
    Article.findAll().then((articles) => {
        res.json({
            "articles": articles
        })
    }).catch((error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while searching articles"
        })
    })
})

// Get articles by Id
router.get("/article/:id", (req, res) => {
    let { id } = req.params;

    Article.findOne({ where: { id: id } }).then((article) => {
        if (article) {
            res.json({
                "status": 200,
                "article": article
            })
        }
        else {
            res.json({
                "status": 404,
                "message": "Article not found"
            })
        }
    }).catch((error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while searching article"
        })
    })
})

// Get articles by authorId
router.get("/user/:id/articles", (req, res) => {
    let { id } = req.params;
    Article.findAll({ where: { authorId: id } }).then((articles) => {
        res.json({
            "status": 200,
            "articles": articles
        })
    }).catch((error) => {
        console.log(error)
        res.json({
            "status": "error",
            "message": "An error occurred while searching articles"
        })
    })
})

module.exports = router;