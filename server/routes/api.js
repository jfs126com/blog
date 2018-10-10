const Router = require('koa-router');
//const multer = require('koa-multer');

const router = new Router({
  prefix:'/api'
})

//引入api文件夹下的blogAPI接口文件
const blogAPI = require('./../api/blogAPI')

//注册接口
router.post('/register',blogAPI.USER_REGIETER_API)

 //登录接口
router.post('/signin',blogAPI.USER_LOGIN_API);


//编辑博客文档接口
router.post('/blogEdit',blogAPI.BLOG_EDIT_API);

//获取note接口
router.get('/note',blogAPI.BLOG_NOTE_API);

//获取文章接口
router.get('/article',blogAPI.BLOG_ARTICLE_API);

//首页bolg列表
router.get('/blogList',blogAPI.BLOG_BLOGLIST_API);

module.exports = router