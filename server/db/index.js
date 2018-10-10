const mongoose = require('mongoose');

const DB_URL = `mongodb://127.0.0.1:27017/blog`;

mongoose.Promise = global.Promise;
mongoose.connect(DB_URL,err=>{
  if(err){
    console.log('连接数据库失败');
  }else{
    console.log('连接数据库成功');
  }
})

module.exports = mongoose;