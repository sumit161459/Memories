import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

app.get('/',(req,res)=>{
  res.send('Hello to memories api')
})

// const CONNECTION_URL='mongodb://Indian123:Indian123@cluster0-shard-00-00.roqun.mongodb.net:27017,cluster0-shard-00-01.roqun.mongodb.net:27017,cluster0-shard-00-02.roqun.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-3xr3yp-shard-0&authSource=admin&retryWrites=true&w=majority'
const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);