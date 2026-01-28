import express from 'express'
import * as dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import whitelist from './whitelist.js';
import {logger} from '../middleware/logEvents.js';
import errorHandler from '../middleware/errorHandler.js';
import projectRouter from '../project/project.router.js';
import personRouter from '../person/person.router.js';
import effortRouter from '../effort/effort.router.js';
// import verifyJWT from '../middleware/verifyJWT';
// import path from 'path';

// const DIR = '../public/uploads'
// const __dirname = path.dirname(DIR);

const app = express()

dotenv.config();

// console.log('uploads path: ', path.join(__dirname, '../../public/uploads'));

const corsOptions = {
  origin: (origin:any, callback:any) => {
    // todo production remove !origin and clean whitelist
    if (whitelist.includes(origin) || !origin) { // allow requests with no origin (like mobile apps or curl requests)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, // allow cookies to be sent with requests
}

// Middleware to handle Private Network Access (for HTTPS->localhost requests)
app.use((req, res, next) => {
  // Handle preflight requests for Private Network Access
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
  }
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  next();
});

// custom middleware to check if the user is authenticated
app.use(logger)

app.use(cors(corsOptions))
app.use(cookieParser()) // required for cookie handling in auth
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.get('/', (req, res) => {
    res.send(`The server is working: ${new Date()}`)
})

// route handlers
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is healthy' })
})
app.get('/status', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' })
})  

// everything below this point requires authentication
// app.use(verifyJWT)
app.use('/project', projectRouter);
app.use('/person', personRouter);
app.use('/effort', effortRouter);


app.use(errorHandler);

export default app
