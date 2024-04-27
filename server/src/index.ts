import express, { Express } from "express";
import { db } from "./config/db";
import 'dotenv/config'
import cors from 'cors';
import router from './routes'
import cookieParser from 'cookie-parser'
import bodyParser from "body-parser";

export const app: Express = express(); //initalize expre
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3001; //set port number
const env = process.env.NODE_ENV === 'production' ? 'production' : 'development' //env awareness

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json())

const corsOptions: cors.CorsOptions = {
    credentials: true,
    origin: env === 'development' ? ['http://localhost:5173'] : ['https://tomato-duck-v2.vercel.app']
  };
  
  app.use(cors(corsOptions));

  app.use(router)


  db.once('open', () => 
    app.listen(PORT, () => console.log(`Server Running! Port: ${PORT}`))
)