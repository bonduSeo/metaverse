let map = {
  cols: 50,
  rows: 30,
  tsize: 64,
  logic: false,
  //상호작용시 반응할 타일 구하기 위한 변수
  interRow: 0,
  interCol: 0,

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
      0, 0, 0, 0, 4, 4, 0, 0, 5, 11, 0, 11, 0, 0, 5, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0,
      5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3,
    ],
  ],
  // 블록타일 -- 충돌 발생하는 타일
  // block: [3, 5],
  blocksLayer: {
    0: "water",
    2: "fence",
  },
  // 상호타일 -- 상호작용 타일
  Interactive: [11],
  color: {
    lightGreen: "#84dbb8",
    green: "#22ebbf",
    lightPink: "#fce7f0",
    pink: "#f9bdd9",
    yellow: "#f4b108",
    Beige: "#f8f1c3",
    Red: "ff0000",
  },
  getTile: function (layer, col, row) {
    return this.layers[layer][row * map.cols + col];
  },
  isSolidTileAtXY: function (x, y) {
    var col = Math.floor(x / this.tsize);
    var row = Math.floor(y / this.tsize);

    let currentTile;
    let blockTile;

    // key 는 blocksLayer의 key값 -> 그려진 레이어의 배열 키값이다.
    for (key in this.blocksLayer) {
      if (key) {
        if (this.getTile2(key, col, row)) {
          currentTile = this.getTile2(key, col, row).img;
        }
        blockTile = this.blocksLayer[key];
        if (currentTile === blockTile) {
          // return true;
        }
      }
    }

    return false;
  },
  // isSolidTileAtXY: function (x, y) {
  //   var col = Math.floor(x / this.tsize);
  //   var row = Math.floor(y / this.tsize);

  //   // tiles 3 and 5 are solid -- the rest are walkable
  //   // loop through all layers and return TRUE if any tile is solid
  //   return this.layers.reduce(
  //     function (res, layer, index) {
  //       var tile = this.getTile(index, col, row);
  //       var isSolid = this.block.includes(tile);

  //       return res || isSolid;
  //     }.bind(this),
  //     false
  //   );
  // },

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
  // 상호작용할 대상의 타일넘버 구하기
  InteractiveObject: function (x, y) {
    var col = Math.floor(x / this.tsize);
    var row = Math.floor(y / this.tsize);

    // tiles 3 and 5 are solid -- the rest are walkable
    // loop through all layers and return TRUE if any tile is solid
    return this.layers.reduce(
      function (res, layer, index) {
        var tile = this.getTile(index, col, row);
        var InteractiveObj = this.Interactive[this.Interactive.indexOf(tile)];
        return InteractiveObj;
      }.bind(this)
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
    // Game.camera.x,y - 카메라 영역 좌측 위의 x값과 y값
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
  rectBorder: function (context, col, row, w, h, color) {
    const radius = 16;
    const innerRadius = radius - 4;
    const x = col * this.tsize;
    const y = row * this.tsize;
    // Game.camera.x,y - 카메라 영역 좌측 위의 x값과 y값
    const rx = x - Game.camera.x;
    const ry = y - Game.camera.y;
    const width = w * this.tsize;
    const height = h * this.tsize;
    const gap = 5;
    context.strokeStyle = color;
    context.lineWidth = 5;

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
    }
  },
};

