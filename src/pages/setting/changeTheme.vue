<template>
<!-- 入口文件 -->
  <div>
    <el-container>
      <el-aside width="300px">
        <el-scrollbar style="width: 100%">
          <LeftWindows />
        </el-scrollbar>
      </el-aside>

      <el-container>
        <el-main>
            <p class="chengeThemeText">请选择你想更换的主题</p>
            <el-row>
              <el-button class="btn">默认</el-button>
              <el-button class="btn" type="primary">天空蓝</el-button>
              <el-button class="btn" type="success">安全绿</el-button>
            </el-row>
            <el-row>
              <el-button class="btn" type="info">雾霾灰</el-button>
              <el-button class="btn" type="warning">元气黄</el-button>
              <el-button class="btn" type="danger">危险红</el-button>
            </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import LeftWindows from '../../components/LeftWindows'
  
  export default {
    data(){
      return {

      }
    },
    components: {
      LeftWindows
    },
    methods:{

    }
  }
</script>

<style>

  
  .el-aside {
    color: #545c64;
    text-align: center;
    /* line-height: 200px; */
    background-color: #E9EEF3;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #545c64;
  }
  .btn {
    width: 300px;
    height: 200px;
    margin-top: 50px;
    margin-left: 250px;
    margin-right: 50px
  }
  .chengeThemeText {
    font-size: 50px;
    color: #008c8c;
    text-align: center;
  }
</style>