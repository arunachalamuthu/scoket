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
app.get('/api', (req, res) => {
  res.json('work')
});
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
   
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


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

server.listen(4055, () => {
  console.log('listening on *:3000');
});


// const express = require("express");
// const app = express();
// const http = require("http");
// const path = require("path");
// var server = http.createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     credentials: true,
//     methods: ["GET", "POST"],
//   },
// });

// const port = process.env.PORT || 8000;
// // const Message = require("./message_model");
// // const mongoose = require("mongoose");
// // mongoose
// //   .connect(MONGODB_URI, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //     useFindAndModify: false,
// //   })
// //   .then((result) => {
//     server.listen(port, () => {
//       console.log(`Listening on port ${port}...`);
//     });
//   // })
// //   .catch((err) => {
// //     console.log(err);
// //   });
// // app.use(express.static(path.join(__dirname, "..", "client", "build")));
// const users = [];
// io.on("connection", (socket) => {
//   // users.push({ id: socket.id });
//   // io.emit("users", { users: users });
//   // Message.find()
//   //   .sort({ createdAt: -1 })
//   //   .limit(10)
//   //   .exec((err, messages) => {
//   //     if (err) return console.error(err);
//   //     socket.emit("init", messages);
//   //   });
//   socket.on("message", (msg) => {
//     // const message = new Message({
//     //   content: msg.content,
//     //   name: msg.name,
//     // });
//     // message.save((err) => {
//     //   if (err) return console.error(err);
//     // });
//     // socket.broadcast.emit("push", msg);
//   });
//   socket.on('join_room',(data)=>{
//     console.log(data);
//   socket.join(data)

// }) 
// socket.on('sec-room',(data)=>{
//  console.log(data);
// socket.join(data)

// })
// socket.on("send_message",(data)=>{
      
//     console.log(data);
//   //   socket.broadcast.emit("receive_message",data)
//     // socket.broadcast.emit("receive_front",data.message)
//      socket.to(data.room).emit('receive_message',data.message)
// })


// socket.on("sec_message",(data)=>{
  
//   console.log(data);
// //   socket.broadcast.emit("receive_message",data)
//  console.log(data);
//    socket.to(data.secID).emit('secreceive_message',data.message)
// })

//   socket.on("disconnect", (reason) => {
//     // let index = -1;
//     // for (let i = 0; i < users.length; i++) {
//     //   const user = users[i];
//     //   if (user.id === socket.id) {
//     //     index = i;
//     //   }
//     // }
//     // if (index !== -1) {
//     //   users.splice(index, 1);
//     // }
//     // io.emit("users", { users: users });
//   });
// });
// app.get("/api", (req, res) => {
//   res.json("Giphy Chat Server is running successfully");
// });
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//   next();
// });