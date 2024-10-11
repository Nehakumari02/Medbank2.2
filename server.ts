import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { Server } from 'socket.io'
import { Socket } from 'dgram'
 
const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

let users:any = [];

const addUser = (userId:any, socketId:any) => {
  !users.some((user:any) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId:any) => {
  users = users.filter((user:any) => user.socketId !== socketId);
};

const getUser = (userId:any) => {
  return users.find((user:any) => user.userId === userId);
};
 
app.prepare().then(() => {
  
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  const io = new Server(httpServer);

  io.on("connection",(socket)=>{
    console.log("connection done",socket.id)
    // socket.on('chat message', (msg) => {
    //   io.emit('chat message', msg); // Broadcast the message to all connected clients
    // });
  
    // socket.on('disconnect', () => {
    //   console.log('User disconnected');
    // });

    //when ceonnect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
      const user = getUser(receiverId);
      console.log(senderId,receiverId,message)
      io.to(user.socketId).emit("getMessage", {
        message
      });
    });

    socket.on("sendTyping", ({ senderId, receiverId, typing }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("sendTyping", {
        senderId,
        typing
      });
    });

    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  })
 
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})
