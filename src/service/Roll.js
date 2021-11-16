import axios from 'axios'

export async function add (tp, param) {
  var res = await axios.post('http://localhost:3000/myRoll', qs.stringify({
    params: {
      ids: param,
      type: tp
    }},
    { indices: false }
  ))
  return res
}

// 获取数据库
export async function getList () {
  var res = await axios.get('http://localhost:3000/myRoll')
  return res
}

// 双倍抽取
export async function TwoDraw (param) {
  var res = await axios.post('http://localhost:3000/myRoll', param)
  return res.data.data
}