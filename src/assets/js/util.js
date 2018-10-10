//笔记数据处理
function noteInterface(data) { 
  let noteDate = []
  data.forEach(item => {
    if (item.tag == "笔记") {
      noteDate.push(item)
    }
  }); 
  return noteDate.reverse()
}

//文章数据处理
function articleInterface(data) {
  let articleDate = []
  data.forEach(item => {
    if (item.tag == "文章") {
      articleDate.push(item)
    }
  }); 
  return articleDate.reverse()
}

//首页数据处理
function blogInterface(data) {
  let blogData = []
  data.forEach(item=>{
    item.blogcont.forEach(items=>{
      blogData.push(items)
    })
  })
  return blogData.reverse()
}

module.exports = {
  noteInterface,
  articleInterface,
  blogInterface
}