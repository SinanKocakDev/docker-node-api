import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import {
  getAllUsers,
  registerUser,
} from "./controllers/userController.js";
const app = express();
const port = 3000;

app.use(morgan("dev"))

app.use(express.json())

app.get("/", getAllUsers);
app.post("/create", registerUser)
app.get("/test", (req,res) => {
  res.send("hello test")
})

mongoose
  .connect("mongodb://mongo_container/dbTest")
  .then(() => {
    console.log("connected to DB successfully");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
