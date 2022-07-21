/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import authMiddleware from 'middlewares/auth.middleware';
import mongoose from 'mongoose';
import authRouter from 'routes/auth.routes';
import userRouter from 'routes/user.routes';
import movieRouter from 'routes/movie.routes';
import listRouter from 'routes/list.routes';
import customizeMorgan from 'middlewares/morgan.middleware';

const app = express();
const { connect } = mongoose;

connect(process.env.NX_MONGODB_URI, () => {
  console.log('connect successfully!');
});

app.use(express.json());
app.use(customizeMorgan);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', authMiddleware, userRouter);
app.use('/api/v1/movie', authMiddleware, movieRouter);
app.use('/api/v1/list', authMiddleware, listRouter);

const port = process.env.port || 3333;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
