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

module.exports = router;