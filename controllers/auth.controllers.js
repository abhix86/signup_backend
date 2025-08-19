import connectToDatabase from '../../../../database/mongodb.js';
import User from '../../../../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../../../../config/env.js';
import { json } from 'micro';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await connectToDatabase();

  try {
    const body = await json(req);
    const { name, email, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: newUser
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const signIn = async (req, res, next) => {}

export const signOut = async (req, res, next) => {}
