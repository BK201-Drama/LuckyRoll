<template>
  <div class="RollComponent">
    <img src="../assets/img/spinning.png" class="spinning">
    <p class="rollText" id="x">
      Lorem, ipsum.
    </p>

    <input type="file" id="files" multiple="multiple" @change="chooseFile">
    <button @click="drawName">抽取</button>
    
  </div>
</template>

<script>
  import XLSX from 'xlsx'
  import axios from 'axios'

  export default{
    data() {
      return {
        dataArr: []
      }
    },
    methods: {
      drawName () {
        // let param = {
        //   account: this.dataArr[0].account
        // }
        axios.post('/myRoll').then((response) => {
          // var mes = response.body.message
          // alert(mes)
          console.log(response)
        })
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

        const fileReader = new FileReader()
        fileReader.onload = (ev) => {
          try {
            const data = ev.target.result;
            const workbook = XLSX.read(data, {
              type: 'binary'
            })
            const wsname = workbook.SheetNames[0]//取第一张表
            this.dataArr = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])//生成json表格内容
            // console.log('Json转化结果：', this.dataArr)
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
  .RollComponent {
    margin-left: 600px;
  }
  .rollText {
    width: 450px;
    height: 450px;
    border-radius: 50%;
    position: absolute;
    background-color: aqua;
    margin: 75px 75px;
    text-align: center;
    line-height: 450px;
    font-size: 60px;
  }

  .spinning {
    width: 600px;
    height: 720px;
    display: block;
    float: left;  
    padding: 0px 0px;
  }
</style>
