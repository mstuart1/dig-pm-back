import app from './lib/createServer.js'
// import logEvents from './middleware/logEvents.js'
import dotenv from 'dotenv'

dotenv.config();
// import EventEmitter = require('events');

let port = process.env.API_PORT || 'no port defined';

app.listen(port, () => {
    // console.log(`🚀 Server ready at: http://0.0.0.0:${port}`)
    // logEvents(`Server started on port ${port}`, 'server.log')
}).on('error', (err) => {
    console.error(`Error starting server: ${err.message}`);
    // logEvents(`Error starting server: ${err.message}`, 'server.log');
});

