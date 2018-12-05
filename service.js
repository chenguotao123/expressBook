const db = require('./db.js');

// 排序
function keysort(key,sortType){
  return function(a,b){
      return sortType ?~~(a[key]<b[key]):~~(a[key]>b[key])
  }
}

// 首页的展示的数据
exports.showIndex = (req,res) => {
  let sql = 'select * from book';
  let data = null;

  db.base(sql, data, (result)=>{
    result.sort(keysort('id',false));
    res.json(result);
  })
}

// 添加数据
exports.addBook = (req,res) => {
  const info = req.body;
  let sql = 'insert into book set ?';

  db.base(sql, info, (result)=>{
    if(result.affectedRows == 1){
      res.json({flag : 1});
    }else{
      res.json({flag : 2});
    }  
  })
}

exports.getBookById = (req,res) => {
  let id = req.params.id;
  let sql = 'select * from book where id=?';
  let data = [id];
  db.base(sql,data,(result)=>{
      res.json(result[0]);
  });
};

exports.editBook = (req,res) => {
  let info = req.body;
  let sql = 'update book set name=?,author=?,category=?,description=? where id=?';
  let data = [info.name,info.author,info.category,info.description,info.id];
  db.base(sql,data,(result)=>{
      if(result.affectedRows == 1){
          res.json({flag : 1});
      }else{
          res.json({flag : 2});
      }  
  });
};

exports.deleteBook = (req,res) => {
  let id = req.params.id;
  let sql = 'delete from book where id=?';
  let data = [id];
  db.base(sql,data,(result)=>{
      if(result.affectedRows == 1){
          res.json({flag : 1});
      }else{
          res.json({flag : 2});
      } 
  });
};


// 上传图片
exports.upLoadImg = (req,res) => {
  let files = req.files;
  let url = [];
  for (let i=0;i<files.length;i++) {
    url.push(`http://${req.headers.host}/uploads/${files[i].filename}`);
  }
  // let url = 'http://' + req.headers.host + '/upLoad/' + req.file.originalname;
  // const urlPath = req.file.path.replace('public','');
  // const url = 'http://' + req.headers.host + '/' + urlPath;
  res.json({ code : 200, url })
};