function Camera(map, width, height) {
  this.x = 0;
  this.y = 0;
  //카메라 범위
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
  // whenever possible 캐릭터 위치값
  this.width = window.innerWidth - Game.remainX + Game.chatSize;
  this.height = window.innerHeight - Game.remainY;
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
  map.fontX = this.following.screenX;
  map.fontY = this.following.screenY;
  // map.fontY = this.following.screenY - map.tsize / 2;
};
//test
function Hero(map, x, y) {
  this.map = map;
  this.x = x;
  this.y = y;
  this.width = map.tsize;
  this.height = map.tsize;
  this.dirR = false;
  this.isWalking = false;

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
  const nickName = localStorage.getItem("nickName");
  this.nickName = nickName !== null ? nickName : "";

  this.id = utils.uuidv4();

  //body파츠 이미지파일
  this.headsImage = Loader.getImage("heads");
  this.hairsImage = Loader.getImage("hairs");
  this.bodysImage = Loader.getImage("bodys");
  this.handsImage = Loader.getImage("hands");
  this.AccsImage = Loader.getImage("accs");
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
  var left = this.x - this.width / 2 - 1;
  var right = this.x + this.width / 2;
  var top = this.y - this.height / 2 - 1;
  var bottom = this.y + this.height / 2;

  const interLeft = this.map.isInteractiveAtXY(left, bottom - this.height / 2); //성공
  const interDown = this.map.isInteractiveAtXY(right - this.width / 2, bottom);
  const interUp = this.map.isInteractiveAtXY(right - this.width / 2, top);
  const interRight = this.map.isInteractiveAtXY(right, bottom - this.height / 2);

  if (interLeft || interDown || interRight || interUp) {
    map.logic = true;
    //이벤트 한번만 걸기 위한 if와 변수값
    if (base.hasKeydown === 0) {
      base.hasKeydown = 1;
      document.addEventListener("keydown", base.event1, true);
      //document.onkeydown = event1;
    }

    if (interLeft) {
      map.interRow = map.getRow(this.y);
      map.interCol = map.getCol(this.x) - 1;
      //좌측 상호작용 타일 구하기
      base.interactiveNumber = this.map.InteractiveObject(left, bottom - this.height / 2);
    } else if (interDown) {
      map.interRow = map.getRow(this.y) + 1;
      map.interCol = map.getCol(this.x);
      //아래쪽 상호작용 타일 구하기
      base.interactiveNumber = this.map.InteractiveObject(right - this.width / 2, bottom);
    } else if (interUp) {
      map.interRow = map.getRow(this.y) - 1;
      map.interCol = map.getCol(this.x);
      //위쪽 상호작용 타일 구하기
      base.interactiveNumber = this.map.InteractiveObject(right - this.width / 2, top);
    } else if (interRight) {
      map.interRow = map.getRow(this.y);
      map.interCol = map.getCol(this.x) + 1;
      //우측 상호작용 타일 구하기
      base.interactiveNumber = this.map.InteractiveObject(right, bottom - this.height / 2);
    }
  } else {
    map.logic = false;
    //이벤트 한번만 걸기 위한 if와 변수값
    if (base.hasKeydown === 1) {
      base.hasKeydown = 0;
      document.removeEventListener("keydown", base.event1, true);
      //document.onkeydown = null;
    }
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
  // 우위 대각에 블럭이 있을때, 그 타일로 이동시.
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
    Loader.loadImage("heads", "../assets/heads.png"),
    Loader.loadImage("hairs", "../assets/hairs.png"),
    Loader.loadImage("bodys", "../assets/bodys.png"),
    Loader.loadImage("hands", "../assets/hands.png"),
    Loader.loadImage("accs", "../assets/accs.png"),
    Loader.loadImage("fences", "../assets/tiles/fences.png"),
    Loader.loadImage("grass", "../assets/tiles/Grass.png"),
    Loader.loadImage("hills", "../assets/tiles/Hills.png"),
    Loader.loadImage("tilledDirt", "../assets/tiles/TilledDirt.png"),
    Loader.loadImage("water", "../assets/tiles/Water.png"),
    Loader.loadImage("woodenHouse", "../assets/tiles/WoodenHouse.png"),
    Loader.loadImage("redBlock", "../assets/tiles/redBlock.png"),
    Loader.loadImage("blueBlock", "../assets/tiles/blueBlock.png"),
    Loader.loadImage("greenBlock", "../assets/tiles/greenBlock.png"),
    Loader.loadImage("bridge", "../assets/tiles/bridge.png"),
    Loader.loadImage("trees", "../assets/tiles/trees.png"),
  ];
};

