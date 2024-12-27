const express = require("express");
const {
  addFavourite,
  getUserFavourites,
  removeFavourite,
} = require("../controllers/Favourite");
const authMiddleware = require("../utils/tokenMiddleware");

const router = express.Router();

router.post("/favourites", authMiddleware, addFavourite);
router.get("/favourites", authMiddleware, getUserFavourites);
router.post("/favourites/remove", authMiddleware, removeFavourite);

module.exports = router;
