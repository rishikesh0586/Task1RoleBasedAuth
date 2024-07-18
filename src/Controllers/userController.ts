

import User from "../model/userModel.js";
import sendToken from "../util/sendToken.js";
import { Role } from "../model/roleModel.js";
import express,{Request, Response,NextFunction} from "express";

// Register a User
export const registerUser = async (req:Request, res:Response, next:NextFunction) => {
   try{ 
    const userRole = await Role.findOne({ name: 'user' });
    if (!userRole) {
      throw new Error('Default user role not found');
    }
    const { name, email, password } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
      role: userRole._id 
      
    });
  
    sendToken(user, 201, res);
  
}catch (err) {
console.log(err);
}
}
  
  // Login User
  export const loginUser = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
        res.status(401).json({
            success: false,
            message: "plz enter email and password",
          });
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
        res.status(401).json({
            success: false,
            message: "email not found",
          });
    }
  
    const isPasswordMatched = user?.comparePassword(password);
  
    if (!isPasswordMatched) {
        res.status(401).json({
            success: false,
            message: "password not matched",
          });
    }
   
  
  sendToken(user! , 200, res);
}catch (err) {
console.log(err);
}   
  };
  
  // Logout User
  export const logout = async (req:Request, res:Response, next:NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  };

  // Get all users(admin)
export const getAllUser = async (req:Request, res:Response, next:NextFunction)  => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  };


  