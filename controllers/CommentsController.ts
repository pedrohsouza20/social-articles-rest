import express, { Request, Response } from "express";

const router = express.Router();
const Comment = require("../models/Comment");
import IComment from "../interfaces/IComment";

// Post new comment
router.post('/comment/new', (req: Request, res: Response) => {
    let { body, authorId, articleId } = req.body;

    Comment.create({
        body,
        authorId,
        articleId,
    })
        .then((comment: IComment) => {
            res.json({
                "status": 201,
                "comment": comment
            })
        })
        .catch(() => {
            res.json({
                "status": "error",
                "message": "An error occurred while creating comment"
            })
        })
})

// Get all comments
router.get('/comments', (req: Request, res: Response) => {
    Comment.findAll().then((comments: IComment[]) => {
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

    Comment.findAll({ where: { authorId: id } }).then((comments: IComment[]) => {
        res.json({
            "status": 200,
            "comments": comments
        })
    }).catch(() => {
        res.json({
            "status": "error",
            "message": "An error occurred while searching comments"
        })
    })
})

// Get comments by articleId
router.get('/article/:id/comments', (req: Request, res: Response) => {
    let { id } = req.params;

    Comment.findAll({ where: { articleId: id } }).then((comments: IComment[]) => {
        res.json({
            "status": 200,
            "comments": comments
        })
    }).catch(() => {
        res.json({
            "status": "error",
            "message": "An error occurred while searching comments"
        })
    })
})

module.exports = router;

export { }