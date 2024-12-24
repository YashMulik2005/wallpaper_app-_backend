const mongoose = require("mongoose");

const WallpaperSchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const WallpaperModel = mongoose.model("wallpaper", WallpaperSchema);
module.exports = WallpaperModel;
