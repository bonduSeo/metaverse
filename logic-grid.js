var map = {
  cols: 12,
  rows: 12,
  tsize: 64,
  layers: [
    [
      3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1,
      1, 1, 1, 1, 2, 1, 1, 1, 1, 3, 3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 2, 2, 1, 1, 1, 1, 1,
      1, 1, 3, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1,
      1, 2, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3,
    ],
    [
      4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 4, 4, 0, 0, 5, 11, 0, 0, 0, 0, 5, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0,
      5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3,
    ],
  ],
  // 블록타일 -- 충돌 발생하는 타일
  block: [3, 5],
  Interactive: [11],
  color: {
    lightGreen: "#84dbb8",
    green: "#22ebbf",
    lightPink: "#fce7f0",
    pink: "#f9bdd9",
    yellow: "#f4b108",
    Beige: "#f8f1c3",
  },
  getTile: function (layer, col, row) {
    return this.layers[layer][row * map.cols + col];
  },
  isSolidTileAtXY: function (x, y) {
    var col = Math.floor(x / this.tsize);
    var row = Math.floor(y / this.tsize);

    // tiles 3 and 5 are solid -- the rest are walkable
    // loop through all layers and return TRUE if any tile is solid
    return this.layers.reduce(
      function (res, layer, index) {
        var tile = this.getTile(index, col, row);
        var isSolid = this.block.includes(tile);

        return res || isSolid;
      }.bind(this),
      false
    );
  },

  isInteractiveAtXY: function (x, y) {
    var col = Math.floor(x / this.tsize);
    var row = Math.floor(y / this.tsize);

    // tiles 3 and 5 are solid -- the rest are walkable
    // loop through all layers and return TRUE if any tile is solid
    return this.layers.reduce(
      function (res, layer, index) {
        var tile = this.getTile(index, col, row);
        var isInteractive = this.Interactive.includes(tile);

        return res || isInteractive;
      }.bind(this),
      false
    );
  },

  // 인수는 좌표값, 리턴은 행,열 값
  getCol: function (x) {
    return Math.floor(x / this.tsize);
  },
  getRow: function (y) {
    return Math.floor(y / this.tsize);
  },
  // 그 열에 해당하는 X의 픽셀좌표값
  getX: function (col) {
    return col * this.tsize;
  },

  getY: function (row) {
    return row * this.tsize;
  },
  rect: function (context, col, row, w, h, color) {
    const radius = 16;
    const innerRadius = radius - 4;
    const x = col * this.tsize;
    const y = row * this.tsize;
    const rx = x - Game.camera.x;
    const ry = y - Game.camera.y;
    const width = w * this.tsize;
    const height = h * this.tsize;
    const gap = 5;
    if (color === "pink") {
      context.fillStyle = this.color.pink;
    } else if ("green") {
      context.fillStyle = this.color.green;
    } else {
      context.fillStyle = color;
    }

    if (
      rx + width > 0 &&
      rx < Game.camera.x + this.rows * this.tsize &&
      ry + height > 0 &&
      ry < Game.camera.y + this.cols * this.tsize
    ) {
      context.beginPath();
      // 왼쪽 상단 모서리
      context.moveTo(rx + radius, ry);
      // 오른쪽 상단 모서리
      context.arcTo(rx + width, ry, rx + width, ry + height, radius);
      // 오른쪽 하단 모서리
      context.arcTo(rx + width, ry + height, rx, ry + height, radius);
      // 왼쪽 하단 모서리
      context.arcTo(rx, ry + height, rx, ry, radius);
      // 왼쪽 상단 모서리
      context.arcTo(rx, ry, rx + radius, ry, radius);
      // 선 그리기
      context.stroke();
      context.fill();

      if (color === "pink") {
        context.fillStyle = this.color.lightPink;
      } else if ("green") {
        context.fillStyle = this.color.lightGreen;
      }
      //안쪽선
      context.beginPath();
      // 왼쪽 상단 모서리
      context.moveTo(rx + innerRadius + gap, ry + gap);
      // 오른쪽 상단 모서리
      context.arcTo(rx + width - gap, ry + gap, rx + width - gap, ry + height - gap, innerRadius);
      // 오른쪽 하단 모서리
      context.arcTo(rx + width - gap, ry + height - gap, rx + gap, ry + height - gap, innerRadius);
      // // 왼쪽 하단 모서리
      context.arcTo(rx + gap, ry + height - gap, rx + gap, ry + gap, innerRadius);
      // // 왼쪽 상단 모서리
      context.arcTo(rx + gap, ry + gap, rx + width - gap, ry + gap, innerRadius);
      // // 선 그리기
      context.stroke();
      context.fill();
    }
  },
};

