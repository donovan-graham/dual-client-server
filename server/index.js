const express = require('express');
const path = require('path');
const fs = require('fs');

const server = express();

const clientDistPath = path.join(__dirname, '../dist/client');
const clientDistStaticPath = path.join(clientDistPath, 'static');

server.use('/static', express.static(clientDistPath));

server.get('/', (req, res) => {
  const html = fs.readFileSync(path.join(clientDistPath, 'index.html'), 'utf-8');
  const mod = html.replace('</head>', '<style>body { background-color: papayawhip; } </style></head>');
  res.send(mod);
});

server.listen(3000);
