import express from 'express';


import 'dotenv/config'; 


import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase  from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import cors  from 'cors'
const app = express();



import { PORT } from './config/env.js';




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded( { extended: false } ));
app.use(cookieParser())




app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter)

app.use(errorMiddleware);

/* import cors from 'cors';
app.use(cors());
 */
app.get('/', (req, res) => {
    res.send("Seems it works")
});


const port = process.env.PORT || PORT || 5500;
app.listen(port, async () => {
    console.log(`Server is running http:://localhost:${port}`)

    await connectToDatabase()
});

export default app;

