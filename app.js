import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';

import { PORT } from './config/env.js';

const app = express();


app.use(cors({
    origin: '*', 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);


app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.send("Well, this works!");
});


const port = process.env.PORT || PORT || 5500;
app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    await connectToDatabase();
});

export default app;
