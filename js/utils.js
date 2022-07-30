const utils = {};
utils.uuidv4 = function () {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

//
// Asset loader
//

var Loader = {
  images: {},
};

Loader.loadImage = function (key, src) {
  var img = new Image();

  var d = new Promise(
    function (resolve, reject) {
      img.onload = function () {
        this.images[key] = img;
        resolve(img);
      }.bind(this);

      img.onerror = function () {
        reject("Could not load image: " + src);
      };
    }.bind(this)
  );

  img.src = src;
  return d;
};

Loader.getImage = function (key) {
  return key in this.images ? this.images[key] : null;
};
