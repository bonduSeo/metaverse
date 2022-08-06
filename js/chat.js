Game.chatInit = function () {
  const chatDiv = document.querySelector(".chat");
  const chatContext = chatDiv.querySelector(".chatContext");
  socket.on("chat", (chat) => {
    console.log(chat);
    const div = document.createElement("div");
    div.innerHTML = `<div>${chat[0]}</div><div>${chat[1]}</div>`;
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;

    this.chatIconDraw(chat[2]);
    div.prepend(canvas);
    chatContext.append(div);
    chatContext.scrollTop = chatContext.scrollHeight;
  });

  const submit = chatDiv.querySelector("button");
  const input = chatDiv.querySelector("input");

  submit.addEventListener("click", () => {
    if (input.value !== "") {
      const nameChat = [this.hero.nickName, input.value, this.hero.id];
      socket.emit("chat", nameChat);
      input.value = "";
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      input.focus();
    }
  });
  input.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      submit.click();
    }
  });
  this.chatBoxResize();
};
Game.chatIconDraw = function (playerId) {
  let playerKey;
  Object.keys(this.players).forEach((key) => {
    if ((this.players[key].id = playerId)) {
      playerKey = key;
      return;
    }
  });
  console.log(this.players[playerKey]);
  ///// 여기 이어서 해야함
};

Game.chatBoxResize = function () {
  const canvas = document.getElementById("demo");
  const chatBox = document.querySelector(".chat");
  if (window.innerWidth < this.mediaQ) {
    chatBox.style.display = "none";
  } else {
    chatBox.style.display = "inline-block";
    chatBox.style.height = canvas.height + 4 + "px";
  }
};
