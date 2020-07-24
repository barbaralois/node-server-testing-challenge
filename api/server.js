const express = require('express');

const server = express();
const AnimalsRouter = require('../animals/animalsRouter.js');

server.use(express.json());
server.use('/api/animals', AnimalsRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

module.exports = server;
