const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/User");

// Post de users
router.post("/user/new", (req, res) => {
    let userName = req.body.userName;
    let email = req.body.email;
    let password = req.body.password;

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
                        userName: userName,
                        email: email,
                        password: hash
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
router.get("/users", (req, res) => {
    User.findAll({
        where: {
            id: 2
        }
    }).then((users) => {
        res.json(users)
    }).catch(error => res.json({
        "status": "error",
        "message": error
    }))
})

// Get users por ID
router.get("/user/:id", (req, res) => {
    let id = req.params.id;
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
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ where: { email: email } }).then((user) => {
        if (user != undefined) {
            let correct = bcrypt.compareSync(password, user.password);
            console.log(correct);
            if (correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.json({
                    "userId": user.id,
                    "userEmail": user.email
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
    let id = req.params.id;

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
    let id = req.params.id;

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

router.get("/sessions", (req, res) => {
    res.json({
        "data": req.session.user
    })
})

module.exports = router;