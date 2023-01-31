import express, { Request, Response } from "express";

const router = express.Router();
const Category = require("../models/Category");
import ICategory from "../interfaces/ICategory";

// Create new category
router.post("/admin/category/new", (req: Request, res: Response) => {
  let { name } = req.body;

  if (name.length > 0) {
    Category.findOne({ where: { name: name } })
      .then((category: ICategory) => {
        if (category) {
          res.json({
            status: "error",
            message: `The category ${name} already exists`,
          });
        } else {
          Category.create({
            name,
          })
            .then((category: Object | any) => {
              res.json({
                status: 201,
                message: `Category ${category.name} was created succesfully`,
              });
            })
            .catch((error: Error) => {
              res.json({
                status: "error",
                message: "An error occurred while creating category",
              });
            });
        }
      })
      .catch(() => {
        res.json({
          status: "error",
          message: "An error occurred while searching existing category",
        });
      });
  } else {
    res.json({
      status: 400,
      message: "Category's name cannot be null",
    });
  }
});

// Get all categories
router.get("/admin/categories", (req: Request, res: Response) => {
  Category.findAll()
    .then((categories: ICategory[]) => {
      res.json({
        status: 200,
        categories: categories,
      });
    })
    .catch(() => {
      res.json({
        status: "error",
        message: "An error occurred while searching categories",
      });
    });
});

// Change category name
router.patch(
  "/admin/category/change-name/:id",
  (req: Request, res: Response) => {
    let { id } = req.params;
    let { name } = req.body;

    Category.update(
      { name: name },
      {
        where: {
          id: id,
        },
      }
    )
      .then(() => {
        res.json({
          status: 200,
          message: "Category's name changed successfully",
        });
      })
      .catch(() => {
        res.json({
          status: "error",
          message: "An error occurred while changing category's name",
        });
      });
  }
);

// Get category by Id
router.get("/admin/category/:id", (req: Request, res: Response) => {
  let { id } = req.params;

  Category.findOne({ where: { id: id } })
    .then((category: ICategory) => {
      if (category) {
        res.json({
          status: 200,
          categoryName: category.name,
        });
      } else {
        res.json({
          status: 404,
          message: "Category not found",
        });
      }
    })
    .catch(() => {
      res.json({
        status: "error",
        message: "An error occurred while searching category",
      });
    });
});

// Disable category
router.patch("/admin/category/disable/:id", (req: Request, res: Response) => {
  let { id } = req.params;

  Category.update(
    { isActive: 0 },
    {
      where: {
        id: id,
      },
    }
  )
    .then((category: ICategory | Object | any) => {
      if (category[0] !== 0) {
        res.json({
          status: 200,
          message: `Category ${id} was disabled successfully`,
        });
      } else {
        res.json({
          status: 404,
          message: "Category not found",
        });
      }
    })
    .catch(() => {
      res.json({
        status: "error",
        message: "An error occurred while disable category",
      });
    });
});

// Enable category
router.patch("/admin/category/enable/:id", (req: Request, res: Response) => {
  let { id } = req.params;

  Category.update(
    { isActive: 1 },
    {
      where: {
        id: id,
      },
    }
  )
    .then((category: ICategory | Object | any) => {
      if (category[0] !== 0) {
        res.json({
          status: 200,
          message: `Category ${id} was enabled successfully`,
        });
      } else {
        res.json({
          status: 404,
          message: "Category not found",
        });
      }
    })
    .catch(() => {
      res.json({
        status: "error",
        message: "An error occurred while enable category",
      });
    });
});

module.exports = router;

export {};
