import { Router, Request, Response } from 'express';
import { User } from '../../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, process.env.TOKEN_SECRET as string);
    res.json({ token });
  } else {
    res.status(400).json({ message: 'Invalid username or password' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
