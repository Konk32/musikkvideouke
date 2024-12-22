const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Server statiske filer fra public-mappen
app.use(express.static(path.join(__dirname, 'public')));

// Rute for å vise publikum.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'publikum.html'));
});

// Start serveren på port 3000
server.listen(3000, () => {
  console.log('Serveren kjører på http://localhost:3000');
});
