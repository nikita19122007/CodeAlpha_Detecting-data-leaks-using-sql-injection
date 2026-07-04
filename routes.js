const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./User");
const Task = require("./Task");


// Register User

router.post("/register", async (req,res)=>{

try{

const {name,email,password}=req.body;

const existingUser=await User.findOne({email});

if(existingUser){

return res.status(400).json({
message:"User already exists"
});

}

const hashedPassword=await bcrypt.hash(password,10);

const user=new User({

name,
email,
password:hashedPassword

});

await user.save();

res.json({

message:"Registration Successful"

});

}catch(error){

res.status(500).json(error);

}

});


// Login

router.post("/login",async(req,res)=>{

try{

const {email,password}=req.body;

const user=await User.findOne({email});

if(!user){

return res.status(400).json({
message:"Invalid Email"
});

}

const match=await bcrypt.compare(password,user.password);

if(!match){

return res.status(400).json({
message:"Invalid Password"
});

}

const token=jwt.sign(

{id:user._id},
"mysecretkey",
{expiresIn:"1d"}

);

res.json({

token,
message:"Login Successful"

});

}catch(error){

res.status(500).json(error);

}

});



// Create Task

router.post("/tasks",async(req,res)=>{

const task=new Task(req.body);

await task.save();

res.json(task);

});



// Get All Tasks

router.get("/tasks",async(req,res)=>{

const tasks=await Task.find();

res.json(tasks);

});



// Update Task

router.put("/tasks/:id",async(req,res)=>{

const task=await Task.findByIdAndUpdate(

req.params.id,

req.body,

{new:true}

);

res.json(task);

});




// Delete Task

router.delete("/tasks/:id",async(req,res)=>{

await Task.findByIdAndDelete(req.params.id);

res.json({

message:"Task Deleted"

});

});

module.exports=router;
