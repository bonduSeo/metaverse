"use strict";

const socket = io();

// 보내는코드
socket.emit("chatting", "from front");

//받는코드
socket.on("chatting", (data) => {
  console.log(data);
});


console.log(socket);
