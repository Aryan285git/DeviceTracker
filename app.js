const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

// Use http.createServer instead of https.createServer
const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public"))); // Corrected line

io.on("connection", function(socket) {
    socket.on("send-location", function(data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });
    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id);
    });
});

app.get("/", function(req, res) {
    res.render("index");
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
