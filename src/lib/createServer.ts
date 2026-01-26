import express from 'express'
import * as dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import whitelist from './whitelist.js';
import path from 'path';

import {logger} from '../middleware/logEvents.js';
import errorHandler from '../middleware/errorHandler.js';
// import verifyJWT from '../middleware/verifyJWT';



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

// custom middleware to check if the user is authenticated
app.use(logger)

app.use(cors(corsOptions))
app.use(cookieParser()) // required for cookie handling in auth
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// serve static files from the public directory
// app.use('/', express.static(path.join(__dirname, '/public')));
// app.use('/uploads', express.static(path.join(__dirname, '../../public')));

// Load routers
// import("../metrics/metrics.router").then(module => module.default(app));
// import("../auth/auth.router").then(module => module.default(app));

app.get('/', (req, res) => {
    res.send(`The server is working: ${new Date()}`)
})

// app.get('/uploads/:filename', (req, res) => {
//   console.log('Download request for file:', req.params.filename);
//   let filePath = path.join(DIR, `${req.params.filename}`);
//   console.log('Resolved file path:', filePath);
//   // Use res.download to send the file as an attachment
//   res.download(filePath, req.params.filename, (err) => {
//     if (err) {
//       res.status(404).json({ error: 'File not found' })
//     }
//   })
// })

// route handlers
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is healthy' })
})
app.get('/status', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' })
})  

// everything below this point requires authentication
// app.use(verifyJWT)


// app.use('/*', require('../routes/maintenance')); // catch all routes and display maintenance page
// app.use('/', require('../routes/root')); // root route
// app.use('/subdir', require('../routes/subdir'));
// app.use('/employees', require('../routes/api/employees')); // api route



// app.get('/hello(.html)?', (req, res, next) => {
//     console.log('attempted to load hello.html')
//     next()
// }, (req, res) => {
//     res.send('Hello World!')
// });

// const one = (req:any, res:any, next:any) => {
//   console.log('This is the first middleware')
//   next()
// }
// const two = (req:any, res:any, next:any) => {
//     console.log('This is the second middleware')
//     next()
// }
// const three = (req:any, res:any) => {
//     console.log('This is the third middleware')
//     res.send('This is the response from the third middleware')
// }
// app.get('/three-middleware', [one, two, three]);

// app.all('*', (req, res) => {
//   if (req.accepts('html')) {
//     // if the request accepts HTML, send a 404 page
//    res.status(404).sendFile(path.join(__dirname, '../../public/views', '404.html'))

//   } else if (req.accepts('json')) {
//     // if the request accepts JSON, send a 404 JSON response
//     res.status(404).json({ error: 'Not Found' })
//   } else {

//     res.type('txt').status(404).send('Not Found') // if the request accepts neither HTML nor JSON, send a plain text response
//   }
// })

app.use(errorHandler);

export default app
