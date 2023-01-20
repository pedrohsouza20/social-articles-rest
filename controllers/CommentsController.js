const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/User");
const Comment = require("../models/Comment");

// Post new comment
router.post('/comment/new', (req, res) => {
    let { body, authorId, articleId } = req.body;

    Comment.create({
        body,
        authorId,
        articleId,
    })
        .then((comment) => {
            res.json({
                "status": 201,
                "comment": comment
            })
        })
        .catch((error) => {
            console.log(error);
            res.json({
                "status": "error",
                "message": "An error occurred while creating comment"
            })
        })
})

// Get all comments
router.get('/comments', (req, res) => {
    Comment.findAll().then((comments) => {
        res.json({
            "status": 200,
            "comments": comments
        })
    }).catch((error) => {
        console.log(error)
        res.json({
            "status": "error",
            "message": "An error occurred while searching comments"
        })
    })
})

// Get comments by authorId
router.get('/user/:id/comments/', (req, res) => {
    let { id } = req.params;

    Comment.findAll({ where: { authorId: id } }).then((comments) => {
        res.json({
            "status": 200,
            "comments": comments
        })
    }).catch((error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while searching comments"
        })
    })
})

// Get comments by articleId
router.get('/article/:id/comments', (req, res) => {
    let { id } = req.params;

    Comment.findAll({ where: { articleId: id } }).then((comments) => {
        res.json({
            "status": 200,
            "comments": comments
        })
    }).catch((error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while searching comments"
        })
    })
})

module.exports = router;