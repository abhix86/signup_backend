import connectToDatabase from '../database/mongodb.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';
import { db } from '../db.js';

export const signUp = async (req, res, next) => {
  try {
    await connectToDatabase();

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Save in in-memory db for testing
    db.push(newUser);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: newUser
      }
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {}

export const signOut = async (req, res, next) => {}
