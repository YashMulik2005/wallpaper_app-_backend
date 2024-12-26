const mongoose = require("mongoose");

const FavouriteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  wallpaper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "wallpaper",
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const FavouriteModel = mongoose.model("favourite", FavouriteSchema);
module.exports = FavouriteModel;
