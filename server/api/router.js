// 管控路由的API
const { SelfFilledEvent, Cache, User } = require('../db/db')

const add = require('./CRUD/addData.js')
// const find = require('./CRUD/findData.js')
const RandomNumber = require('./drawRandomly.js')

// ------------------------------------------------- //

const express = require('express')
const url = require('url')
const fs = require('fs')
const { setFdLimit } = require('process')
const router = express.Router()

// ------------------------------------------------- //

router.post('/home', async (req, res) => {
  res.header('Access-Control-Allow-Origin','*')
  res.header("Access-Control-Allow-Headers", "Content-Type")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  console.log(req.body.params.username)
  var dat = await User.find({
    username: req.body.params.username,
    password: req.body.params.password
  })
  if(dat.length <= 0){
    res.send({
      'isLogin': false
    })
    return
  }
  res.send({
    'isLogin': true
  })
})

// 获取数据列表数据
router.get('/myRoll', async (req, res) => {
  res.header('Access-Control-Allow-Origin','*')
  res.header("Access-Control-Allow-Headers", "Content-Type")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')

  var dat = await SelfFilledEvent.find({})
  res.send({
    'param': JSON.stringify(dat)
  })
})

router.post('/myRoll', async (req, res) => {
  res.header('Access-Control-Allow-Origin','*')
  res.header("Access-Control-Allow-Headers", "Content-Type")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')

  // 判断抽取的类型，再进行不同的操作就可以了
  // 1: 普通抽取 2: 长期双倍抽取 4: 范围抽取 0: 不抽取，只导入数据
  if(req.body.params.type == 0){
    add.addStudent(req.body.params.ids)
    res.send({'Msg': "导入成功"})
    return
  }
  
  else if (req.body.params.type == 1) {
    var idx = RandomNumber(0, 123)

    // Cache.create({
    //   studentName: "name",
    //   studentMessage: "message",
    //   id: 1
    // })

    var temp = await SelfFilledEvent.find({id: idx})
    res.send(...temp)
    return
  }

  else if (req.body.params.type == 2) {
    var tmp = req.body.params.ids
    // console.log(tmp)

    var reqData = await SelfFilledEvent.find({studentName: req.body.params.ids.studentName})

    console.log(reqData)

    var len = await (await Cache.find({})).length

    var l2 = await Cache.find({})

    console.log(len)
    console.log(l2)

    var lenCache = await (await Cache.find({
      studentName: reqData[0].studentName,
      studentMessage: reqData[0].studentMessage,
    })).length

    console.log(lenCache)

    if(lenCache <= 0) {
      Cache.create({
        studentName: reqData[0].studentName,
        studentMessage: reqData[0].studentMessage,
        id: 0
      })
    } else {
      for(let i = len; i < lenCache + len + 1; i++){
        Cache.create({
          studentName: reqData[0].studentName,
          studentMessage: reqData[0].studentMessage,
          id: i
        })
      }
    }

    var lenCache2 = await (await Cache.find({})).length

    console.log(lenCache2)

    var idx = RandomNumber(0, 123 + lenCache2)
    
    if(idx > 123) {
      idx %= 123
      var dat = await Cache.find({
        id: idx
      })
      var tmp = await SelfFilledEvent.find({
        studentName: dat[0].studentName,
        studentMessage: dat[0].studentMessage
      })
      res.send(tmp)
    }else{
      var dat = await SelfFilledEvent.find({
        id: idx
      })
      res.send(dat)
    }
  }

  else if(req.body.params.type == 4) {
    var idx = RandomNumber(parseInt(req.body.params.left), parseInt(req.body.params.right))
    res.send({
      index: idx
    })
  }
})

module.exports = router
