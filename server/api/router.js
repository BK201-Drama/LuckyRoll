// 管控路由的API
const { SelfFilledEvent, Cache } = require('../db/db')

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

// 获取数据
router.get('/myRoll', (req, res) => {
  res.header('Access-Control-Allow-Origin','*')
  res.header("Access-Control-Allow-Headers", "Content-Type")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')

  SelfFilledEvent.find({id: 1}, (err, ret) => {
    if(err){
      console.log("失败")
    }else{
      console.log(ret)
      SelfFilledEvent.find({}, (err2, doc) => {
        let param = []
        if(err2){
          console.log("失败")
        }else{
          param = doc
          // 传参有两个：抽到的学生的名字 --- 整个数组
          res.send({
            'studentName': ret[0].studentName,
            'param': JSON.stringify(param)
          })
        }
      })
    }
  })
})

router.post('/myRoll', (req, res) => {
  res.header('Access-Control-Allow-Origin','*')
  res.header("Access-Control-Allow-Headers", "Content-Type")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')

  // 判断抽取的类型，再进行不同的操作就可以了
  // 1: 普通抽取 2: 长期双倍抽取 3: 瞬间十倍抽取 4: 范围抽取 0: 不抽取，只导入数据
  if(req.body.params.type == 0){
    // 添加前端发来的大批量信息
    // 先删除之前所有的信息，再导入数据库
    // 大幅度改动是不好的，因此看看有没有什么优化手段，类似diff算法的
    add.addStudent(req.body.params.ids)
    res.send({'Msg': "导入成功"})
    return

  } 
  
  else if (req.body.params.type == 1) {
    // 太牛了，我都不知道可以用中文做json属性名
    // console.log(req.body.params.ids.姓名[0])

    // 一个随机的index
    var idx = RandomNumber(0, 123)

    // Cache.create({
    //   studentName: "name",
    //   studentMessage: "message",
    //   id: 1
    // })

    SelfFilledEvent.find({id: idx}, (err, ret) => {
      if(err){
        console.log("失败")
      }else{
        console.log(ret)
        SelfFilledEvent.find({}, (err2, doc) => {
          let param = []
          if(err2){
            console.log("失败")
          }else{
            param = doc
            res.send({
              'studentName': ret[0].studentName,
              'param': JSON.stringify(param)
            })
          }
        })
      }
    })
  }
})

router.post('/myRoll/twoTime', (req, res) => {
  res.header('Access-Control-Allow-Origin','*')
  res.header("Access-Control-Allow-Headers", "Content-Type")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')

  
  res.send({'Msg': "导入成功"})
})


router.post('/myRoll/range', (req, res) => {
   
})

router.post('/voiceControl', (req, res) => {
  
})

module.exports = router