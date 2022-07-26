const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIO = require("socket.io");

const io = socketIO(server);
// console.log(__dirname);
app.use(express.static(path.join(__dirname, "src")));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server is running ${PORT}`));

io.on("connection", (socket) => {
  //   console.log("연결이 이루어짐");

  //서버에서 받아주는코드
  socket.on("chatting", (data) => {
    console.log(data);

    //되돌려주는코드
    io.emit("chatting", `그래 반가워 ${data}`);
  });
});
