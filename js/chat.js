Game.chat.bodyColor = ["#4387f6", "#ffbd29", "#ff301f", "#009f2b"];
Game.chat.init = function () {
  const chatDiv = document.querySelector(".chat");
  const chatContext = chatDiv.querySelector(".chatContext");
  socket.on("chat", (chat) => {
    const eachChatDiv = document.createElement("div");
    eachChatDiv.className = "eachChatDiv";
    eachChatDiv.innerHTML = `<div class="nickName">${chat[0]}</div><div class="ctnt">${chat[1]}</div>`;
    const canvasBox = document.createElement("div");
    canvasBox.className = "canvasBox";

    this.canvas = document.createElement("canvas");
    const ctx = this.canvas.getContext("2d");
    this.canvas.width = 45;
    this.canvas.height = 36;

    this.iconDraw(chat[2], ctx, canvasBox);
    eachChatDiv.prepend(canvasBox);
    canvasBox.append(this.canvas);
    chatContext.append(eachChatDiv);
    chatContext.scrollTop = chatContext.scrollHeight;
  });

  const submit = chatDiv.querySelector("button");
  const input = chatDiv.querySelector("input");

  submit.addEventListener("click", () => {
    if (input.value !== "") {
      const nameChat = [Game.hero.nickName, input.value, Game.hero.id];
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
  this.boxResize();
};
Game.chat.iconDraw = function (playerId, ctx, canvasBox) {
  let playerKey;
  Object.keys(Game.players).forEach((key) => {
    if (Game.players[key].id === playerId) {
      playerKey = key;
      return;
    }
  });
  const playerInfo = Game.players[playerKey].customInfo;
  this.displayChatIcon(playerKey);
  canvasBox.style.backgroundColor = this.bodyColor[playerInfo.bodyColor];
  // ctx.fillStyle = this.bodyColor[playerInfo.bodyColor];
  // ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  ctx.scale(-1, 1);
  ctx.drawImage(
    Game.hero.headsImage, // image
    playerInfo.headShape * Game.hero.width,
    playerInfo.toneColor * Game.hero.height,
    Game.hero.width, // source width
    Game.hero.height, // source height
    -54, //그리기 좌표
    0,
    Game.hero.width,
    Game.hero.height
  );
  ctx.drawImage(
    Game.hero.hairsImage, // image
    playerInfo.hairShape * Game.hero.width,
    playerInfo.hairColor * Game.hero.height,
    Game.hero.width, // source width
    Game.hero.height, // source height
    -54, //그리기 좌표
    0,
    Game.hero.width,
    Game.hero.height
  );
  ctx.scale(-1, 1);
};

Game.chat.displayChatIcon = function (playerKey) {
  if (Game.hero.id === Game.players[playerKey].id) {
    if (Game.hero.displayChatIcon === true) {
      clearTimeout(this.timeoutId);
    }
    Game.hero.displayChatIcon = true;
    this.timeoutId = setTimeout(() => {
      Game.hero.displayChatIcon = false;
    }, 1500);
  }
};

Game.chat.boxResize = function () {
  const canvas = document.getElementById("demo");
  const chatBox = document.querySelector(".chat");
  if (window.innerWidth < Game.mediaQ) {
    chatBox.style.display = "none";
  } else {
    chatBox.style.display = "inline-block";
    chatBox.style.height = canvas.height + "px";
  }
};
