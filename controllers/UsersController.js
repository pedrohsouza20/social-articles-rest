const express = require('express');
const router = express.Router();

const User = require("../models/User");

// Post de users
router.post("/user/new", (req, res) => {
    let userName = req.body.userName;
    let email = req.body.email;

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
                console.log('resultado da busca:', data)

                // Se nenhum usuario com as credenciais existir, cria o usuario com os dados recebidos
                if (data.length == 0) {
                    User.create({
                        userName: userName,
                        email: email
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

module.exports = router;