// 专门用于输出一个随机数的api
const RandomNumber = (left, right) => {
  return Math.floor(Math.random() * right + left)
}

module.exports = RandomNumber