function Camera(map, width, height) {
  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.maxX = map.cols * map.tsize - width;
  this.maxY = map.rows * map.tsize - height;
}

Camera.prototype.follow = function (sprite) {
  this.following = sprite;
  sprite.screenX = 0;
  sprite.screenY = 0;
};

Camera.prototype.update = function () {
  // assume followed sprite should be placed at the center of the screen
  // whenever possible
  this.following.screenX = this.width / 2;
  this.following.screenY = this.height / 2;

  // make the camera follow the sprite
  this.x = this.following.x - this.width / 2;
  this.y = this.following.y - this.height / 2;
  // clamp values

  this.x = Math.max(0, Math.min(this.x, this.maxX));
  this.y = Math.max(0, Math.min(this.y, this.maxY));

  // in map corners, the sprite cannot be placed in the center of the screen
  // and we have to change its screen coordinates

  // left and right sides
  if (this.following.x < this.width / 2 || this.following.x > this.maxX + this.width / 2) {
    this.following.screenX = this.following.x - this.x;
  }
  // top and bottom sides
  if (this.following.y < this.height / 2 || this.following.y > this.maxY + this.height / 2) {
    this.following.screenY = this.following.y - this.y;
  }
};
//test
function Hero(map, x, y) {
  this.map = map;
  this.x = x;
  this.y = y;
  this.width = map.tsize;
  this.height = map.tsize;

  this.c = 0;
  this.tempX = 0;
  this.tempY = 0;

  this.min = map.tsize;
  this.realSpeed = 0;
  this.divisorArr = this.getDivisors();

  //body파츠 관련 추가내용
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

  this.id = utils.uuidv4();

  this.image = Loader.getImage("hero");

  //body파츠 이미지파일
  this.headsImage = Loader.getImage("heads");
  this.hairsImage = Loader.getImage("hairs");
  this.bodysImage = Loader.getImage("bodys");
  this.handsImage = Loader.getImage("hands");
}

Hero.SPEED = 256; // pixels per second

// tsize에 따른 가능한 픽셀 속도 산출(배열값)
// 객체지향으로 수정
Hero.prototype.getDivisors = function () {
  let i = 1;
  const arr = [];
  while (i <= map.tsize) {
    if (map.tsize % i === 0) {
      arr.push(i);
    }
    i++;
  }
  return arr;
};
Hero.prototype.move = function (delta, dirX, dirY) {
  // move hero
  // 픽셀 속도 배열값에서 캐릭터 움직값에 가장 가까운 숫자를 찾아 속도지정
  delta = delta > 0.1 ? 0.1 : delta;
  for (let i = 0; i < this.divisorArr.length; i++) {
    c =
      this.divisorArr[i] - Hero.SPEED * delta < 0
        ? -(this.divisorArr[i] - Hero.SPEED * delta)
        : this.divisorArr[i] - Hero.SPEED * delta;

    if (c < this.min) {
      this.min = c;
      realSpeed = this.divisorArr[i];
    }
  }

  this.x += dirX * realSpeed;
  this.x = Math.round(this.x);

  this.y += dirY * realSpeed;
  this.y = Math.round(this.y);

  // check if we walked into a non-walkable tile
  this._collide();
  this._interactive();

  // clamp values
  var maxX = this.map.cols * this.map.tsize;
  var maxY = this.map.rows * this.map.tsize;
  this.x = Math.max(0, Math.min(this.x, maxX));
  this.y = Math.max(0, Math.min(this.y, maxY));
};
Hero.prototype._interactive = function () {
  var row, col;
  // -1 in right and bottom is because image ranges from 0..63
  // and not up to 64
  var left = this.x - this.width / 2 - 1;
  var right = this.x + this.width / 2;
  var top = this.y - this.height / 2 - 1;
  var bottom = this.y + this.height / 2;

  const interLeft = this.map.isInteractiveAtXY(left, bottom - this.height / 2);
  const interDown = this.map.isInteractiveAtXY(bottom, right - this.width / 2);
  const interUp = this.map.isInteractiveAtXY(top, right - this.width / 2);
  const interRight = this.map.isInteractiveAtXY(right, bottom - this.height / 2);

  if (interLeft || interDown || interRight || interUp) {
    console.log("상호작용");
  }
};

