const http = require('http');
const express = require('express');

const app = express();

//Add Middleware
app.use((req, res, next) => {
    console.log("In the middleware")
    next(); // allows request to continue to next middleware request handler
});

app.use((req, res, next) => {
    console.log("In another middleware");
    
});

const server = http.createServer(app);

server.listen(3000);