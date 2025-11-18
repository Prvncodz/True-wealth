import express from "express"
import cors from "cors"
import path from "path"
import dotenv from "dotenv"
import { dbConn } from "./mongo.db.js"
import {User} from "./user.model.js"

const app=express()
//configs
app.use(express.static("public"))
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credintials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))


dbConn
.then(()=>{

    app.listen(process.env.PORT||8000,(req,res)=>{
      console.log("server running at port:",process.env.PORT)
    })

    app.post("/form",async (req,res)=>{
     const {name,email,number}=req.body;
     if(!name){
        console.log("name is required to submit request")
      }
    if(!number){
        console.log("number is required to submit request ")
      }
      const user= await User.create({
        name,
        email:email?email:"",
        number
      })
      if(!user){
        console.log("unable to create user")
      }
      return res
      .status(200)
      .json({
      message:"user details submitted successfully",
      success:true
        })
    });

    app.on("error",()=>{
      console.log("server failed to run")
    })

  })

.catch(error=>{
    console.log("error :",error.message)
  })


