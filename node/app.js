const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIO = require("socket.io");
const players = {};

const io = socketIO(server);
// app.use(express.static(path.join(__dirname, "src")));

app.use(express.static(path.join(__dirname, "../")));

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`server is running ${PORT}`));

io.on("connection", (socket) => {
  // console.log("연결이 이루어짐");
  // console.log("socket.id : " + socket.id);
  // io.emit("socketId", socket.id);

  socket.on("chat", (chat) => {
    //되돌려주는코드
    io.emit("chat", chat);
  });

  socket.on("players", (player) => {
    // console.log(player);
    if (!(player["id"] === "")) {
      players[socket.id] = player;
    }
    //되돌려주는코드
    io.emit("players", players);
  });

  socket.on("disconnect", (reason) => {
    // console.log("끊김 : " + socket.id);
    delete players[socket.id];
    console.log(players);
  });
});
