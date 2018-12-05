const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const router = require('./router.js');
app.use(express.static('static'));

app.use(bodyParser.urlencoded({ extended: false }));

// 解决跨域问题
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
 
  if (req.method == 'OPTIONS') {
    res.send(200); // 让options请求快速返回
  }
  else {
    next();
  }
});

// a middleware function with no mount path. This code is executed for every request to the router
app.use(router);


app.listen(3000,()=>{
  console.log('runing...');
})