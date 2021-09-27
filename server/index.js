// 主页运行文件

const router = require('./api/router')

const fs = require('fs')

const path = require('path')

const bodyParser = require('body-parser')

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.use(express.static(path.resolve(__dirname, '../dist')))
app.get('*', function(req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
  res.send(html)
})

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000')
})

module.exports = app