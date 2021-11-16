const { SelfFilledEvent } = require('../../db/db.js')

// 三种查找的方法
const findDataByName = async (objName) => {
  SelfFilledEvent.find({
    studentName: objName
  }, (err, ret) => {
    if(err){
      console.log("查找失败")
    }else{
      console.log("查找成功")
    }
  })
}

const findDataByMessage = async (objMsg) => {
  SelfFilledEvent.find({
    studentMessage: objMsg
  }, (err, ret) => {
    if (err) {
      console.log("查找失败")
    } else {
      console.log("查找成功")
    }
  })
}

const findDataById = async (objId) => {
  var obj = null
  obj = SelfFilledEvent.findOne({id: objId}).lean()
  // .then(result => {
  // 
  // })
  return obj
}

var find = {
  findDataByName: findDataByName,
  findDataByMessage: findDataByMessage,
  findDataById: findDataById
}

module.exports = find
