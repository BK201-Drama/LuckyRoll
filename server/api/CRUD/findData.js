const { SelfFilledEvent } = require('../../db/db.js')

// 三种查找的方法
const findDataByName = (objName) => {
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

const findDataByMessage = (objMsg) => {
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

const findDataById = (objId) => {
  var obj = null
  obj = SelfFilledEvent.findOne({id: objId}).lean()
  // .then(result => {
  // 
  // })
  return obj
}

let s  = findDataById(3)
console.log(s)

var find = {
  findDataByName: findDataByName,
  findDataByMessage: findDataByMessage,
  findDataById: findDataById
}

module.exports = find

// --------------------------------------------------------------------------------- //

// await function returnLength (callback) {
//   const k = SelfFilledEvent.find().count({}, (err, res) => {
//     if(err) {
//       console.log(err)
//       return
//     } else {
//       callback(res)
//     } 
//   })
// }

// const returnL = (obj) => {
//   var k = obj
//   return k
// }