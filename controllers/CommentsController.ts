import express, { Request, Response } from "express";

const router = express.Router();
const Comment = require("../models/Comment");

// Post new comment
router.post('/comment/new', (req: Request, res: Response) => {
    let { body, authorId, articleId } = req.body;

    Comment.create({
        body,
        authorId,
        articleId,
    })
        .then((comment: any) => {
            res.json({
                "status": 201,
                "comment": comment
            })
        })
        .catch((error: Error) => {
            console.log(error);
            res.json({
                "status": "error",
                "message": "An error occurred while creating comment"
            })
        })
})

// Get all comments
router.get('/comments', (req: Request, res: Response) => {
    Comment.findAll().then((comments: any) => {
        res.json({
            "status": 200,
            "comments": comments
        })
    }).catch((error: Error) => {
        console.log(error)
        res.json({
            "status": "error",
            "message": "An error occurred while searching comments"
        })
    })
})

// Get comments by authorId
router.get('/user/:id/comments/', (req: Request, res: Response) => {
    let { id } = req.params;

    Comment.findAll({ where: { authorId: id } }).then((comments: any) => {
        res.json({
            "status": 200,
            "comments": comments
        })
    }).catch((error: Error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while searching comments"
        })
    })
})

// Get comments by articleId
router.get('/article/:id/comments', (req, res) => {
    let { id } = req.params;

    Comment.findAll({ where: { articleId: id } }).then((comments: any) => {
        res.json({
            "status": 200,
            "comments": comments
        })
    }).catch((error: Error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while searching comments"
        })
    })
})

module.exports = router;

export { }