Hero.prototype._collide = function () {
  var row, col;
  // -1 in right and bottom is because image ranges from 0..63
  // and not up to 64
  var left = this.x - this.width / 2;
  var right = this.x + this.width / 2 - 1;
  var top = this.y - this.height / 2;
  var bottom = this.y + this.height / 2 - 1;
  // 부딪힘 판정(아래)

  // check for collisions on sprite sides
  const blockLeftUp = this.map.isSolidTileAtXY(left, top) || this.map.isInteractiveAtXY(left, top);
  const blockLeftDown =
    this.map.isSolidTileAtXY(left, bottom) || this.map.isInteractiveAtXY(left, bottom);
  const blockRightUp =
    this.map.isSolidTileAtXY(right, top) || this.map.isInteractiveAtXY(right, top);
  const blockRightDown =
    this.map.isSolidTileAtXY(right, bottom) || this.map.isInteractiveAtXY(right, bottom);

  // 위로만 부딪혔을 때
  if (blockLeftUp && blockRightUp && !(blockRightDown || blockLeftDown)) {
    row = this.map.getRow(top);
    this.y = this.height / 2 + this.map.getY(row + 1);
  }
  //아래로만 부딪혔을 때
  else if (blockLeftDown && blockRightDown && !(blockRightUp || blockLeftUp)) {
    row = this.map.getRow(bottom); //y축(아래)으로 이동하다 충돌한 오브젝트의 top 행 번호
    this.y = -this.height / 2 + this.map.getY(row);
  }
  //왼쪽으로만 막혔을 때
  else if (blockLeftUp && blockLeftDown && !(blockRightUp || blockRightDown)) {
    col = this.map.getCol(left);
    this.x = this.width / 2 + this.map.getX(col + 1);
  } // 오른쪽으로만 막혔을 때
  else if (blockRightUp && blockRightDown && !(blockLeftDown || blockLeftUp)) {
    col = this.map.getCol(right);
    this.x = -this.width / 2 + this.map.getX(col);
  } // 왼쪽과 위쪽 함께 막혔을때
  else if (blockLeftUp && blockRightUp && blockLeftDown) {
    col = this.map.getCol(left);
    this.x = this.width / 2 + this.map.getX(col + 1);
    row = this.map.getRow(top);
    this.y = this.height / 2 + this.map.getY(row + 1);
  } // 오른쪽, 위쪽 함께 막혔을때
  else if (blockRightUp && blockLeftUp && blockRightDown) {
    row = this.map.getRow(top);
    this.y = this.height / 2 + this.map.getY(row + 1);
    col = this.map.getCol(right);
    this.x = -this.width / 2 + this.map.getX(col);
  } // 왼쪽, 아래쪽 함께 막혔을때
  else if (blockLeftDown && blockRightDown && blockLeftUp) {
    col = this.map.getCol(left);
    this.x = this.width / 2 + this.map.getX(col + 1);
    row = this.map.getRow(bottom);
    this.y = -this.height / 2 + this.map.getY(row);
  } // 오른쪽, 아래쪽 함께 막혔을때
  else if (blockRightDown && blockRightUp && blockLeftDown) {
    row = this.map.getRow(bottom);
    this.y = -this.height / 2 + this.map.getY(row);
    col = this.map.getCol(right);
    this.x = -this.width / 2 + this.map.getX(col);
  } // 왼위 대각에 블럭이 있을때, 그 타일로 이동시
  else if (blockLeftUp && !(blockRightDown && blockRightUp && blockLeftDown)) {
    let blockX = this.map.getX(this.map.getCol(left) + 1) + this.width / 2;
    let blockY = this.map.getY(this.map.getRow(top) + 1) + this.height / 2;

    if (blockX - this.x > blockY - this.y) {
      this.y = blockY;
    } else if (blockX - this.x < blockY - this.y) {
      this.x = blockX;
    } else {
      this.y = blockY;
      this.x = blockX;
    }
  } // 왼아래 대각에 블럭이 있을때, 그 타일로 이동시
  else if (blockLeftDown && !(blockRightDown && blockRightUp && blockLeftUp)) {
    let blockX = this.map.getX(this.map.getCol(left) + 1) + this.width / 2;
    let blockY = this.map.getY(this.map.getRow(bottom)) - this.height / 2;

    if (blockX - this.x > this.y - blockY) {
      this.y = blockY;
    } else if (blockX - this.x < this.y - blockY) {
      this.x = blockX;
    } else {
      this.y = blockY;
      this.x = blockX;
    }
  }
  // 우위 대각에 블럭이 있을때, 그 타일로 이동시
  else if (blockRightUp && !(blockRightDown && blockLeftDown && blockLeftUp)) {
    let blockX = this.map.getX(this.map.getCol(right)) - this.width / 2;
    let blockY = this.map.getY(this.map.getRow(top) + 1) + this.height / 2;

    if (this.x - blockX > blockY - this.y) {
      this.y = blockY;
    } else if (this.x - blockX < blockY - this.y) {
      this.x = blockX;
    } else {
      this.y = blockY;
      this.x = blockX;
    }
  }
  // 우아래 대각에 블럭이 있을때, 그 타일로 이동시
  else if (blockRightDown && !(blockLeftDown && blockRightUp && blockLeftUp)) {
    let blockX = this.map.getX(this.map.getCol(right)) - this.width / 2;
    let blockY = this.map.getY(this.map.getRow(bottom)) - this.height / 2;

    if (this.x - blockX > this.y - blockY) {
      this.y = blockY;
    } else if (this.x - blockX < this.y - blockY) {
      this.x = blockX;
    } else {
      this.y = blockY;
      this.x = blockX;
    }
  }
};

