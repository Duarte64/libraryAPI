import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../users/models/User.model';
import { Request, Response, NextFunction } from 'express';

const secretKey = process.env.SECRET_JWT ?? 'your-secret-key';

class AuthController {
  public static async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed. User not found.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Authentication failed. Invalid credentials.' });
      }
  
      const token = jwt.sign({ sub: user._id, role: user.role, email: user.email }, secretKey, { expiresIn: '1h' });
  
      return res.status(200).json({ token });
    } catch (error) {
      return next(error);
    }
  }
}

export default AuthController;