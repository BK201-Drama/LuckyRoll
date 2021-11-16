<template>
  <div>
    <img class="myImg I1" src='../../assets/img/bg.png' />
    <img class="myImg I2" src='../../assets/img/bg2.png' id="hide"/>
    <img class="myImg I3" src='../../assets/img/bg3.png' id="hide"/>

    <div class="abs">
      <el-header>

        <el-tooltip effect="dark" content="打开设置" placement="top-start">
          <el-button @click="drawerL = true" style="margin-left: 16px;" class="el-icon-setting" circle/>
        </el-tooltip>

        <el-tooltip effect="dark" content="打开更多功能" placement="top-start">
          <el-button @click="drawerR = true" style="margin-left: 16px;" class="el-icon-s-help" circle/>
        </el-tooltip>

        <el-tooltip effect="dark" content="导入excel文件" placement="top-start">
          <el-button type="button" class="layui-btn layui-btn-normal upload" id="up_btn" circle>
            <input type="file" class="change" id="files" multiple="multiple" @change="chooseFile" >
            
            <i class="el-icon-upload2"></i>
          </el-button>
        </el-tooltip>

        <el-tooltip effect="dark" content="添加excel表格至数据库" placement="top-start">
          <el-button @click="addFile" class="el-icon-circle-plus-outline" circle/>
        </el-tooltip>

        <el-tooltip effect="dark" content="从数据库添加缓存" placement="top-start">
          <el-button @click="getData" class="el-icon-download" circle/>
        </el-tooltip>
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
        size="40%"
        :with-header="false">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          height="400">
          <el-table-column
            prop="studentName"
            label="姓名"
            width="200"
            align="center">
          </el-table-column>
          <el-table-column
            prop="studentMessage"
            label="学号"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            width="113"
            align="center">
          </el-table-column>

          <el-table-column
            label="操作"
            width="200"
            align="center">
            <template slot-scope="scope">
              <el-button @click="drawTwoTimes(scope.row)" type="text" size="small">二倍抽取</el-button>
              <el-button @click="drawTenTimes(scope.row)" type="text" size="small">十倍抽取</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="范围最小值" prop="Left">
            <el-input type="Left" v-model="ruleForm.Left" autocomplete="on"></el-input>
          </el-form-item>
          <el-form-item label="范围最大值" prop="Right">
            <el-input v-model.number="ruleForm.Right"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">抽取</el-button>
          </el-form-item>
        </el-form>

      </el-drawer>


      <img src="../../assets/img/spinning2.png" class="spinning">
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
  import * as RollAPI from '../../service/Roll'

  export default {
    data(){
      return {
        constTableData: [],
        tableData: [],
        fileList: [],
        dataArr: [],

        ruleForm: {
          Left: '',
          Right: ''
        },

        peopleIndex: null,
        // 我们要根据drawType的不同来进行不同的抽取模式
        drawType: null,
        ischooseFile: false,
        isSelectedData: null,
        
        // 这是抽屉
        drawerL: false,
        drawerR: false,
      }
    },
    components: {
      //LeftWindows
    },
    methods: {
      async getData () {
        var res = await RollAPI.getList()
        var resp = JSON.parse(res.data.param)
        if(resp.length <= 0){
          alert("数据库文件没有数据！")
          return
        }
        this.dataArr = resp
        this.tableData = resp
        alert("导入成功！")
        document.getElementById("x").innerHTML = "导入成功，请准备抽取"
      },

      // 添加文件，已经没有问题，能成功导入
      async addFile () {
        // console.log(this.ischooseFile)
        if(this.ischooseFile === false){
          alert("请先导入文件")
          return 0
        }

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

        this.ischooseFile = false
        var res = await axios.get('http://localhost:3000/myRoll')
        this.dataArr = JSON.parse(res.data.param)
        console.log(this.dataArr)
        this.tableData = res.data.param
        alert("导入成功")
        document.getElementById("x").innerHTML = "导入成功，请准备抽取"
      },

      async drawName () {
        if(this.tableData.length <= 0 && this.dataArr.length <= 0){
          alert("没有导入数据！请提前导入数据")
          return
        }
        // 变换抽取的种类
        this.drawType = 1
        var tp = this.drawType

        // post请求，需要发数组时，我们需要调用qs,再使用json字符串格式转换，放进params里面，并且加上：{ indices: false }才可成功传入
        var response = await axios.post('http://localhost:3000/myRoll', qs.stringify({
          params: {
            type: tp
          }},
          { indices: false }
        ))

        // 真正抽中的学生名字
        let studentName = response.data.studentName
        
        // var index = Math.floor(Math.random() * this.dataArr.length)
        // 抽签效果
        // 这个定时器表示每30秒发送一次信号，直到clearInterval为止
        let i = 0
        let timer = await setInterval(() => {
          // 注意不要越界了，范围是0 ~ length - 1
          // 注意了，还是要有一个把数据库的所有值给前端的操作，不然就不能做一个加载动画
          document.getElementById("x").innerHTML = this.dataArr[i].studentName
          i++
          if(i >= this.dataArr.length - 1){
            document.getElementById("x").innerHTML = studentName
            window.clearInterval(timer)
          }
        }, 10)

        await setTimeout(() => {
          music.play()
        }, this.dataArr.length * 11)
      
      },

      async drawTwoTimes (row) {

        /////////////////////////////////////////////////////////////////////////////////////
        // 改变抽取种类2
        this.drawType = 2
        var tp = this.drawType
        var param = {
          studentName: row.studentName
        }
        this.drawerR = false

        var {data: response} = await axios.post('http://localhost:3000/myRoll', qs.stringify({
          params: {
            ids: param,
            type: tp
          }},
          { indices: false }
        ))

        
        // 真正抽中的学生名字
        var index = response[0].id
        // 将数据库的所有值都传给前端
        // 这个数据的意义在于做一个开局抽取动画
      
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

      async drawTenTimes (row) {
        console.log(row)
        // console.log(this.dataArr)
        if(document.getElementById("x").innerHTML === '请导入抽取数据'){
          alert("不可操作，因为没有抽过人，不知指定谁为十倍")
          return
        }

        if(this.dataArr.length <= 0){
          alert("数据库没有数据供抽取，请导入")
          return
        }
        var tmp = {
          id: row.id,
          studentMessage: row.studentMessage,
          studentName: row.studentName
        }

        // 使该数据抽取概率变成十倍
        for(var idx = 0; idx < 9; idx++){
          this.dataArr.push(tmp)
        }

        // 真正抽中的学生编号
        var index = RandomNumber(0, this.dataArr.length - 1)

        // 缓存数组删除数据
        for (var idx = 0; idx < 9; idx++) {
          this.dataArr.pop()
        }

        this.drawerR = false
        // 概率抽十倍，是瞬时的，因此是不用持久化到数据库的，这一点需要注意
        // 改变抽取种类3
        this.drawType = 3

        // 抽签效果
        // 这个定时器表示每30ms发送一次信号，直到clearInterval为止
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
        }, 5)
      },

      chooseFile (e) {
        // 读取excel文件并写入到数组中
        const files = e.target.files
        if(files.length <= 0){
          // 做标记，表示已经读过文件
          this.ischooseFile = false
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
            this.ischooseFile = true
            console.log('Json转化结果：', this.dataArr)
          } catch (e) {
            return false
          }
        }
        fileReader.readAsBinaryString(files[0])
      },

      submitForm (formName) {

        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            console.log(typeof this.ruleForm.Left)
            if(parseInt(this.ruleForm.Left) > parseInt(this.ruleForm.Right)) {
              alert('非法，左边不可以大于右边')
              return
            } else if (parseInt(this.ruleForm.Left) < 0 || parseInt(this.ruleForm.Right) >= this.tableData.length) {
              alert("非法，已经越界")
              return
            } else if (this.ruleForm.Left === '' || this.ruleForm.Right === '') {
              alert("非法，有未填写的输入框")
              return
            }

            this.type = 4
            var {data: response} = await axios.post('http://localhost:3000/myRoll', qs.stringify({
              params: {
                left: this.ruleForm.Left,
                right: this.ruleForm.Right,
                type: this.type
              }},
              { indices: false }
            ))

            console.log(response.index)

          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
    width: 350px;
    height: 150px;
    position: absolute;
    border: 1px solid #333;
    border-radius: 8%;
    margin: 50px -10px;
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
