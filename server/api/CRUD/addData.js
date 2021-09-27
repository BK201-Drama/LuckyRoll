const Models = require('../../db/db.js')

// excel一次性添加所有学生
const addStudent = (obj) => {
  Models.SelfFilledEvent.deleteMany({})
  .then(() => {
    console.log("删除成功")
  })
  
  var name = obj.姓名
  var id = obj.学号
  for(var i = 0; i < name.length; i++){
    // 附上标签id，便于随机查找使用
    Models.SelfFilledEvent.create({
      studentName: name[i],
      studentMessage: id[i],
      id: i
    })
  }
}

// 用于提高概率增加学生
// 增加的个数自定义
const addStudentN = (name, message, id, number) => {
  for(var i = 0; i < number; i++){
    Models.SelfFilledEvent.create({
      studentName: name,
      studentMessage: message,
      id: id
    })
  }
}

// 合并，一起封装
const add = {
  addStudent: addStudent,
  addStudentByNumber: addStudentN
}

module.exports = add
