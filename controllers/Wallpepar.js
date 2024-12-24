const WallpaperModel = require("../models/Wallpaper");

const addWallpaper = async (req, res) => {
  try {
    const { category, image } = req.body;

    if (!category || !image) {
      return res
        .status(400)
        .json({ message: "Category and image are required." });
    }

    const newWallpaper = new WallpaperModel({ category, image });
    await newWallpaper.save();

    return res.status(201).json({
      message: "Wallpaper added successfully",
      wallpaper: newWallpaper,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

// Get all wallpapers
const getAllWallpapers = async (req, res) => {
  try {
    console.log("in api");
    const wallpapers = await WallpaperModel.find().populate("category");
    return res.status(200).json(wallpapers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

const getWallpaperById = async (req, res) => {
  try {
    const { id } = req.params;
    const wallpaper = await WallpaperModel.findById(id).populate("category");

    if (!wallpaper) {
      return res.status(404).json({ message: "Wallpaper not found." });
    }

    return res.status(200).json(wallpaper);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

const getRandomWallpapers = async (req, res) => {
  try {
    const wallpapers = await WallpaperModel.aggregate([
      { $sample: { size: 4 } },
    ]);
    return res.status(200).json(wallpapers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  addWallpaper,
  getAllWallpapers,
  getWallpaperById,
  getRandomWallpapers,
};