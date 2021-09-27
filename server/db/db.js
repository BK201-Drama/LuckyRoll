// 运用mongoose创建数据库
const mongoose = require('mongoose')

// 连接mongoDB数据库，如果没有自己创建，默认test数据库会自动生成
mongoose.connect('mongodb://localhost/project')

// 连接绑定事件，判断是否连接成功
const db = mongoose.connection
db.once('error', () => {
  console.log('连接失败，请重试')
})
db.once('open', () => {
  console.log('连接数据库project成功')
})

// 定义数据格式
const nameOfEventSchema = mongoose.Schema({
  studentName: String,
  studentMessage: String,
  id: Number
})

// 构建模型对象，我们可以在里面再填充多个对象
const Models = {
  SelfFilledEvent: mongoose.model('SelfFilledEvent', nameOfEventSchema)
}

// 暴露对象
module.exports = Models