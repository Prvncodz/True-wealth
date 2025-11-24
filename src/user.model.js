import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
   type:String,
},
  number:{
   type:Number,
   required:true,
  },
  message:{
    type:String,
  }
},{timestamps:true})

export const User= mongoose.model("User",userSchema);

