const mongodb = require('./../db');

const bcont = new mongodb.Schema({
    number:{
      type:Number,
      default:0
    },
    name:{
      type:String,
      default:'BlogDetail'
    },
    title:{
      type:String,
      default:''
    },
    tag:{
      type:String,
      default:''
    },
    btype:{
      type:String,
      default:''
    },
    blogDoc:{
      type:String,
      default:''
    },
    editTime:{
      type:Date,
      default:Date.now
    }
})

const blogSchema = new mongodb.Schema({
  'username':String,
  'password':String,
  'nickname':String,
  'token':String,
  'headpicture':String,
  'blogcont':[bcont],
  'joinTime':{
    'type':Date,
    'default':Date.now
  }
})

exports.blogAPI = mongodb.model('blogData',blogSchema)