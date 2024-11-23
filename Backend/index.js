import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
// 
import userRoute  from "./route/userRoute.js";
import homeRoute from "./route/homeRoute.js"
import ExpressError from "./utils/ExpressError.js"
const app = express();
dotenv.config();
const Port = process.env.Port || 8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const corsOptions = {
  origin: "http://localhost:3000", // Your frontend URL
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));
main()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.use("/",homeRoute)
app.use("/api/v1/auth/",userRoute);

app.all("/*", (req, res, next) => {
  next(new ExpressError(400, "Page Not Found!"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({message});
});

app.listen(Port,()=>{
    console.log("app is listening on Port: ",Port);
})