Game.init = function () {
  Keyboard.listenForEvents([Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
  this.tileAtlas = Loader.getImage("tiles");
  this.fences = Loader.getImage("fences");
  this.grass = Loader.getImage("grass");
  this.hills = Loader.getImage("hills");
  this.tilledDirt = Loader.getImage("tilledDirt");
  this.water = Loader.getImage("water");
  this.woodenHouse = Loader.getImage("woodenHouse");
  this.redBlock = Loader.getImage("redBlock");
  this.blueBlock = Loader.getImage("blueBlock");
  this.greenBlock = Loader.getImage("greenBlock");
  this.bridge = Loader.getImage("bridge");
  this.trees = Loader.getImage("trees");

  this.hero = new Hero(map, 1312, 480);
  this.camera = new Camera(map, window.innerWidth, window.innerHeight);
  this.camera.follow(this.hero);

  this.chatInit();
  this.resizeInit();
  window.onresize = () => {
    this.resizeInit();
  };

  socket.on("socketId", (id) => {
    this.hero.id = id;
  });
  socket.on("players", (data) => {
    Game.players = data;
  });
};

Game.remainX = 300;
Game.remainY = 200;
Game.mediaQ = 620;
Game.resizeInit = function () {
  this.chatSize = window.innerWidth < 620 ? 240 : 0;
  this.canvas.width = window.innerWidth - this.remainX + this.chatSize;
  this.canvas.height = window.innerHeight - this.remainY;
  this.chatBoxResize();
};
Game.update = function (delta) {
  // handle hero movement with arrow keys
  var dirX = 0;
  var dirY = 0;
  // -----------------------------temp 변수 넣어 블락이동 구현-------------------------------
  if (Keyboard.isDown(Keyboard.LEFT)) {
    this.hero.tempX = -1;
    this.hero.dirR = false;
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
    this.hero.dirR = true;
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

  //걷는모션
  if (dirX !== 0 || dirY !== 0) {
    this.hero.isWalking = true;
  } else {
    this.hero.isWalking = false;
  }

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
Game._drawGrid = function () {
  var width = map.cols * map.tsize;
  var height = map.rows * map.tsize;
  var x, y;
  this.ctx.strokeStyle = "black";
  this.ctx.lineWidth = 1;
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
      //좌우반전
      let flipCheck = 1;
      if (this.players[key].dirR) {
        this.ctx.scale(-1, 1);
        flipCheck = -1;
      }
      //걷기모션
      let walkMotion = 1;
      if (this.players[key].isWalking) {
        walkMotion += Math.sin(new Date() / 40);
        walkMotion *= 3;
        console.log(walkMotion);
      }
      //바디드로잉
      this.ctx.drawImage(
        this.hero.bodysImage, // image
        this.players[key].customInfo.bodyShape * this.players[key].width, // source x
        this.players[key].customInfo.bodyColor * this.players[key].height, // source y
        this.players[key].width, // source width
        this.players[key].height, // source height
        (this.players[key].x - this.camera.x) * flipCheck - this.players[key].width / 2,
        this.players[key].y - this.camera.y - this.players[key].height / 2 - 2 * walkMotion,
        this.players[key].width,
        this.players[key].height - walkMotion
      );
      //머리드로잉
      this.ctx.drawImage(
        this.hero.headsImage, // image
        this.players[key].customInfo.headShape * this.players[key].width, // source x
        this.players[key].customInfo.toneColor * this.players[key].height, // source y
        this.players[key].width, // source width
        this.players[key].height, // source height
        (this.players[key].x - this.camera.x) * flipCheck - this.players[key].width / 2,
        this.players[key].y - this.camera.y - this.players[key].height / 2 - 2 * walkMotion,
        this.hero.width,
        this.hero.height - walkMotion
      );
      //헤어드로잉
      this.ctx.drawImage(
        this.hero.hairsImage, // image
        this.players[key].customInfo.hairShape * this.players[key].width, // source x
        this.players[key].customInfo.hairColor * this.players[key].height, // source y
        this.players[key].width, // source width
        this.players[key].height, // source height
        (this.players[key].x - this.camera.x) * flipCheck - this.players[key].width / 2,
        this.players[key].y - this.camera.y - this.players[key].height / 2 - 2 * walkMotion,
        this.players[key].width,
        this.players[key].height - walkMotion
      );

      // acc 드로잉
      this.ctx.drawImage(
        this.hero.AccsImage, // image
        this.players[key].customInfo.acc * this.players[key].width, // source x
        0,
        this.players[key].width, // source width
        this.players[key].height, // source height
        (this.players[key].x - this.camera.x) * flipCheck - this.players[key].width / 2,
        this.players[key].y - this.camera.y - this.players[key].height / 2 - 2 * walkMotion,
        this.players[key].width,
        this.players[key].height - walkMotion
      );
      // hands 드로잉
      this.ctx.drawImage(
        this.hero.handsImage, // image
        0,
        this.players[key].customInfo.toneColor * this.players[key].height, // source x
        this.players[key].width, // source width
        this.players[key].height, // source height
        (this.players[key].x - this.camera.x) * flipCheck - this.players[key].width / 2,
        this.players[key].y - this.camera.y - this.players[key].height / 2 - 2 * walkMotion,
        this.players[key].width,
        this.players[key].height - walkMotion
      );
      if (flipCheck === -1) {
        this.ctx.scale(-1, 1);
      }
    }
  });
};

Game._heroDraw = function () {
  //바디드로잉
  let flipCheck = 1;
  if (this.hero.dirR) {
    this.ctx.scale(-1, 1);
    flipCheck = -1;
  }
  //걷기모션
  let walkMotion = 1;
  if (this.hero.isWalking) {
    walkMotion += Math.sin(new Date() / 40);
    walkMotion *= 3;
    console.log(walkMotion);
  }
  //바디드로잉
  this.ctx.drawImage(
    this.hero.bodysImage, // image
    this.hero.customInfo.bodyShape * this.hero.width, // source x
    this.hero.customInfo.bodyColor * this.hero.height, // source y
    this.hero.width, // source width
    this.hero.height, // source height
    this.hero.screenX * flipCheck - this.hero.width / 2,
    this.hero.screenY - this.hero.height / 2 - 2 * walkMotion,
    this.hero.width,
    this.hero.height - walkMotion
  );

  //머리드로잉
  this.ctx.drawImage(
    this.hero.headsImage, // image
    this.hero.customInfo.headShape * this.hero.width, // source x
    this.hero.customInfo.toneColor * this.hero.height, // source y
    this.hero.width, // source width
    this.hero.height, // source height
    this.hero.screenX * flipCheck - this.hero.width / 2,
    this.hero.screenY - this.hero.height / 2 - 2 * walkMotion,
    this.hero.width,
    this.hero.height - walkMotion
  );
  //헤어드로잉

  this.ctx.drawImage(
    this.hero.hairsImage, // image
    this.hero.customInfo.hairShape * this.hero.width, // source x
    this.hero.customInfo.hairColor * this.hero.height, // source y
    this.hero.width, // source width
    this.hero.height, // source height
    this.hero.screenX * flipCheck - this.hero.width / 2,
    this.hero.screenY - this.hero.height / 2 - 2 * walkMotion,
    this.hero.width,
    this.hero.height - walkMotion
  );

  // acc 드로잉
  this.ctx.drawImage(
    this.hero.AccsImage, // image
    this.hero.customInfo.acc * this.hero.width, // source x
    0,
    this.hero.width, // source width
    this.hero.height, // source height
    this.hero.screenX * flipCheck - this.hero.width / 2,
    this.hero.screenY - this.hero.height / 2 - 2 * walkMotion,
    this.hero.width,
    this.hero.height - walkMotion
  );
  // hands 드로잉
  this.ctx.drawImage(
    this.hero.handsImage, // image
    0,
    this.hero.customInfo.toneColor * this.hero.height, // source x
    this.hero.width, // source width
    this.hero.height, // source height
    this.hero.screenX * flipCheck - this.hero.width / 2,
    this.hero.screenY - this.hero.height / 2 - 2 * walkMotion,
    this.hero.width,
    this.hero.height - walkMotion
  );
  if (flipCheck === -1) {
    this.ctx.scale(-1, 1);
  }
  //네임바 드로잉
  this.ctx.beginPath();
  // 왼쪽 상단 모서리
  this.ctx.moveTo(
    this.hero.screenX - this.hero.width / 2,
    this.hero.screenY - this.hero.height / 2
  );
};
Game._drawNameBox = function () {
  //nameBox 그리기
  const drawEachNameBox = (name, sX, sY) => {
    this.ctx.fillStyle = "white";
    const textWidth = this.ctx.measureText(name).width + 5;
    this.ctx.fillRect(sX + this.hero.width / 2 - textWidth / 2, sY - 10, textWidth, 10);
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText(name, sX + this.hero.width / 2, sY);
  };
  drawEachNameBox(
    this.hero.nickName,
    this.hero.screenX - this.hero.width / 2,
    this.hero.screenY - this.hero.height / 2 - 10
  );
  if (!this.players) {
    return;
  }
  const playerKeys = Object.keys(this.players);

  playerKeys.forEach((key) => {
    if (this.players[key].id !== this.hero.id) {
      drawEachNameBox(
        this.players[key].nickName,
        this.players[key].x - this.camera.x - this.hero.width / 2,
        this.players[key].y - this.camera.y - this.hero.height / 2 - 10
      );
    }
  });

  // this.players.forEach((player) => {
  //   drawEachNameBox(player.nickName, player.screenX, player.screenY);
  // });
};
Game._drawRect = function () {
  map.rect(this.ctx, 5, 4, 3, 3, "green");
  map.rect(this.ctx, 4, 3, 2, 2, "pink");
  if (map.logic) {
    map.rectBorder(this.ctx, map.interCol, map.interRow, 1, 1, "Red");
  }
};
Game._text = function () {
  if (map.logic) {
    //반응 타일 상단 위치 구하는 공식
    const reactTileX = map.interCol * map.tsize - Game.camera.x;
    const reactTileY = map.interRow * map.tsize - Game.camera.y - map.tsize * 0.2;
    const radius = 4;
    const boxHeight = 10;

    this.ctx.font = "14px serif";
    this.ctx.fillStyle = "#00000070";
    this.ctx.beginPath();
    // 왼쪽 상단 모서리
    this.ctx.moveTo(reactTileX + radius, reactTileY - boxHeight);
    // 오른쪽 상단 모서리
    this.ctx.arcTo(
      reactTileX + map.tsize,
      reactTileY - boxHeight,
      reactTileX + map.tsize,
      reactTileY,
      radius
    );
    // 오른쪽 하단 모서리
    this.ctx.arcTo(
      reactTileX + map.tsize,
      reactTileY + boxHeight,
      reactTileX + map.tsize - radius,
      reactTileY + boxHeight + radius,
      radius
    );
    // 왼쪽 하단 모서리
    this.ctx.arcTo(
      reactTileX,
      reactTileY + boxHeight + radius - 2,
      reactTileX,
      reactTileY + boxHeight,
      radius
    );
    // 왼쪽 상단 모서리
    this.ctx.arcTo(
      reactTileX,
      reactTileY - boxHeight,
      reactTileX + radius,
      reactTileY - boxHeight,
      radius
    );
    // 선 그리기
    this.ctx.stroke();
    this.ctx.fill();

    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText("[Space]", reactTileX + map.tsize / 2, reactTileY - map.tsize * 0.2 + 20);
  }
};

Game.render = function () {
  // console.log(width);
  // draw map background layer
  // this._drawLayer(0);
  this._drawTiles(1);
  // this._drawRect();

  this._playersDraw();
  // draw main character
  this._heroDraw();
  this._drawTiles(2);

  // this.ctx.drawImage(
  //   this.hero.image,
  //   this.hero.screenX - this.hero.width / 2,
  //   this.hero.screenY - this.hero.height / 2
  // );

  // draw map top layer
  // this._drawLayer(1);

  // this._drawGrid();
  this._drawNameBox();
  this._text();
};
