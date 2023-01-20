const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/User");
const Article = require('../models/Article');
const Category = require('../models/Category');

// Create new category
router.post('/admin/category/new', (req, res) => {
    let { name } = req.body;

    Category.create({
        name
    }).then((category) => {
        res.json({
            "status": 201,
            "message": `Category ${category.name} was created succesfully`
        })
    }).catch((error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while creating category"
        })
    })
})

// Get all categories
router.get('/admin/categories', (req, res) => {
    Category.findAll().then((categories) => {
        res.json({
            "status": 200,
            "categories": categories
        })
    }).catch((error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while searching categories"
        })
    })
})

// Disable category
router.patch('/admin/category/disable/:id', (req, res) => {
    let { id } = req.params;

    Category.update(
        { isActive: 0 },
        {
            where: {
                id: id
            }
        }
    ).then((category) => {
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
    }).catch((error) => {
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
    ).then((category) => {
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
    }).catch((error) => {
        res.json({
            "status": "error",
            "message": "An error occurred while enabled category"
        })
    })
})

module.exports = router;