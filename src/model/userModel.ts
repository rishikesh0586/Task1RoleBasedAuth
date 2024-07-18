import jwt,{ Jwt } from 'jsonwebtoken';
import mongoose, { Document, Schema, model,Model, Types} from 'mongoose';
import validator from 'validator';
import { IRole,Role } from './roleModel.js';


export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: Types.ObjectId | IRole;
  createdAt: Date;
  getJWTToken: () => string;
  comparePassword: (password: string) => boolean;
}
const userSchema = new Schema <IUser>({
  name: {
    type: String,
    required: [true, "enter name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [4, "Password should be greater than 6characters"],
    select: false,
  },
 
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role', 
    required: true,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});


// jwt token
userSchema.methods.getJWTToken = function (){
  return jwt.sign({ id: this._id }, "aabbccdd", {
    expiresIn: 5,
  });
};

// Add the comparePassword method to the schema.
userSchema.methods.comparePassword = function (password: string): boolean {
  return password === this.password;
};

// Create a Model.
const user: Model<IUser> = model<IUser>('User', userSchema);
   export default user;
