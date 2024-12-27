const express = require("express");
const {
  addWallpaper,
  getAllWallpapers,
  getWallpaperById,
  getRandomWallpapers,
  getWallpapersByCategory,
} = require("../controllers/Wallpepar");
const authMiddleware = require("../utils/tokenMiddleware");

const router = express.Router();

router.get("/wallpapers/random", getRandomWallpapers);
router.post("/wallpapers", addWallpaper);
router.get("/wallpapers", getAllWallpapers);
router.get("/wallpapers/:id", authMiddleware, getWallpaperById);
router.get("/wallpapers/category/:category", getWallpapersByCategory);

module.exports = router;
