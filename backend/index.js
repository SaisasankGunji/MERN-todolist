const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { taskRouter } = require("./routes/taskRouter");

const app = express();

// List of allowed frontend origins
const allowedOrigins = [
  "https://mern-todolist-lovat.vercel.app", // Deployed frontend
  "http://localhost:5173", // Vite local dev
];

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// JSON body parser middleware
app.use(express.json());

// Test home route
app.get("/", (req, res) => {
  res.send({
    status: 200,
    msg: "Welcome to Home",
  });
});

// Route for tasks
app.use("/api/v1", taskRouter);

// MongoDB connection (hardcoded URI)
const MONGO_URI =
  "mongodb+srv://Saisasank:Saisasank%40123@cluster0.y5nye.mongodb.net/Tasks";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
