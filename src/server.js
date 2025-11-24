import express from "express"
import cors from "cors"
import path from "path"
import { dbConn } from "./mongo.db.js"
import {User} from "./user.model.js"
import {fileURLToPath} from 'url'

const app=express()
//configs
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

dbConn
.then(()=>{
     
    app.get("/",(req,res)=>{
      const file=path.join(__dirname,"..","public","index.html");
      return res.sendFile(file);

    });

    app.get("/disclaimer",(req,res)=>{
      const file=path.join(__dirname,"..","public","disclaimer.html");
      return res.sendFile(file);
    });
    
    app.get("/disclosure",(req,res)=>{                   const
    file=path.join(__dirname,"..","public","disclosure.html");
        return res.sendFile(file);
});
    app.get("/aboutus",(req,res)=>{                   const
    file=path.join(__dirname,"..","public","aboutus.html");
        return res.sendFile(file);
});
    app.get("/services",(req,res)=>{                   const
    file=path.join(__dirname,"..","public","services.html");
        return res.sendFile(file);
});
    app.get("/insights",(req,res)=>{                   const
    file=path.join(__dirname,"..","public","insights.html");
        return res.sendFile(file);
});
    app.get("/careers",(req,res)=>{                   const
    file=path.join(__dirname,"..","public","careers.html");
        return res.sendFile(file);
});
    app.get("/contactus",(req,res)=>{                   const
    file=path.join(__dirname,"..","public","contactus.html");
        return res.sendFile(file);
});

    app.post("/form",async (req,res)=>{
     const {name,email,number,message}=req.body;
     if(!name){
        console.log("name is required to submit request")
      }
    if(!number){
        console.log("number is required to submit request ")
      }
      const user= await User.create({
        name,
        email:email?email:"",
        number,
        message:message?message:""
      })
      if(!user){
        console.log("unable to create user")
      }
       console.log(user)
      return res
      .status(200)
      .json({
      message:"user details submitted successfully",user,
      success:true
        })
    });
    
    app.listen(process.env.PORT||8000,(req,res)=>{       console.log("server running at port:",process.env.PORT)                                
    });

    app.on("error",()=>{
      console.log("server failed to run")
    });
     
  })

.catch(error=>{
    console.log("error :",error.message)
  })


