const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');

const dotenv = require('dotenv').config();

const jwt = require('jsonwebtoken');

const User = require("../models/User");
const adminAuth = require('../middlewares/adminAuth');

// Post de users
router.post("/user/new", (req, res) => {
    let { userName, email, password, accountType } = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    // Procura no banco por usuarios com o userName inserido
    User.findAll({
        where: {
            userName: userName
        }
    }).then(() => {
        User.findAll({
            // Procura no banco por usuarios com o email inserido
            where: { email: email }
        })
            .then((data) => {

                // Se nenhum usuario com as credenciais existir, cria o usuario com os dados recebidos
                if (data.length == 0) {
                    User.create({
                        userName,
                        email,
                        password: hash,
                        accountType
                    })
                        .then(() => {
                            res.json({ "status": 201, "message": "User created successfully" });
                        })
                        .catch((error) => {
                            res.json({ "status": "error", "message": error })
                        })
                }

                else {
                    res.json({ "status": "error", "message": "User already exists" });
                }
            }).
            catch((error) => {
                res.json({
                    "status": "error",
                    "message": "Occurred and error while searching users by email"
                })
            })
    }).catch((error) => {
        res.json({
            "status": "error",
            "message": "Occurred and error while searching users by userName"
        })
    })

})

// Get de todos users
router.get("/admin/users", adminAuth, (req, res) => {
    User.findAll({

    }).then((users) => {
        let allUsers = [];

        users.forEach((user, index, array) => {
            allUsers[index] = {
                "id": user.id,
                "userName": user.userName,
                "email": user.email,
                "isActive": user.isActive
            };
        })
        res.json(
            {
                "users": allUsers
            }
        )
    }).catch(error => res.json({
        "status": "error",
        "message": error
    }))
})

// Get users por ID
router.get("/user/:id", (req, res) => {
    let { id } = req.params;

    User.findOne({ where: { id: id } }).then((user) => {
        if (user) {
            res.json({
                "userName": user.userName,
                "email": user.email
            })
        }
        else if (user == null) {
            res.json({
                "status": 404,
                "message": "Not found"
            })
        }
        else {
            res.json({
                "status": "error",
                "message": "An error was occurred"
            })
        }
    })
        .catch((error) => {
            res.json({
                "status": "error",
                "message": error,
            })
        })
})

// Login
router.post("/login", (req, res) => {
    let { email, password } = req.body;

    User.findOne({ where: { email: email } }).then((user) => {
        if (user != undefined) {
            let correct = bcrypt.compareSync(password, user.password);
            if (correct) {

                jwt.sign({
                    userId: user.id,
                    userEmail: user.email,
                    userAccountType: user.accountType
                }, process.env.JWT_SECRET, { expiresIn: "24h" }, (err, token) => {
                    if (err) {
                        res.status(400);
                        res.json({
                            "err": "Internal error"
                        })
                    } else {
                        res.status(200);
                        res.json({
                            "token": token
                        })
                    }
                })
            } else {
                res.json({
                    "status": 401,
                    "message": "Invalid password"
                })
            }
        } else {
            res.json({
                "status": 401,
                "message": "Invalid email"
            })
        }
    }).catch((error) => {
        res.json({
            "status": "error",
            "message": error
        })
    })

})

// Change user status
// Disable user
router.patch('/user/disable/:id', (req, res) => {
    let { id } = req.params;

    User.findOne({ where: { id: id } }).then((user) => {
        if (user) {
            user.update({
                isActive: 0
            }).then(() => res.json({
                "status": "success",
                "message": "User disabled successfully"
            })).catch((error) => res.json({
                "status": "error",
                "message": "User cannot be disabled"
            }))
        }
        else {
            res.json({
                "status": 404,
                "message": "User not found"
            })
        }
    }).catch((error) => res.json({
        "status": "error",
        "message": "An error occured while searching user"
    }))
})

// Enable user
router.patch('/user/enable/:id', (req, res) => {
    let { id } = req.params;

    User.findOne({ where: { id: id } }).then((user) => {
        if (user) {
            user.update({
                isActive: 1
            }).then(() => res.json({
                "status": "success",
                "message": "User enabled successfully"
            })).catch((error) => res.json({
                "status": "error",
                "message": "User cannot be enabled"
            }))
        }
        else {
            res.json({
                "status": 404,
                "message": "User not found"
            })
        }
    }).catch((error) => res.json({
        "status": "error",
        "message": "An error occured while searching user"
    }))
})

module.exports = router;