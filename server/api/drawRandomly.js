// 专门用于输出一个随机数的api
const RandomNumber = (left, right) => {
  return Math.round(Math.random() * (right - left) + left);
}

module.exports = RandomNumber