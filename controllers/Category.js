const CategoryModel = require("../models/Category");

const addCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newCategory = new CategoryModel({ name, image });
    await newCategory.save();

    return res
      .status(201)
      .json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

const getAllCategories = async (req, res) => {
  try {
    console.log("in api");

    const categories = await CategoryModel.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

const getRandomCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.aggregate([
      { $sample: { size: 4 } },
    ]);
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

const categoryByName = async (req, res) => {
  try {
    const { name } = req.params;
    const category = await CategoryModel.findOne({ name: name });

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getRandomCategories,
  categoryByName,
};
