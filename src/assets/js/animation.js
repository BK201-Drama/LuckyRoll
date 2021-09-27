var RandomNumber = require('../js/drawRandomly')

const animation = (arr, window) => {
  let i = 0
  var index = RandomNumber(0, this.dataArr.length - 1)
  let timer = setInterval(() => {
    // 注意不要越界了，范围是0 ~ length - 1
    // 注意了，还是要有一个把数据库的所有值给前端的操作，不然就不能做一个加载动画
    document.getElementById("x").innerHTML = arr[i].studentName
    
    i++
    if(i >= arr.length - 1){
      document.getElementById("x").innerHTML = arr[index].studentName
      clearInterval(timer)
    }
  }, 5)
}

module.exports = animation

