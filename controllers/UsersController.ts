import express, { Request, Response } from "express";
import { Model } from "sequelize";

const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const adminMiddleware = require("../middlewares/adminMiddleware");
import IUser from "../interfaces/IUser";

// Post de users
router.post("/user/new", (req: Request, res: Response) => {
  let { userName, email, password, accountType } = req.body;

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  // Procura no banco por usuarios com o userName inserido
  User.findAll({
    where: {
      userName: userName,
    },
  })
    .then(() => {
      User.findAll({
        // Procura no banco por usuarios com o email inserido
        where: { email: email },
      })
        .then((data: IUser[]) => {
          // Se nenhum usuario com as credenciais existir, cria o usuario com os dados recebidos
          if (data.length == 0) {
            User.create({
              userName,
              email,
              password: hash,
              accountType,
            })
              .then(() => {
                res.status(201);
                res.json({
                  status: "success",
                  message: "User created successfully",
                });
              })
              .catch((error: Error) => {
                res.status(409);
                res.json({ status: "error", message: error });
              });
          } else {
            res.json({ status: "error", message: "User already exists" });
          }
        })
        .catch(() => {
          res.json({
            status: "error",
            message: "Occurred and error while searching users by email",
          });
        });
    })
    .catch(() => {
      res.json({
        status: "error",
        message: "Occurred and error while searching users by userName",
      });
    });
});

// Get de todos users
router.get("/admin/users", adminMiddleware, (req: Request, res: Response) => {
  User.findAll({})
    .then((users: IUser[]) => {
      let allUsers: Object[] = [];

      users.forEach((user: IUser, index: Number | any) => {
        let { id, userName, email, isActive } = user;

        allUsers[index] = {
          id,
          userName,
          email,
          isActive,
        };
      });

      res.status(200);
      res.json({ users: allUsers });
    })
    .catch((error: Error) =>
      res.json({
        status: "error",
        message: error,
      })
    );
});

// Get users por ID
router.get("/user/:id", (req: Request, res: Response) => {
  let { id } = req.params;

  User.findOne({ where: { id: id } })
    .then((user: IUser) => {
      if (user) {
        res.status(200);
        res.json({
          userName: user.userName,
          email: user.email,
        });
      } else {
        res.status(404);
        res.json({
          status: "error",
          message: "Not found",
        });
      }
    })
    .catch((error: Error) => {
      res.json({
        status: "error",
        message: error,
      });
    });
});

// Login
router.post("/login", (req: Request, res: Response) => {
  let { email, password } = req.body;

  User.findOne({ where: { email: email } })
    .then((user: IUser) => {
      if (user != undefined) {
        let correct = bcrypt.compareSync(password, user.password);

        if (correct) {
          jwt.sign(
            {
              userId: user.id,
              userEmail: user.email,
              userAccountType: user.accountType,
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" },
            (err: Error, token: String) => {
              if (err) {
                res.status(400);
                res.json({
                  status: "error",
                  message: "Internal error",
                });
              } else {
                res.status(200);
                res.json({
                  token: token,
                });
              }
            }
          );
        } else {
          res.status(401);
          res.json({
            status: "error",
            message: "Invalid password",
          });
        }
      } else {
        res.status(401);
        res.json({
          status: "error",
          message: "Invalid email",
        });
      }
    })
    .catch((error: Error) => {
      res.json({
        status: "error",
        message: error,
      });
    });
});

// Change user status
// Disable user
router.patch(
  "/user/disable/:id",
  adminMiddleware,
  (req: Request, res: Response) => {
    let { id } = req.params;

    User.findOne({ where: { id: id } })
      .then((user: Model) => {
        if (user) {
          user
            .update({
              isActive: 0,
            })
            .then(() => {
              res.status(200);
              res.json({
                status: "success",
                message: "User disabled successfully",
              });
            })
            .catch(() =>
              res.json({
                status: "error",
                message: "User cannot be disabled",
              })
            );
        } else {
          res.status(404);
          res.json({
            status: "error",
            message: "User not found",
          });
        }
      })
      .catch(() =>
        res.json({
          status: "error",
          message: "An error occured while searching user",
        })
      );
  }
);

// Enable user
router.patch(
  "/user/enable/:id",
  adminMiddleware,
  (req: Request, res: Response) => {
    let { id } = req.params;
    let { selfUser }: Number | any = req;

    // Nao permite que um usuario habilite a si mesmo
    if (selfUser.id == id) {
      res.status(401);
      res.json({
        status: "error",
        message: "An user cannot enable himself",
      });
      return;
    }

    User.findOne({ where: { id: id } })
      .then((user: Model) => {
        if (user) {
          user
            .update({
              isActive: 1,
            })
            .then(() => {
              res.status(200);
              res.json({
                status: "success",
                message: "User enabled successfully",
              });
            })
            .catch(() =>
              res.json({
                status: "error",
                message: "User cannot be enabled",
              })
            );
        } else {
          res.status(404);
          res.json({
            status: "error",
            message: "User not found",
          });
        }
      })
      .catch(() =>
        res.json({
          status: "error",
          message: "An error occured while searching user",
        })
      );
  }
);

module.exports = router;

export {};
