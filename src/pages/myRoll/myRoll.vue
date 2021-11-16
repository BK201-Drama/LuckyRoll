<template>
  <div>
    <img class="myImg" src='../../assets/img/bg.png' />
    <img class="myImg" src='../../assets/img/bg2.png' id="hide"/>
    <img class="myImg" src='../../assets/img/bg3.png' id="hide"/>

    <div class="abs">
      <el-header>
        <el-button type="button" class="layui-btn layui-btn-normal upload" id="up_btn" circle>
          <input type="file" class="change" id="files" multiple="multiple" @change="chooseFile" >
          
          <i class="el-icon-upload2"></i>
        </el-button>
        <el-button @click="drawerL = true" style="margin-left: 16px;" class="el-icon-setting" circle/>
        <el-button @click="drawerR = true" style="margin-left: 16px;" class="el-icon-s-help" circle/>


        <el-button @click="addFile">添加该excel文件</el-button>
        <el-button @click="drawTenTimes">概率瞬时提升十倍</el-button>
        <el-button @click="drawTwoTimes">概率持久提升两倍</el-button>
      </el-header>

      <el-drawer
        title="我是标题"
        :visible.sync="drawerL"
        direction="ltr"
        :with-header="false">
        <span>我来啦!</span>
      </el-drawer>

      <el-drawer
        title="我是标题"
        :visible.sync="drawerR"
        direction="rtl"
        :with-header="false">
        <span>我来啦!</span>
      </el-drawer>


      <img src="../../assets/img/spinning2.png" class="spinning">
      <!-- <div class="el-icon-aim spinning"></div> -->
      <el-button @click="drawName" class="btn">抽取</el-button>

      <div class="RollComponent">
        <!-- <img src="../../assets/img/spinning.png" class="spinning"> -->
        <p class="rollText" id="x">
          请导入抽取数据
        </p>
      </div>
      <video src="../../assets/audio/Oh baby a triple.mp3" preload="auto" id="music"></video>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import XLSX from 'xlsx'

  import RandomNumber from '../../assets/js/drawRandomly'

  
  export default {
    data(){
      return {
        fileList: [],
        dataArr: [],
        peopleIndex: null,
        // 我们要根据drawType的不同来进行不同的抽取模式
        drawType: null,
        
        // 这是抽屉
        drawerL: false,
        drawerR: false,
      }
    },
    components: {
      //LeftWindows
    },
    methods: {
      // 添加文件，已经没有问题，能成功导入
      async addFile () {
        let param = this.dataArr
        // 变换抽取的种类
        this.drawType = 0
        var tp = this.drawType

        // post请求，需要发数组时，我们需要调用qs,再使用json字符串格式转换，放进params里面，并且加上：{ indices: false }才可成功传入
        axios.post('http://localhost:3000/myRoll', qs.stringify({
          params: {
            ids: param,
            type: tp
          }},
          { indices: false }
        )).then((response) => {
          console.log(response.data.Msg)
        })
      },

      async drawName () {
        if(this.dataArr.length <= 0){
          return
        }
        // 变换抽取的种类
        this.drawType = 1
        let studentName
        var tp = this.drawType

        // post请求，需要发数组时，我们需要调用qs,再使用json字符串格式转换，放进params里面，并且加上：{ indices: false }才可成功传入
        var response = await axios.post('http://localhost:3000/myRoll', qs.stringify({
          params: {
            type: tp
          }},
          { indices: false }
        ))

        // 真正抽中的学生名字
        studentName = response.data.studentName
        // 将数据库的所有值都传给前端
        // 这个数据的意义在于做一个开局抽取动画
        this.dataArr = JSON.parse(response.data.param)
        
        var index = Math.floor(Math.random() * this.dataArr.length)
        // 抽签效果
        // 这个定时器表示每30秒发送一次信号，直到clearInterval为止
        let i = 0
        let timer = await setInterval(() => {
          // 注意不要越界了，范围是0 ~ length - 1
          // 注意了，还是要有一个把数据库的所有值给前端的操作，不然就不能做一个加载动画
          document.getElementById("x").innerHTML = this.dataArr[i].studentName
          i++
          if(i >= this.dataArr.length - 1){
            document.getElementById("x").innerHTML = this.dataArr[index].studentName
            window.clearInterval(timer)
          }
        }, 10)

        await setTimeout(() => {
          music.play()
        }, this.dataArr.length * 11)
      
      },

      async drawTwoTimes () {
        // 改变抽取种类2
        this.drawType = 2
        var tp = this.drawType
        var param = {
          studentName: document.getElementById("x").innerHTML
        }

        var k = await axios.post('http://localhost:3000/myRoll/twoTime')
        console.log(k)

        var response = await axios.post('http://localhost:3000/myRoll', qs.stringify({
          params: {
            ids: param,
            type: tp
          }},
          { indices: false }
        ))

        // 真正抽中的学生名字
        var index = Math.floor(Math.random() * this.dataArr.length)
        // 将数据库的所有值都传给前端
        // 这个数据的意义在于做一个开局抽取动画
        this.dataArr = JSON.parse(response.data.param)
      
        // 抽签效果
        // 这个定时器表示每30秒发送一次信号，直到clearInterval为止
        let i = 0
        let timer = setInterval(() => {
          // 注意不要越界了，范围是0 ~ length - 1
          // 注意了，还是要有一个把数据库的所有值给前端的操作，不然就不能做一个加载动画
          document.getElementById("x").innerHTML = this.dataArr[i].studentName
          i++
          if(i >= this.dataArr.length - 1){
            document.getElementById("x").innerHTML = this.dataArr[index].studentName
            window.clearInterval(timer)
          }
        }, 5)

      },

      drawTenTimes () {
        // 概率抽十倍，是瞬时的，因此是不用持久化到数据库的，这一点需要注意
        // 改变抽取种类3
        this.drawType = 3
        // 真正抽中的学生名字
        var index = RandomNumber(0, this.dataArr.length - 1)
        console.log(index)
        var tmp = this.dataArr[index]

        // 使该数据抽取概率变成十倍
        for(var idx = 0; idx < 9; idx++){
          this.dataArr.push(tmp)
        }
      
        // 抽签效果
        // 这个定时器表示每30ms发送一次信号，直到clearInterval为止
        let i = 0
        let timer = setInterval(() => {
          // 注意不要越界了，范围是0 ~ length - 1
          // 注意了，还是要有一个把数据库的所有值给前端的操作，不然就不能做一个加载动画
          document.getElementById("x").innerHTML = this.dataArr[i].studentName
          i++
          if(i >= this.dataArr.length - 1){
            document.getElementById("x").innerHTML = this.dataArr[index].studentName
            window.clearInterval(timer)
          }
        }, 5)
      },

      chooseFile (e) {
        // 读取excel文件并写入到数组中
        const files = e.target.files
        if(files.length <= 0){
          return false;
        }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
          alert('文件传格式不正确')
          return false
        }

        const fileReader = new FileReader();
        // 监听
        fileReader.onload = (ev) => {
          try {
            const data = ev.target.result;
            const workbook = XLSX.read(data, {
              type: 'binary'
            })
            const wsname = workbook.SheetNames[0]//取第一张表
            this.dataArr = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])//生成json表格内容
            console.log('Json转化结果：', this.dataArr)
          } catch (e) {
            return false
          }
        }
        fileReader.readAsBinaryString(files[0])
      }
    }
  }
</script>

<style>
  .el-aside {
    color: #545c64;
    text-align: center;
    line-height: 200px;
    background-color: #E9EEF3;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #545c64;
    line-height: 160px;
  }

  .RollComponent {
    margin-left: 600px;
  }

  .rollText {
    width: 250px;
    height: 150px;
    position: absolute;
    border: 1px solid #333;
    border-radius: 8%;
    margin: 50px 40px;
    text-align: center;
    line-height: 150px;
    font-size: 30px;
  }

  .spinning {
    width: 300px;
    height: 300px;
    display: block;
    float: left;  
    margin: 0px 600px;
  }

  .btn {
    margin-left: 720px;
    margin-top: 30px
  }

  @media (prefers-reduced-motion: no-preference) {
    .spinning {
      animation: spinning-spin infinite 5s linear;
    }
  }

  @keyframes spinning-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .upload{
    /* padding: 4px 10px; */
    /* height: 20px; */
    position: relative;
    color: #666;
  }

  .change{
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
  }

  .myImg {
    width: 100%;
    height: 100%;
    float: none;
    position: fixed;
    margin-left: -8px;
    margin-top: -7px
  }

  #hide {
    display: none
  }

  .abs {
		position: absolute;
  }
</style>