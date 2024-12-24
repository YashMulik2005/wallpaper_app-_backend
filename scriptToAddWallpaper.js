const axios = require("axios");
const fs = require("fs");
const csv = require("csv-parser");

const CATEGORY_API_BY_NAME_URL =
  "http://localhost:3000/api/category/categories/name"; // Endpoint to get category by name
const WALLPAPER_API_URL = "http://localhost:3000/api/wallpaper/wallpapers"; // Endpoint to add wallpapers

// Fetch a category by its name
const fetchCategoryByName = async (name) => {
  try {
    console.log(`${CATEGORY_API_BY_NAME_URL}/${name}`);
    const response = await axios.get(`${CATEGORY_API_BY_NAME_URL}/${name}`);
    return response.data._id; // Return the category ID
  } catch (error) {
    console.warn(`Category not found for name: ${name}`);
    return null;
  }
};

// Read CSV file and process each row
const processCSV = async (filePath) => {
  const wallpapers = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        wallpapers.push(row); // Collect each row
      })
      .on("end", () => resolve(wallpapers))
      .on("error", (error) => reject(error));
  });
};

// Add wallpapers using the API
const addWallpapers = async (wallpapers) => {
  for (const row of wallpapers) {
    try {
      const categoryName = row["CATEGORY"];
      const imageUrl = row["URL"];

      if (!categoryName || !imageUrl) {
        console.warn("Missing category or URL in row:", row);
        continue;
      }

      // Fetch category ID by name
      const categoryId = await fetchCategoryByName(categoryName);
      if (!categoryId) {
        console.warn(
          `Skipping wallpaper as category not found: ${categoryName}`
        );
        continue;
      }

      // Add the wallpaper
      const wallpaper = { category: categoryId, image: imageUrl };
      await axios.post(WALLPAPER_API_URL, wallpaper);
      console.log(`Successfully added wallpaper: ${imageUrl}`);
    } catch (error) {
      console.error(
        `Error adding wallpaper for row: ${JSON.stringify(row)}`,
        error
      );
    }
  }
};

// Main function
const main = async () => {
  const filePath = "./newdata.csv"; // Update with the correct file path

  try {
    console.log("Processing CSV file...");
    const wallpapers = await processCSV(filePath);

    console.log("Adding wallpapers...");
    await addWallpapers(wallpapers);

    console.log("All wallpapers processed.");
  } catch (error) {
    console.error("Script error:", error);
  }
};

main();
