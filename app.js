const express = require('express');
const app = express();
const https = require('https');
const socketio= require('socket.io');

const server=https.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.set(express.static(path.join(__dirname,"public")));

io.on("connection",function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location",{id: socket.id, ...data});
    });
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id);
    }")
});

app.get("/",function(req,res){
    res.render(index);
});

server.listen(3000,function(){
    console.log("Server started on port 3000");
});