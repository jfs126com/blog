const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const secret = 'mynameisFantasyGao'
const db = require('./../model/Blog.js')
const blogModel = db.blogAPI


var resObj = (code, msg, token, resData) => {
  return {
    status: code,
    msg: msg,
    token: token,
    resData: resData
  }
}
//注册接口
exports.USER_REGIETER_API = async (ctx,next)=>{
  var blog = ctx.request.body.params;
  if (!blog.username || !blog.password) {
    ctx.status = 200
    ctx.body = resObj(-1, '参数不全')
    return;
  }
  let userObj = {}
  userObj.username = blog.username
  try {
    await blogModel.find(userObj).exec().then(data => {
      if (data.length !== 0) {
        ctx.body = resObj(2, '用户名已存在')
      } else {
        blog.token = jwt.sign({
          user_id: blog.username
        }, secret, {
          expiresIn: '12h'
        })
        let addUser = new blogModel(blog)
        addUser.save() 
        ctx.status = 200
        ctx.body = resObj(1, '注册成功')
      }
    }).catch(e => {
      ctx.body = resObj(0, '发生错误', e.toString())
    })
  } catch (e) {
    ctx.body = resObj(0, '数据库错误', e.toString())
  }
}

//登录接口
exports.USER_LOGIN_API = async (ctx,next)=>{
  let login = ctx.request.body.params
  if (!login.user || !login.pass) {
    ctx.status = 200
    ctx.body = resObj(-1, '参数不全')
    return;
  }
  let userObj = {}
  userObj.username = login.user
  try {
    await blogModel.find(userObj).then(data=>{
      if (data.length == 1) {
        if (data[0].password == login.pass) {
          const token = jwt.sign({
            user_id: data[0]._id,
          }, secret, {
            expiresIn: '12h' //过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
          });
          userObj.password = login.pass
          blogModel.findOneAndUpdate(userObj, {
            token: token
          }).exec()
          ctx.body = resObj(1, '登录成功', token,data)
        }else{
          ctx.body = resObj(3, '密码错误')
        }
      }else {
        ctx.body = resObj(2, '用户名不存在,请立即注册')
      }
    }).catch(e => {
      ctx.body = resObj(0, '发生错误', e.toString())
    })
  } catch (e) {
    ctx.body = resObj(0, '数据库错误', e.toString())
  }
}

//bolg编辑接口
exports.BLOG_EDIT_API = async (ctx,next) =>{
  let blogInfo = ctx.request.body.params;
  let blogObj = {}
  blogObj.number = blogInfo.number
  blogObj.title = blogInfo.title
  blogObj.tag = blogInfo.tag
  blogObj.btype = blogInfo.btype
  blogObj.blogDoc = blogInfo.blogDoc
  try{
    await blogModel.update({
      username:blogInfo.username
    },{
      '$push':{
        blogcont:blogObj
    }}).then(()=>{
        ctx.body = resObj(1, '提交成功')
    }).catch(e=>{
      ctx.body = resObj(0, '发生错误', e.toString())
    })
  }catch(e){
    ctx.body = resObj(0, '数据库错误', e.toString())
  }
}

//笔记接口
exports.BLOG_NOTE_API = async (ctx,next)=>{
  let user = ctx.request.query
  try {
    await blogModel.find({username:user.username}).then(data=>{
      let noteDate = []
      data[0].blogcont.forEach(item => {
        if (item.tag == "笔记") {
          noteDate.push(item)
        }
      }); 
      ctx.body = resObj(1,'成功',data.length,noteDate.reverse())
    }).catch(e=>{
      ctx.body = resObj(0, '发生错误', e.toString())
    })
  } catch (e) {
    ctx.body = resObj(0, '数据库错误', e.toString())
  }
}

//文章接口
exports.BLOG_ARTICLE_API = async (ctx,next)=>{
  let user = ctx.request.query
  try {
    await blogModel.find({username:user.username}).then(data=>{
      let articleDate = []
      data[0].blogcont.forEach(item => {
        if (item.tag == "文章") {
          articleDate.push(item)
        }
      }); 
      ctx.body = resObj(1,'成功',data.length,articleDate.reverse())
    }).catch(e=>{
      ctx.body = resObj(0, '发生错误', e.toString())
    })
  } catch (e) {
    ctx.body = resObj(0, '数据库错误', e.toString())
  }
}

//blog列表
exports.BLOG_BLOGLIST_API = async (ctx,next)=>{
  try {
    await blogModel.find().then(data=>{
      let blogData = []
      data.forEach(item=>{
        item.blogcont.forEach(items=>{
          blogData.push(items)
        })
      })
      ctx.body = resObj(1,'成功',data.length,blogData.reverse())
    }).catch(e=>{
      ctx.body = resObj(0, '发生错误', e.toString())
    })
  } catch (e) {
    ctx.body = resObj(0, '数据库错误', e.toString())
  }
}