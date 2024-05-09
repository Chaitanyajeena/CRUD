const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usermodel = require("./models/Users")
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/crud")

app.get("/",(req,res)=>{                                     // CODE FOR READ ALL DATA FROM DATABASE TO FRONTEND PART
    usermodel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get("/getuser/:id",(req,res)=>{                     // CODE FOR FETACH THE USER DATA BY HIS UNQ ID 
    const id = req.params.id;
    usermodel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put("/updateuser/:id",(req,res)=>{                          // CODE FOR UPDATE USER DETAILS
    const id = req.params.id;
    usermodel.findByIdAndUpdate({_id:id},{
        name: req.body.name, 
        email:req.body.email, 
        age:req.body.age,
    })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.delete('/deleteuser/:id',(req,res)=>{                           // CODE FOR DELETE USER DETAILS
    const id = req.params.id;
    usermodel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post("/createuser" ,(req,res)=>{                                 //CODE FOR CREATE USER 
    usermodel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(3001,()=>{
    console.log("server running");
})