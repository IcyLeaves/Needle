//forever -o out.log  -a start src.js
//forever list
var express = require("express");
var app = express();
// var bodyParse = require("body-parser");
const axios = require("axios");
const multipart = require("connect-multiparty");
const multipartyMiddleware = multipart();
const FormData = require("form-data");
const Fs = require("fs");
//增加头部信息解决跨域问题
// app.all('*', function (req, res, next){
//     res.header("Access-Control-Allow-Origin", "http://localhost:8080");//允许源访问，本利前端访问路径为“http://localhost:8080”
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("X-Powered-By", ' 3.2.1');
//     next();
// });

//使用bodyParse解释前端提交数据
// app.use(bodyParse.urlencoded({ extended: true }));
// app.use(bodyParse.json());

// 处理/login请求
app.post("/api", multipartyMiddleware, function (req, res) {
  console.log(req.files);
  var data = new FormData();
  data.append("image", Fs.createReadStream(req.files.image.path));
  data.append("name", new Date().getTime().toString() + ".gif");
  data.append("key", "f6dffe33f7b82c2bf50a58fc932bddfb");
  data.append("expiration", 60 * 60 * 24 * 7);
  axios({
    method: "post",
    url: "https://api.imgbb.com/1/upload",
    headers: {
      ...data.getHeaders(),
    },
    data: data,
  })
    .then(function (response) {
      console.log(response.data);
      res.status(200).send(response.data.data.image.url);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// 监听3000端口
var server = app.listen(34567);

console.log("服务器已运行");
console.log("监听网址为:http://127.0.0.1:34567/");
