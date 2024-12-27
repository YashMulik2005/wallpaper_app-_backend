const FavouriteModel = require("../models/Favourite");
const WallpaperModel = require("../models/Wallpaper");

exports.addFavourite = async (req, res) => {
  try {
    const { wallpaperId } = req.body;

    if (!wallpaperId) {
      return res.status(400).json({ message: "Wallpaper ID is required." });
    }

    const wallpaper = await WallpaperModel.findById(wallpaperId);
    if (!wallpaper) {
      return res.status(404).json({ message: "Wallpaper not found." });
    }

    const existingFavourite = await FavouriteModel.findOne({
      user: req.user.id,
      wallpaper: wallpaperId,
    });
    if (existingFavourite) {
      return res
        .status(400)
        .json({ message: "Wallpaper is already a favourite." });
    }

    const favourite = new FavouriteModel({
      user: req.user.id,
      wallpaper: wallpaperId,
    });
    await favourite.save();

    res
      .status(201)
      .json({ message: "Favourite added successfully.", favourite });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.getUserFavourites = async (req, res) => {
  try {
    const favourites = await FavouriteModel.find({ user: req.user.id })
      .populate("wallpaper", "image category")
      .populate("user", "username email")
      .sort({ timestamp: -1 })
      .limit(24);

    if (!favourites.length) {
      return res
        .status(404)
        .json({ message: "No favourites found for this user." });
    }

    res.status(200).json({ favourites });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.removeFavourite = async (req, res) => {
  try {
    const { wallpaperId } = req.body;

    if (!wallpaperId) {
      return res.status(400).json({ message: "Wallpaper ID is required." });
    }

    const favourite = await FavouriteModel.findOneAndDelete({
      user: req.user.id,
      wallpaper: wallpaperId,
    });

    if (!favourite) {
      return res.status(404).json({ message: "Favourite not found." });
    }

    res.status(200).json({ message: "Favourite removed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
