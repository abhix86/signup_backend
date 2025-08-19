import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controllers.js';
import { db } from '../db.js';

const authRouter = Router();

authRouter.post('/sign-up', signUp)

authRouter.get(`/users/response.json`, (req, res) => {
  const latestUser = db[db.length - 1]; 
  res.json(latestUser || {});
});

authRouter.post('/sign-in', signIn)
authRouter.post('/sign-out', signOut)

export default authRouter;