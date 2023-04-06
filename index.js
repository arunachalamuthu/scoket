// const express = require('express');

// const http = require('http');
// const cors=require('cors')

// const { Server } = require("socket.io");
import express from 'express'
import http from 'http'
import { Server } from 'socket.io';
import cors from 'cors'

const app = express();
const server = http.createServer(app);
app.use(cors())
app.get('/', (req, res) => {
  res.json('work')
});
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})
io.on('connection', (socket) => {
  console.log(`a user connected ${socket.id}`);


  socket.on('join_room',(data)=>{
    console.log(data);
  socket.join(data)

}) 
socket.on('sec-room',(data)=>{
 console.log(data);
socket.join(data)

})




socket.on("send_message",(data)=>{
      
    console.log(data);
  //   socket.broadcast.emit("receive_message",data)
    // socket.broadcast.emit("receive_front",data.message)
     socket.to(data.room).emit('receive_message',data.message)
})


socket.on("sec_message",(data)=>{
  
  console.log(data);
//   socket.broadcast.emit("receive_message",data)
 console.log(data);
   socket.to(data.secID).emit('secreceive_message',data.message)
})
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});