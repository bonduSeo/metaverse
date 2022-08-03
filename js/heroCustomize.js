const Customize = {};
Customize.colorInfo = {
  toneColor: ["#efc796", "#e7af94", "#ef8d48", "#b67349", "#94573f", "#735032"],

  hairColor: ["#343433", "#ffd400", "#ff331f", "#039e2b", "#fcc76e"],

  bodyColor: ["#4387f6", "#ffbd29", "#ff301f", "#009f2b"],
};

Customize.load = function () {
  return [
    Loader.loadImage("heads", "../assets/heads.png"),
    Loader.loadImage("hairs", "../assets/hairs.png"),
    Loader.loadImage("bodys", "../assets/bodys.png"),
    Loader.loadImage("accs", "../assets/accs.png"),
    Loader.loadImage("hands", "../assets/hands.png"),
  ];
};

Customize.run = function () {
  this.menuTapSet();

  this.canvas = document.querySelector(".heroLook");
  this.ctx = this.canvas.getContext("2d");
  const customInfoLocal = JSON.parse(localStorage.getItem("customInfo"));
  this.customInfo =
    customInfoLocal !== null
      ? customInfoLocal
      : {
          toneColor: 0,
          headShape: 0,
          hairColor: 0,
          hairShape: 0,
          bodyColor: 0,
          bodyShape: 0,
          acc: 0,
        };
  this.customVol = {
    toneColor: 5,
    headShape: 2,
    hairColor: 4,
    hairShape: 9,
    bodyColor: 3,
    bodyShape: 5,
    acc: 4,
  };
  this.nickName = "";

  var p = this.load();
  Promise.all(p).then(
    function (loaded) {
      this.init();
    }.bind(this)
  );

  Customize.customCheck = function () {
    const eachCustoms = document.querySelectorAll(".eachCustom");
    console.log(eachCustoms);
    const customInfoKeys = Object.keys(this.customInfo);
    console.log(customInfoKeys);
    customInfoKeys.forEach((key, index) => {
      const inputs = eachCustoms[index].querySelectorAll("input");
      const val = this.customInfo[key];
      inputs[val].checked = "checked";
    });
  };

  Customize.init = function () {
    this.hero = new Hero();
    this.makeMenu();
    this.customCheck();
    this.drawHero();
    const nickNameLocal = document.querySelector(".nameBox input");
    nickNameLocal.addEventListener("change", (e) => {
      localStorage.setItem("nickName", nickNameLocal.value);
      console.log(document.querySelector(".nameBox input").value);
    });
    document.querySelector(".submitBtn").addEventListener("click", () => {
      this.nickName = nickNameLocal.value;
      localStorage.setItem("nickName", this.nickName);
      const customInfoJson = JSON.stringify(this.customInfo);
      localStorage.setItem("customInfo", customInfoJson);
      if (this.nickName === "") {
        alert("이름 설정은 필수입니다");
      } else {
        location.href = "meta.html";
      }
      // const customInfoLocal = JSON.parse(localStorage.getItem("customInfo"));
    });
  };
};

Customize.menuTapSet = function () {
  const menuTab = document.querySelectorAll(".menuTab input");
  const menuMain = document.querySelectorAll(".menu__main > div");
  menuTab.forEach((menu) => {
    menu.addEventListener("click", () => {
      switch (menu.value) {
        case "head":
          menuMain[0].style.display = "block";
          menuMain[1].style.display = "none";
          menuMain[2].style.display = "none";
          break;
        case "body":
          menuMain[0].style.display = "none";
          menuMain[1].style.display = "block";
          menuMain[2].style.display = "none";
          break;
        case "acc":
          menuMain[0].style.display = "none";
          menuMain[1].style.display = "none";
          menuMain[2].style.display = "block";
          break;
      }
    });
  });
};

