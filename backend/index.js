const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const User = require("./user");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Enable CORS
app.use(cors());
app.use(express.json());

// Route to handle storing user data along with image upload
app.get("/", (req, res) => {
  res.send("Vivo Server Running");
});

app.post("/api/register", upload.single("file"), async (req, res) => {
  try {
    let imageUrl;

    if (req.file) {
      const base64String = req.file.buffer.toString("base64");
      // Upload base64 image to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${base64String}`
      );
      imageUrl = result.secure_url;
    }

    // Create new user
    const newUser = new User({
      name: req.body.name,
      contact: req.body.contact,
      gender: req.body.gender,
      age: req.body.age,
      email: req.body.email,
      state: req.body.state,
      rating: req.body.rating,
      purchaseDecision: req.body.purchaseDecision,
      profession: req.body.profession,
      handset: req.body.handset,
      usage_duration: req.body.usage_duration,
      phonePurchase: req.body.phonePurchase,
      other_phonePurchase: req.body.other_phonePurchase,
      features: req.body.features,
      cameraMode: req.body.cameraMode,
      weddingFeature: req.body.weddingFeature,
      vzCollab: req.body.vzCollab,
      weddingClick: req.body.weddingClick,
      selfCapture: req.body.selfCapture,
      weddingPhotographyEngagement: req.body.weddingPhotographyEngagement,
      favoriteEvent: req.body.favoriteEvent,
      futureFeatures: req.body.futureFeatures,
      weddingPhotographyAwareness: req.body.weddingPhotographyAwareness,
      weddingScenario: req.body.weddingScenario,
      v50Photography: req.body.v50Photography,
      v50NextPurchase: req.body.v50NextPurchase,
    });

    // Save user to MongoDB
    await newUser.save();

    res.status(201).json({ message: "Data stored successfully" });
  } catch (error) {
    console.error("Error storing user data:", error);
    res.status(500).json({ error: "Error storing user data" });
  }
});

// Route to fetch all user data
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
