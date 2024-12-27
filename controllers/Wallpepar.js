const WallpaperModel = require("../models/Wallpaper");
const applyPagination = require("../utils/Panigate");
const FavouriteModel = require("../models/Favourite");

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

// const getAllWallpapers = async (req, res) => {
//   try {
//     console.log("in api");
//     const { page = 1, limit = 12 } = req.query;
//     const wallpapers = await WallpaperModel.find().populate("category");
//     const paginatedResult = applyPagination(wallpapers, page, limit);
//     return res.status(200).json({
//       wallpapers: paginatedResult.data,
//       currentPage: paginatedResult.currentPage,
//       totalPages: paginatedResult.totalPages,
//       dataPerPage: paginatedResult.dataPerPage,
//       hasMore: paginatedResult.moreData,
//       link: paginatedResult.link,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error." });
//   }
// };

const getAllWallpapers = async (req, res) => {
  try {
    console.log("Fetching random wallpapers");
    // const { page = 1, limit = 12 } = req.query;
    const wallpapers = await WallpaperModel.aggregate([
      { $sample: { size: 48 } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
    ]);
    // const paginatedResult = applyPagination(wallpapers, page, limit);
    // return res.status(200).json({
    //   wallpapers: paginatedResult.data,
    //   currentPage: paginatedResult.currentPage,
    //   totalPages: paginatedResult.totalPages,
    //   dataPerPage: paginatedResult.dataPerPage,
    //   hasMore: paginatedResult.moreData,
    //   link: paginatedResult.link,
    // });

    return res.status(200).json({
      wallpapers,
      message: "Successfully fetched 50 random wallpapers with categories.",
    });
  } catch (error) {
    console.error("Error fetching wallpapers:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

const getWallpaperById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const wallpaper = await WallpaperModel.findById(id).populate("category");

    if (!wallpaper) {
      return res.status(404).json({ message: "Wallpaper not found." });
    }

    const isFavorite = await FavouriteModel.exists({
      user: userId,
      wallpaper: id,
    });

    return res.status(200).json({
      wallpaper,
      favorite: !!isFavorite,
    });
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

const getWallpapersByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const wallpapers = await WallpaperModel.find({ category }).populate(
      "category"
    );

    if (!wallpapers.length) {
      return res
        .status(404)
        .json({ message: "No wallpapers found for this category." });
    }

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
  getWallpapersByCategory,
};
