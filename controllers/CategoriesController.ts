import express, { Request, Response } from "express";

const router = express.Router();
const Category = require('../models/Category');

// Create new category
router.post('/admin/category/new', (req, res) => {
    let { name } = req.body;

    if (name.length > 0) {
        Category.findOne({ where: { name: name } }).then((category: any) => {
            if (category) {
                res.json({
                    "status": "error",
                    "message": `The category ${name} already exists`
                })
            } else {
                Category.create({
                    name
                }).then((category: any) => {
                    res.json({
                        "status": 201,
                        "message": `Category ${category.name} was created succesfully`
                    })
                }).catch((error: Error) => {
                    res.json({
                        "status": "error",
                        "message": "An error occurred while creating category"
                    })
                })
            }
        }).catch((error: Error) => {
            res.json({
                "status": "error",
                "message": "An error occurred while searching existing category"
            })
        })
    }

    else {
        res.json({
            "status": 400,
            "message": "Category's name cannot be null"
        })
    }

})

// Get all categories
router.get('/admin/categories', (req:Request, res: Response) => {
    Category.findAll().then((categories: any) => {
        res.json({
            "status": 200,
            "categories": categories
        })
    }).catch((error: Error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while searching categories"
        })
    })
})

// Change category name
router.patch('/admin/category/change-name/:id', (req, res) => {
    let { id } = req.params;
    let { name } = req.body;

    Category.update({ name: name }, {
        where: {
            id: id
        }
    }).then((category:any) => {
        res.json({
            "status": 200,
            "message": "Category's name changed successfully"
        })
    }).catch((error: Error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while changing category's name"
        })
    })
})

// Get category by Id
router.get('/admin/category/:id', (req, res) => {
    let { id } = req.params;

    Category.findOne({ where: { id: id } }).then((category: any) => {
        if (category) {
            res.json({
                "status": 200,
                "categoryName": category.name
            })
        } else {
            res.json({
                "status": 404,
                "message": "Category not found"
            })
        }
    }).catch((error: Error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while searching category"
        })
    })
})

// Disable category
router.patch('/admin/category/disable/:id', (req: Request, res: Response) => {
    let { id } = req.params;

    Category.update(
        { isActive: 0 },
        {
            where: {
                id: id
            }
        }
    ).then((category: any) => {
        if (category != 0) {
            console.log(category)
            res.json({
                "status": 200,
                "message": `Category ${category} was disabled successfully`
            })
        }
        else {
            res.json({
                "status": 404,
                "message": "Category not found"
            })
        }
    }).catch((error: Error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while disable category"
        })
    })
})

// Enable category
router.patch('/admin/category/enable/:id', (req, res) => {
    let { id } = req.params;

    Category.update(
        { isActive: 1 },
        {
            where: {
                id: id
            }
        }
    ).then((category: any) => {
        if (category != 0) {
            console.log(category)
            res.json({
                "status": 200,
                "message": `Category ${category} was enabled successfully`
            })
        }
        else {
            res.json({
                "status": 404,
                "message": "Category not found"
            })
        }
    }).catch((error: Error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while enabled category"
        })
    })
})

module.exports = router;

export { }