// --------------------

Game.load = function () {
  return [
    Loader.loadImage("tiles", "../assets/tiles.png"),
    Loader.loadImage("hero", "../assets/character.png"),
    Loader.loadImage("heads", "../assets/heads.png"),
    Loader.loadImage("hairs", "../assets/hairs.png"),
    Loader.loadImage("bodys", "../assets/bodys.png"),
    Loader.loadImage("hands", "../assets/hands.png"),
  ];
};

Game.init = function () {
  Keyboard.listenForEvents([Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
  this.tileAtlas = Loader.getImage("tiles");

  this.hero = new Hero(map, 160, 160);
  this.camera = new Camera(map, 512, 512);
  this.camera.follow(this.hero);

  socket.on("socketId", (id) => {
    this.hero.id = id;
  });
  socket.on("players", (data) => {
    Game.players = data;
    // console.log(Game.players);
  });
  this.lookEvent();
};

Game.lookEvent = function () {
  const lookSelect = document.querySelectorAll("#lookInfo input");

  lookSelect.forEach((radio) => {
    radio.addEventListener("click", () => {
      if (radio.name === "head") {
        this.hero.headInfo = radio.value;
      } else if (radio.name === "body") {
        this.hero.bodyInfo = radio.value;
      }
    });
  });
};

Game.update = function (delta) {
  // handle hero movement with arrow keys
  var dirX = 0;
  var dirY = 0;
  // -----------------------------temp 변수 넣어 블락이동 구현-------------------------------
  if (Keyboard.isDown(Keyboard.LEFT)) {
    this.hero.tempX = -1;
    dirX = -1;

    if (Keyboard.isDown(Keyboard.UP)) {
      dirY = -1;
      this.hero.tempY = -1;
    }
    if (Keyboard.isDown(Keyboard.DOWN)) {
      dirY = 1;
      this.hero.tempY = 1;
    }
  } else if (Keyboard.isDown(Keyboard.RIGHT)) {
    dirX = 1;
    this.hero.tempX = 1;

    if (Keyboard.isDown(Keyboard.UP)) {
      dirY = -1;
      this.hero.tempY = -1;
    }
    if (Keyboard.isDown(Keyboard.DOWN)) {
      dirY = 1;
      this.hero.tempY = 1;
    }
  }

  if (Keyboard.isDown(Keyboard.UP)) {
    dirY = -1;
    this.hero.tempY = -1;
  } else if (Keyboard.isDown(Keyboard.RIGHT)) {
    dirX = 1;
    this.hero.tempX = 1;
  } else if (Keyboard.isDown(Keyboard.LEFT)) {
    dirX = -1;
    this.hero.tempX = -1;
  }

  if (Keyboard.isDown(Keyboard.DOWN)) {
    dirY = 1;
    this.hero.tempY = 1;
  } else if (Keyboard.isDown(Keyboard.RIGHT)) {
    dirX = 1;
    this.hero.tempX = 1;
  } else if (Keyboard.isDown(Keyboard.LEFT)) {
    dirX = -1;
    this.hero.tempX = -1;
  }

  let locatX = (this.hero.x - 160) % map.tsize !== 0;
  let locatY = (this.hero.y - 160) % map.tsize !== 0;

  if (dirX !== 0 || locatX) {
    dirX = this.hero.tempX;
  }
  if (dirY !== 0 || locatY) {
    dirY = this.hero.tempY;
  }
  this.hero.move(delta, dirX, dirY);

  const heroCopy = JSON.parse(JSON.stringify(this.hero));
  delete heroCopy.map;

  socket.emit("players", heroCopy);

  this.camera.update();
};

Game._drawLayer = function (layer) {
  var startCol = Math.floor(this.camera.x / map.tsize);
  var endCol = startCol + this.camera.width / map.tsize;
  var startRow = Math.floor(this.camera.y / map.tsize);
  var endRow = startRow + this.camera.height / map.tsize;
  var offsetX = -this.camera.x + startCol * map.tsize;
  var offsetY = -this.camera.y + startRow * map.tsize;

  for (var c = startCol; c <= endCol; c++) {
    for (var r = startRow; r <= endRow; r++) {
      var tile = map.getTile(layer, c, r);
      var x = (c - startCol) * map.tsize + offsetX;
      var y = (r - startRow) * map.tsize + offsetY;
      if (tile !== 0) {
        // 0 => empty tile
        this.ctx.drawImage(
          this.tileAtlas, // image
          (tile - 1) * map.tsize, // source x
          0, // source y
          map.tsize, // source width
          map.tsize, // source height
          Math.round(x), // target x
          Math.round(y), // target y
          map.tsize, // target width
          map.tsize // target height
        );
      }
    }
  }
};
// dsfafdkjflkadjfklads
Game._drawGrid = function () {
  var width = map.cols * map.tsize;
  var height = map.rows * map.tsize;
  var x, y;
  for (var r = 0; r < map.rows; r++) {
    x = -this.camera.x;
    y = r * map.tsize - this.camera.y;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);

    this.ctx.lineTo(width, y);
    this.ctx.stroke();
  }
  for (var c = 0; c < map.cols; c++) {
    x = c * map.tsize - this.camera.x;
    y = -this.camera.y;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, height);
    this.ctx.stroke();
  }
};

