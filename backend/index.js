const express = require("express");
const { default: mongoose } = require("mongoose");
const { taskRouter } = require("./routes/taskRouter");
const taskModel = require("./models/taskModel");
const cors = require("cors");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send({
    status: 200,
    msg: "Welcome to Home",
  });
});
app.use(cors());

app.use("/", taskRouter);

mongoose
  .connect("mongodb://localhost:27017/tasksDB")
  .then(() => {
    console.log("DB connected");
    app.listen(8000, () => console.log("Server is running at PORT 8000"));
  })
  .catch((err) => console.log(err));
