"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
        });
    })
        .catch((error) => {
        console.log(error);
        res.json({
            "status": "error",
            "message": "An error occurred while creating comment"
        });
    });
});
// Get all comments
router.get('/comments', (req, res) => {
    Comment.findAll().then((comments) => {
        res.json({
            "status": 200,
            "comments": comments
        });
    }).catch((error) => {
        console.log(error);
        res.json({
            "status": "error",
            "message": "An error occurred while searching comments"
        });
    });
});
// Get comments by authorId
router.get('/user/:id/comments/', (req, res) => {
    let { id } = req.params;
    Comment.findAll({ where: { authorId: id } }).then((comments) => {
        res.json({
            "status": 200,
            "comments": comments
        });
    }).catch((error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while searching comments"
        });
    });
});
// Get comments by articleId
router.get('/article/:id/comments', (req, res) => {
    let { id } = req.params;
    Comment.findAll({ where: { articleId: id } }).then((comments) => {
        res.json({
            "status": 200,
            "comments": comments
        });
    }).catch((error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while searching comments"
        });
    });
});
module.exports = router;
