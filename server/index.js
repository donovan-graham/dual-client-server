const express = require('express');
const path = require('path');

const server = express();

const clientDistPath = path.join(__dirname, '../dist/client');

server.use(express.static(clientDistPath));

server.get('/', (req, res) => res.send('boom'));

server.listen(3000);
