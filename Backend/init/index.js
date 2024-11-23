import express from "express";
import mongoose from "mongoose";
import {Posts} from "../Models/Posts.js";
import initData from "./data.js";

const PORT = 3001;
const app = express();
main()
  .then(() => {
    console.log("connect successfully");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://localhost:27017/newDb");
}

app.listen(PORT, () => {
  console.log("app is listening on port: ", PORT);
});
const initDB = async () => {
    await Posts.deleteMany({});
    // const updatedData = initData.map((obj) => ({
    //   ...obj,
    //   owner: "674075938b5faca7a9df3efc", // Adding the owner field
    // }));
    // await Posts.insertMany(updatedData);
  
    await Posts.insertMany(initData);
  
    console.log("data was initialized");
  };
  initDB();
