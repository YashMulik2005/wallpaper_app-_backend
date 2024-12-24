const express = require("express");
const app = express();
const mongoose = require("mongoose");

const categoryRoutes = require("./routes/Category");
const wallpaperRoutes = require("./routes/Wallpaper");

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

mongoose.set("strictQuery", false);
var db =
  "mongodb+srv://yashmulik95:q4zKP35YBxfp2YYH@cluster0.to2me.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/category", categoryRoutes);
app.use("/api/wallpaper", wallpaperRoutes);

app.listen(3000, () => {
  console.log("server is running.");
});
