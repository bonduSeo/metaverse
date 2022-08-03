Game.chatInit = function () {
  const chatDiv = document.querySelector(".chat");
  const chatContext = chatDiv.querySelector(".chatContext");
  socket.on("chat", (chat) => {
    const div = document.createElement("div");
    div.innerHTML = `<span>${chat[0]} : </span><span>${chat[1]}</span>`;
    chatContext.append(div);
    chatContext.scrollTop = chatContext.scrollHeight;
  });

  const submit = chatDiv.querySelector("button");
  const input = chatDiv.querySelector("input");

  submit.addEventListener("click", () => {
    if (input.value !== "") {
      const nameChat = [this.hero.nickName, input.value];
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
};
