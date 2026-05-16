const express = require("express");
const fs =require("fs");

const userRouter= require("./routes/user");
const app = express();

const PORT = 8000;
const {connectMongoDb} = require("./connection");

const {logReqRes}=require("./middlewares");

//connection
connectMongoDb("mongodb://127.0.0.1:27017/anshu-app1").then(() => console.log("Connected to MongoDB"));

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"));

//routes
app.use("/api/users",userRouter);
app.listen(PORT, () => 
    console.log(`Server Started at PORT: ${PORT}`)
);