import express from 'express';
import { Role,IRole } from '../model/roleModel.js';
import mongoose from 'mongoose';
import User from "../model/userModel.js";
import { verifyAdmin } from '../middleware/auth.js'; 
import {Request, Response,NextFunction} from 'express';


//create roles
export const createRole= async (req:Request, res:Response) => {
  const { name, permissions } = req.body;

  try {
    const existingRole = await Role.findOne({ name });
    if (existingRole) return res.status(400).json({ message: 'Role already exists' });

    const newRole = new Role({ name, permissions });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating role' });
  }
};



// Assign Role to User 
export const asignRole= async function (req: Request, res: Response) {
  const { userId, roleId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const role = await Role.findById(roleId);
      if (!role) return res.status(404).json({ message: 'Role not found' });
  
      // Type assertion to ensure role is of type IRole
      if (role instanceof mongoose.Document && role._id) {
        user.role = role._id as mongoose.Types.ObjectId;
        await user.save();
        res.json({ message: 'Role assigned successfully' });
      } else {
        console.error('Unexpected role type. Cannot assign to user.role');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error assigning role' });
    }
  }
  
  export const getAllRole = async (req:Request, res:Response, next:NextFunction)  => {
    const roles = await Role.find();
  
    res.status(200).json({
      success: true,
      roles,
    });
  };
