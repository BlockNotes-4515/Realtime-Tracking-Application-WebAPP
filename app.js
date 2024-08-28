const express = require('express');
const app = express();
const path = require('path');

const http = require('http'); // Creating the Server.
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server); // Calling Socket.IO.

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the static files directory
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket) {
        socket.on("send-location",function(data){
        io.emit("receive-location", {id: socket.id, ...data});
    });
    socket.on("disconnect",function(){
        io.emit("user-disconnected", socket.id);
    });

    // Example event handling
    socket.on('sendLocation', (data) => {
        console.log('Location received:', data);
    });
});

app.get('/', function(req, res) {
    res.render('index'); // Ensure this matches the name of your EJS file (e.g., index.ejs)
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