Customize.makeMenu = function () {
  document.querySelector(".nameBox input").value = localStorage.getItem("nickName");
  const eachCustom = document.querySelectorAll(".eachCustom");

  eachCustom.forEach((item) => {
    if (item.id.includes("Color")) {
      for (let i = 0; i <= Customize.customVol[item.id]; i++) {
        const label = document.createElement("label");
        const div = document.createElement("div");
        const input = document.createElement("input");
        label.appendChild(input);
        item.appendChild(label).appendChild(div);
        input.type = "radio";
        input.name = item.id;
        input.value = i;
        const colorInfo = this.colorInfo[item.id];
        if (item.id == "bodyColor") {
          console.log(colorInfo);
          console.log(colorInfo[i]);
        }
        div.style.backgroundColor = colorInfo[i];

        input.addEventListener("click", () => {
          this.customInfo[input.name] = input.value;
          console.log(this.customInfo);
          this.drawHero();
          eachCustom.forEach((item) => {
            item.innerHTML = "";
          });
          Customize.makeMenu();
          this.customCheck();
        });
      }
    } else {
      for (let i = 0; i <= Customize.customVol[item.id]; i++) {
        const label = document.createElement("label");
        const div = document.createElement("div");
        const canvas = document.createElement("canvas");
        const input = document.createElement("input");
        canvas.width = 64;
        canvas.height = 64;
        item.appendChild(label).appendChild(input);
        label.appendChild(div);
        div.appendChild(canvas);
        input.type = "radio";
        input.name = item.id;
        input.value = i;
        const ctx = canvas.getContext("2d");

        const checkWhatColor = (id) => {
          const part = id.replace("Shape", "");
          let whatColor = "";
          switch (part) {
            case "head":
              whatColor = this.customInfo["toneColor"];
              break;
            case "acc":
              whatColor = 0;
              break;
            case "body":
              whatColor = this.customInfo["bodyColor"];
              break;
            case "hair":
              whatColor = this.customInfo["hairColor"];
          }
          this.drawParts(ctx, part, i * this.hero.size, whatColor * this.hero.size);
        };
        checkWhatColor(item.id);

        input.addEventListener("click", () => {
          this.customInfo[input.name] = input.value;
          console.log(this.customInfo);
          this.drawHero();

          eachCustom.forEach((item) => {
            item.innerHTML = "";
          });
          Customize.makeMenu();
          this.customCheck();
        });
      }
    }
  });
};

function Hero() {
  this.size = 64;
  this.width = this.size;
  this.height = this.size;

  this.customInfo = Customize.customInfo;

  //body파츠 이미지파일
  //   this.headsImage = Loader.getImage("heads");
  //   this.bodysImage = Loader.getImage("bodys");
  this.customImgs = Loader.images;
  console.log(this.customImgs);
}

Customize.drawHero = function () {
  this.ctx.clearRect(0, 0, 300, 200);

  //Body
  this.drawParts(
    this.ctx,
    "body",
    this.hero.customInfo.bodyShape * this.hero.size,
    this.hero.customInfo.bodyColor * this.hero.size
  );

  //Head
  this.drawParts(
    this.ctx,
    "head",
    this.hero.customInfo.headShape * this.hero.size,
    this.hero.customInfo.toneColor * this.hero.size
  );

  //Hair
  this.drawParts(
    this.ctx,
    "hair",
    this.hero.customInfo.hairShape * this.hero.size,
    this.hero.customInfo.hairColor * this.hero.size
  );

  // //acc
  this.drawParts(this.ctx, "acc", this.hero.customInfo.acc * this.hero.size, 0);

  // //hand
  this.drawParts(this.ctx, "hand", 0, this.hero.customInfo.toneColor * this.hero.size);
};
Customize.drawParts = function (canvas, partName, sourceX, sourceY) {
  let image;
  switch (partName) {
    case "head":
      image = this.hero.customImgs.heads;
      break;
    case "body":
      image = this.hero.customImgs.bodys;
      break;
    case "hand":
      image = this.hero.customImgs.hands;
      break;
    case "acc":
      image = this.hero.customImgs.accs;
      break;
    case "hair":
      image = this.hero.customImgs.hairs;
      break;
  }
  canvas.drawImage(
    image, // image
    sourceX,
    sourceY,
    this.hero.size, // source width
    this.hero.size, // source height
    0, //그리기 좌표
    0,
    this.hero.size,
    this.hero.size
  );
};

window.onload = function () {
  Customize.run();
};

function goBack() {
  window.history.back();
}
//
