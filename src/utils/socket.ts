import { Server } from "socket.io"
import { Express } from "express"
import http from "http"

export const configSocket = (app: Express) => {
  const server = http.createServer(app)
  const io = new Server(8081, {
    cors: {
      origin: "*",
    },
  })

  io.on("connection", (socket) => {
    io.emit("user connected")
    socket.on("message", function (msg) {
      console.log(msg)
    })
    console.log("a user connectefffffff")
  })
}
