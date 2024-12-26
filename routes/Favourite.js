const express = require("express");
const { addFavourite, getUserFavourites } = require("../controllers/Favourite");
const authMiddleware = require("../utils/tokenMiddleware");

const router = express.Router();

router.post("/favourites", authMiddleware, addFavourite);
router.get("/favourites", authMiddleware, getUserFavourites);

module.exports = router;
