const http = require('http');
const app = require('./app');
const config = require('./config');

// Create server
const server = http.createServer(app);
server.listen(config.PORT);
console.log(`The server is listening on port ${config.PORT}...`);