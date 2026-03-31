const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodsController,
  searchFoodsController,
  getSingleFoodController,
  updateFoodController,
  deleteFoodController,
} = require("../controllers/foodController");

const router = express.Router();

router.post("/create", authMiddleware, createFoodController);
router.get("/getAll", getAllFoodsController);
router.get("/search", searchFoodsController);
router.get("/get/:id", getSingleFoodController);
router.post("/update/:id", authMiddleware, updateFoodController);
router.delete("/delete/:id", authMiddleware, deleteFoodController);

module.exports = router;
