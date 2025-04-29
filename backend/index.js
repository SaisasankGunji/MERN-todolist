require("dotenv").config(); // Load environment variables at the top

const express = require("express");
const mongoose = require("mongoose");
const { taskRouter } = require("./routes/taskRouter");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    status: 200,
    msg: "Welcome to Home",
  });
});

app.use("/", taskRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB connected");
    app.listen(8000, () => console.log("Server is running at PORT 8000"));
  })
  .catch((err) => console.log(err));