Game._playersDraw = function () {
  // console.log(this.players);
  if (!this.players) {
    return;
  }
  const playersKeys = Object.keys(this.players);
  //하단 status표기 (임시)
  const status = document.querySelector("#status");
  status.innerHTML = "";
  playersKeys.forEach((key) => {
    const div = document.createElement("div");
    status.append(div);
    div.innerHTML = `id: ${this.players[key].id} | x: ${Math.floor(
      this.players[key].x
    )} | y: ${Math.floor(this.players[key].y)}`;
  });
  //

  playersKeys.forEach((key) => {
    if (this.players[key].id !== this.hero.id) {
      this.ctx.drawImage(
        this.hero.headsImage, // image
        this.players[key].headInfo * this.hero.width, // source x
        0, // source y
        this.players[key].width, // source width
        this.players[key].height, // source height
        this.players[key].x - this.camera.x - this.players[key].width / 2,
        this.players[key].y - this.camera.y - this.players[key].height / 2,
        this.players[key].width,
        this.players[key].height
      );
      this.ctx.drawImage(
        this.hero.bodysImage, // image
        this.players[key].bodyInfo * this.hero.width, // source x
        0, // source y
        this.players[key].width, // source width
        this.players[key].height, // source height
        this.players[key].x - this.camera.x - this.players[key].width / 2,
        this.players[key].y - this.camera.y - this.players[key].height / 2,
        this.players[key].width,
        this.players[key].height
      );
    }
  });
};

