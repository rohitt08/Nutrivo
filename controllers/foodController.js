const foodModel = require("../models/foodModel");

const emitFoodChange = (req, type, foodId) => {
  const io = req.app.get("io");
  if (io) {
    io.emit("foods:changed", {
      type,
      foodId,
      timestamp: Date.now(),
    });
  }
};

const buildFoodFilters = (query = {}) => {
  const filters = {};

  if (query.q) {
    filters.$or = [
      { title: { $regex: query.q, $options: "i" } },
      { description: { $regex: query.q, $options: "i" } },
      { foodTags: { $regex: query.q, $options: "i" } },
      { catgeory: { $regex: query.q, $options: "i" } },
    ];
  }

  if (query.category) {
    filters.catgeory = { $regex: `^${query.category}$`, $options: "i" };
  }

  if (query.veg === "true") {
    filters.isVeg = true;
  }

  if (query.veg === "false") {
    filters.isVeg = false;
  }

  if (query.minPrice || query.maxPrice) {
    filters.price = {};
    if (query.minPrice) {
      filters.price.$gte = Number(query.minPrice);
    }
    if (query.maxPrice) {
      filters.price.$lte = Number(query.maxPrice);
    }
  }

  return filters;
};

const buildFoodSort = (sort) => {
  if (sort === "price-asc") return { price: 1 };
  if (sort === "price-desc") return { price: -1 };
  if (sort === "popularity") return { popularity: -1, averageRating: -1 };
  if (sort === "rating") return { averageRating: -1, ratingCount: -1 };
  return { createdAt: -1 };
};

// CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const payload = {
      title: req.body.title || req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl || req.body.image,
      foodTags: req.body.foodTags,
      catgeory: req.body.catgeory || req.body.category,
      code: req.body.code,
      isAvailabe: req.body.isAvailabe,
      isVeg: req.body.isVeg === true || req.body.isVeg === "true",
      rating: req.body.rating,
      ratingCount: req.body.ratingCount,
    };

    if (!payload.title || !payload.description || !payload.price) {
      return res.status(400).send({ success: false, message: "Title, description and price required" });
    }

    const food = await foodModel.create(payload);
    emitFoodChange(req, "created", food._id.toString());
    res.status(201).send({ success: true, message: "Food created", food });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error creating food", error: error.message });
  }
};

// GET ALL FOODS
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).send({ success: true, total: foods.length, foods });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching foods", error: error.message });
  }
};

const searchFoodsController = async (req, res) => {
  try {
    const filters = buildFoodFilters(req.query);
    const sort = buildFoodSort(req.query.sort);
    const foods = await foodModel.find(filters).sort(sort);
    res.status(200).send({ success: true, total: foods.length, foods });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error searching foods", error: error.message });
  }
};

// GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) {
      return res.status(404).send({ success: false, message: "Food not found" });
    }
    res.status(200).send({ success: true, food });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching food", error: error.message });
  }
};

// UPDATE FOOD
const updateFoodController = async (req, res) => {
  try {
    const updatePayload = {
      ...req.body,
      title: req.body.title || req.body.name,
      imageUrl: req.body.imageUrl || req.body.image,
      catgeory: req.body.catgeory || req.body.category,
      isVeg: req.body.isVeg === true || req.body.isVeg === "true",
    };
    const food = await foodModel.findByIdAndUpdate(req.params.id, updatePayload, { new: true });
    if (!food) {
      return res.status(404).send({ success: false, message: "Food not found" });
    }
    emitFoodChange(req, "updated", food._id.toString());
    res.status(200).send({ success: true, message: "Food updated", food });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error updating food", error: error.message });
  }
};

// DELETE FOOD
const deleteFoodController = async (req, res) => {
  try {
    const food = await foodModel.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).send({ success: false, message: "Food not found" });
    }
    emitFoodChange(req, "deleted", food._id.toString());
    res.status(200).send({ success: true, message: "Food deleted" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error deleting food", error: error.message });
  }
};

module.exports = {
  createFoodController,
  getAllFoodsController,
  searchFoodsController,
  getSingleFoodController,
  updateFoodController,
  deleteFoodController,
};
