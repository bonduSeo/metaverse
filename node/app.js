const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIO = require("socket.io");
const players = {};

const io = socketIO(server);
// app.use(express.static(path.join(__dirname, "src")));
// app.use(express.static(path.join(__dirname, "../")));
app.use("/", express.static(path.join(__dirname, "../")));
app.use("/customize", express.static(path.join(__dirname, "../", "heroCustomize.html")));
app.use("/metaverse", express.static(path.join(__dirname, "../", "meta.html")));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server is running ${PORT}`));

io.on("connection", (socket) => {
  // console.log("연결이 이루어짐");
  // console.log("socket.id : " + socket.id);
  // io.emit("socketId", socket.id);

  socket.on("chat", (chat) => {
    io.emit("chat", chat);
  });

  socket.on("players", (player) => {
    // console.log(player);
    if (!(player["id"] === "")) {
      players[socket.id] = player;
    }
  });
  setInterval(() => {
    io.emit("players", players);
  }, 17);

  socket.on("disconnect", (reason) => {
    // console.log("끊김 : " + socket.id);
    delete players[socket.id];
  });
});
