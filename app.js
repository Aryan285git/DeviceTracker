const express = require('express');
const app = express();
const https = require('https');
const socketio= require('socket.io');

const server=https.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.set(express.static(path.join(__dirname,"public")));



app.get("/",function(req,res){
    res.send("Hello world");
});

server.listen(3000,function(){
    console.log("Server started on port 3000");
});