Game._heroDraw = function () {
  //머리드로잉
  this.ctx.drawImage(
    this.hero.headsImage, // image
    this.hero.customInfo.headShape * this.hero.width, // source x
    0, // source y
    this.hero.width, // source width
    this.hero.height, // source height
    this.hero.screenX - this.hero.width / 2,
    this.hero.screenY - this.hero.height / 2,
    this.hero.width,
    this.hero.height
  );
  //바디드로잉
  this.ctx.drawImage(
    this.hero.bodysImage, // image
    this.hero.customInfo.bodyShape * this.hero.width, // source x
    0, // source y
    this.hero.width, // source width
    this.hero.height, // source height
    this.hero.screenX - this.hero.width / 2,
    this.hero.screenY - this.hero.height / 2,
    this.hero.width,
    this.hero.height
  );
  //헤어드로잉
  this.ctx.drawImage(
    this.hero.hairsImage, // image
    this.hero.customInfo.hairShape * this.hero.width, // source x
    0, // source y
    this.hero.width, // source width
    this.hero.height, // source height
    this.hero.screenX - this.hero.width / 2,
    this.hero.screenY - this.hero.height / 2,
    this.hero.width,
    this.hero.height
  );
  //acc / hands 드로잉
  this.ctx.drawImage(
    this.hero.handsImage, // image
    this.hero.customInfo.acc * this.hero.width, // source x
    0, // source y
    this.hero.width, // source width
    this.hero.height, // source height
    this.hero.screenX - this.hero.width / 2,
    this.hero.screenY - this.hero.height / 2,
    this.hero.width,
    this.hero.height
  );
};
Game._drawReck = function () {
  map.rect(this.ctx, 5, 4, 3, 3, "green");
  map.rect(this.ctx, 4, 3, 2, 2, "pink");
};

Game.render = function () {
  // draw map background layer
  this._drawLayer(0);
  this._drawReck();

  this._playersDraw();
  // draw main character

  this._heroDraw();
  // this.ctx.drawImage(
  //   this.hero.image,
  //   this.hero.screenX - this.hero.width / 2,
  //   this.hero.screenY - this.hero.height / 2
  // );

  // draw map top layer
  this._drawLayer(1);

  this._drawGrid();
};
