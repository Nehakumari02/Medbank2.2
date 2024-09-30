import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { Server } from 'socket.io'
import { Socket } from 'dgram'
 
const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  const io = new Server(httpServer);

  io.on("connection",(socket)=>{
    console.log("connection done")
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg); // Broadcast the message to all connected clients
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  })
 
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})
