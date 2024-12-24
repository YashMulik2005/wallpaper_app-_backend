const express = require("express");
const {
  addWallpaper,
  getAllWallpapers,
  getWallpaperById,
  getRandomWallpapers,
} = require("../controllers/Wallpepar");

const router = express.Router();

router.post("/wallpapers", addWallpaper);
router.get("/wallpapers", getAllWallpapers);
router.get("/wallpapers/:id", getWallpaperById);
router.get("/wallpapers/random", getRandomWallpapers);

module.exports = router;
