import connectDB from "./db/index.js";
import dotenv from "dotenv";
import {app} from "./app.js"
dotenv.config({
  path: "./.env"
});


connectDB()    //async method jab bhi complete hota hai tab o ek promiss return karta hai async db file me hai
.then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})
.catch((err) => {
  console.log("MONGOBD connnection error index file", console.error());
  
})

















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