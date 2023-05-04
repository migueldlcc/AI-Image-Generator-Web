const { Configuration, OpenAIApi } = require("openai");
const mysql = require("mysql");
const { response } = require("express");
const sharp = require("sharp");

// Connection to database
const connection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: '',
  port: ''
});

/* Dall-E endpoint */
const configuration = new Configuration({
  apiKey: "",
});

/* Pass the OpenAi configuration */
const openai = new OpenAIApi(configuration);

/* Dall-E POST request here. Where do I listen to the request, and the function that runs when the endpoint is hit. Also the image generated is inserted in the database */
const postArtworks = async (req, res = response) => {
  const { prompt, email } = req.body;

  try {
    // Request to OpenAI API's
    const response = await openai.createImage({
      prompt: prompt, // Prompt passed by the user
      n: 4, // Number of images generated
      size: "256x256", // Size of each image
      response_format: "b64_json", // Format in which the response data is returned
    });

    // Extract the Base64-encoded JSON for each generated image and store it in the imageUrls variable
    const imageUrls = response.data.data.map((data) => data.b64_json);

    // Features added to each image generated and insertion in the database
    imageUrls.forEach(async (imageUrl) => {
      try {
        var date = new Date();
        var setYear = date.toLocaleDateString("default", { year: "numeric" }); // String format year to '2000'
        var setMonth = date.toLocaleDateString("default", { month: "2-digit" }); // String format month to '01'
        var setDay = date.toLocaleDateString("default", { day: "2-digit" }); // String format day to '01'
        const dateFormatted = setYear + "-" + setMonth + "-" + setDay;
        const i_saved = "0";
        const i_bought = "0";
        const i_shared = "0";
        const i_likes = "0";

        // Convert the imageUrl variable to base64 string
        const base64String = imageUrl.toString();
        // Convert the base64String into a buffer so that it can be passed to the sharp function, allowing more flexibility to handle the image data later for resizing
        const buffer = Buffer.from(base64String, "base64");

        // Resize image to 128x128 pixels
        const link_medium = await sharp(buffer)
          .resize(128, 128)
          .png({ quality: 80 })
          .toBuffer();

        // Resize image to 64x64 pixels
        const link_small = await sharp(buffer)
          .resize(64, 64)
          .png({ quality: 80 })
          .toBuffer();

        // Insert the links of the image generated, shared, saved, bought and likes status, date of generation, user profile, and prompt into the database
        connection.query(
          "INSERT INTO image (i_link, i_saved, i_bought, i_shared, i_date, profile_p_email, i_searchword, i_linkmedium, i_linksmall, i_likes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
          [imageUrl, i_saved, i_bought, i_shared, dateFormatted, email, prompt, link_medium, link_small, i_likes], (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({
                success: false,
                message: "An error occurred while inserting the image.",
              });
            }

            console.log("Image inserted successfully.");
          }
        );
      } catch (err) {
        console.log(err);
      }
    });
    // Send JSON response to the HTTP request made by the user
    res.json({
      success: true,
      message: "Images saved",
      imageUrls: imageUrls,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      error: error.response ? error.response.data : "Bad Request",
    });
  }
};

/* Get nine random images from the database that are not bought and saved to be displayed in the front end of the homepage */
const getNineImages = async (req, res = response) => {
  try {
    connection.query(
      "SELECT i_id, i_link FROM image WHERE i_saved = 0 AND i_bought = 0 ORDER BY RAND() LIMIT 9", (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send("Error retrieving image from database");
          return;
        }
        // For each object in the results array, a new object gets created in the image array with two properties
        const images = results.map((result) => ({
          id: result.i_id, // image id
          link: result.i_link.toString("utf-8"), // image link converted to utf-8 format
        }));
        // Send JSON response to the HTTP request made by the user
        res.json(images);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving image from database");
  }
};

/* Get one random image from the database that are not bought, saved, and shared to be displayed in the front end of the explorepage */
const getOneImages = async (req, res = response) => {
  try {
    connection.query(
      "SELECT i_id, i_link, i_likes FROM image WHERE i_saved = 0 AND i_bought = 0 AND i_shared = 1 ORDER BY RAND() LIMIT 1", (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send("Error retrieving image from database");
          return;
        }
        // For each object in the results array, a new object gets created in the image array with three properties
        const images = results.map((result) => ({
          id: result.i_id, // image id
          link: result.i_link.toString("utf-8"), // image link converted to utf-8 format
          likes: result.i_likes, // number of likes the image ahs
        }));
        // Send JSON response to the HTTP request made by the user
        res.json(images);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving image from database");
  }
};

/* Get the last four images in the database in descendent order to be displayed in the front end of the showimagepage */
const getLastFourImages = async (req, res = response) => {
  try {
    connection.query(
      "SELECT i_id, i_link FROM image ORDER BY i_id DESC LIMIT 4", (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send("Error retrieving image from database");
          return;
        }
        // For each object in the results array, a new object gets created in the image array with two properties
        const images = results.map((result) => ({
          id: result.i_id, // image id
          link: result.i_link.toString("utf-8"), // image link converted to utf-8 format
        }));
        // Send JSON response to the HTTP request made by the user
        res.json(images);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving image from database");
  }
};

/* Get the 64x64 image in the database to be displayed in the cart and in the front end of the checkoutpage */
const getSmallImages = async (req, res = response) => {
  const { id } = req.body;

  try {
    connection.query(
      "SELECT i_linksmall FROM image WHERE i_id = ?", [id], (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send("Error retrieving image from database");
          return;
        }

        const imageBuffer = results[0].i_linksmall; // Access the first object in the results array and retrieve the value of the i_linksmall property
        const base64String = imageBuffer.toString("base64"); 
        // Send JSON response to the HTTP request made by the user
        res.json(base64String);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving image from database");
  }
};

/* Get the image in the database to be displayed in the front end of the downloadpage once the image is purchased */
const getLargeImages = async (req, res = response) => {
  const { id } = req.body;

  try {
    connection.query(
      "SELECT i_link FROM image WHERE i_id = ?", [id], (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send("Error retrieving image from database");
          return;
        }

        const imageBuffer = results[0].i_link; // Access the first object in the results array and retrieve the value of the i_link property
        const base64String = imageBuffer.toString("utf-8"); 
        // Send JSON response to the HTTP request made by the user
        res.json(base64String);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving image from database");
  }
};

module.exports = {
  getNineImages,
  getOneImages,
  getLastFourImages,
  getSmallImages,
  getLargeImages,
  postArtworks,
};
