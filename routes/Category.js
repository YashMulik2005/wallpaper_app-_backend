const express = require("express");
const {
  addCategory,
  getAllCategories,
  getRandomCategories,
  categoryByName,
} = require("../controllers/Category");
const router = express.Router();

router.post("/categories", addCategory);
router.get("/categories", getAllCategories);
router.get("/categories/random", getRandomCategories);
router.get("/categories/name/:name", categoryByName);

module.exports = router;
