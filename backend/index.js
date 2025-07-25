const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { taskRouter } = require("./routes/taskRouter");
const authRouter = require("./routes/authRouter");
const isAuth = require("./middleware/isAuth");

const app = express();

const allowedOrigins = [
  "https://mern-todolist-lovat.vercel.app",
  "http://localhost:5173",
];

app.use(cookieParser());
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
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ status: 200, msg: "Welcome to Home" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", isAuth, taskRouter);

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
  .catch((err) => console.error("MongoDB connection error:", err));
