const app = require("express")();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

io.on("connection", socket => {
  console.log("A user has connected");
  socket.on("new-operation", (userId, ownerId, projId, ops) => {
    io.emit("new-remote-operation", userId, ownerId, projId, ops)
  });
});

server.listen(4000, () => console.log("listening on *:4000"));