const express = require("express");
const {
  addWallpaper,
  getAllWallpapers,
  getWallpaperById,
  getRandomWallpapers,
  getWallpapersByCategory,
} = require("../controllers/Wallpepar");

const router = express.Router();

router.post("/wallpapers", addWallpaper);
router.get("/wallpapers", getAllWallpapers);
router.get("/wallpapers/:id", getWallpaperById);
router.get("/wallpapers/random", getRandomWallpapers);
router.get("/wallpapers/category/:category", getWallpapersByCategory);

module.exports = router;
