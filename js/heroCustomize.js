const Customize = {};

Customize.load = function () {
  return [
    Loader.loadImage("heads", "../assets/heads.png"),
    Loader.loadImage("hairs", "../assets/hairs.png"),
    Loader.loadImage("bodys", "../assets/bodys.png"),
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
    this.customCheck();

    this.hero = new Hero();
    this.drawHero();
    const inputs = document.querySelectorAll(".menu__main input");
    inputs.forEach((input) => {
      input.addEventListener("click", () => {
        this.customInfo[input.name] = input.value;

        console.log(this.customInfo);
        this.drawHero();
      });
    });
    document.querySelector(".submitBtn").addEventListener("click", () => {
      const customInfoJson = JSON.stringify(this.customInfo);
      localStorage.setItem("customInfo", customInfoJson);
      // const customInfoLocal = JSON.parse(localStorage.getItem("customInfo"));
      location.href = "meta.html";
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

  //Head
  this.ctx.drawImage(
    this.hero.customImgs.heads, // image
    this.hero.customInfo.headShape * this.hero.size, // source x
    0, // source y
    this.hero.size, // source width
    this.hero.size, // source height
    0, //그리기 좌표
    0,
    this.hero.size,
    this.hero.size
  );
  //Hair
  this.ctx.drawImage(
    this.hero.customImgs.hairs, // image
    this.hero.customInfo.hairShape * this.hero.size, // source x

    0, // source y
    this.hero.size, // source width
    this.hero.size, // source height
    0, //그리기 좌표
    0,
    this.hero.size,
    this.hero.size
  );

  //Body
  this.ctx.drawImage(
    this.hero.customImgs.bodys, // image
    this.hero.customInfo.bodyShape * this.hero.size, // source x
    0, // source y
    this.hero.size, // source width
    this.hero.size, // source height
    0, //그리기 좌표
    0,
    this.hero.size,
    this.hero.size
  );
  //Acc
  this.ctx.drawImage(
    this.hero.customImgs.hands, // image
    this.hero.customInfo.acc * this.hero.size, // source x
    0, // source y
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
