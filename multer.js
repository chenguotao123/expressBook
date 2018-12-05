/*
 * 利用multer实现单或多文件上传功能
*/
const multer = require('multer');
//以下是配置
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './static/uploads')  // 这里是图片存储路劲
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
  }
});
module.exports = multer({ storage: storage });
// muilter.single('file'), //适用于单文件上传
// muilter.array('file',num), //适用于多文件上传，num为最多上传个数，上传文件的数量可以小于num,
// muilter.fields(fields), //适用于混合上传，比如A类文件1个，B类文件2个。官方API有详细说明。
// router.post('/upLoadImg', upload.array('file') , async (ctx, next) => {
//   // console.log(ctx)
//   await service.upLoadImg(ctx);
//   // ctx.body = result;
// });