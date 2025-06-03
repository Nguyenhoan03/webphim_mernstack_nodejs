const express = require('express');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const initRoutes = require('./routes/index');

const app = express();
const server = http.createServer(app);


app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('server', server);

initRoutes(app);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

server.on('error', (error) => {
    console.error(' Server error:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
