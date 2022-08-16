const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

// '/' 주소로 request 들어올 시 get
router.route("/").get((req, res) => {
  // res.send(html);
  console.log("aa");
  //   app.use(express.static(path.join(__dirname, "../")));
});

// '/name' 주소로 request 들어올 시 post
router.route("/name").post((req, res) => {
  const paramName = req.body.name;
  res.send(`어서오세요 ${paramName}님`);
});

// router 모듈 export
module.exports = router;
