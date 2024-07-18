import express from 'express';
// Import JWT library
import  User  from '../model/userModel.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IRole } from '../model/roleModel.js';
import { IUser } from '../model/userModel.js'; // Ensure correct import path

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
  }
}
interface CustomJwtPayload extends JwtPayload {
  userId: string;
}
export const verifyAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, "aabbccdd") as CustomJwtPayload;// Replace with your JWT secret
    const user = await User.findById(decoded.userId).populate<{ role: IRole }>('role');
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    // Ensure role is populated
    if (!user.role || !('name' in user.role)) {
      return res.status(403).json({ message: 'Forbidden (Role not found or not populated)' });
    }

    // Check if user has 'admin' role
    if (user.role.name !== 'admin') {
      return res.status(403).json({ message: 'Forbidden (Admin access required)' });
    }
    req.user = user; // Attach user object to request object for further use
    next(); // Continue with the route handler if user is authorized admin
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
