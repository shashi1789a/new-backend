import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env"
});


connectDB()

















/*
import express from "express";
const app = express();
(async()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error", ()=>{
        console.log("bd not talk",error);
        throw Error
        
       })
app.listen(process.env.PORT,() =>{
  console.log(`app listening on ${process.env.PORT}`);
    })


    } catch (error) {
        console.error("error", error);
        throw error
        
    }
})()*/