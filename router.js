const express = require('express');
const router = express.Router();
const service = require('./service.js');
// 上传图片
const upload = require('./multer.js');

// 展示页面数据
router.get('/index',service.showIndex);
// 添加操作
router.post('/books/book',service.addBook);
// 编辑图书时根据id查询相应信息
router.get('/books/book/:id',service.getBookById);
// 提交编辑的数据
router.put('/books/book',service.editBook);
// 删除图书信息
router.delete('/books/book/:id',service.deleteBook);
// 图片上传
router.post('/books/upload',upload.array('file'),service.upLoadBook);


// muilter.single('file'), //适用于单文件上传
// muilter.array('file',num), //适用于多文件上传，num为最多上传个数，上传文件的数量可以小于num,
// muilter.fields(fields), //适用于混合上传，比如A类文件1个，B类文件2个。官方API有详细说明。
router.post('/upLoadImg', upload.array('file'), service.upLoadImg);

module.exports = router;