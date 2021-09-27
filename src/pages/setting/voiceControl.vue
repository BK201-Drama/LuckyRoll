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
          <div class="block">
            <span class="demonstration">音量：{{value1}}</span>
            <el-slider v-model="value1"></el-slider>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import LeftWindows from '../../components/LeftWindows'
  
  export default {
    data() {
      return {
        value1: 50
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
    line-height: 200px;
    background-color: #E9EEF3;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #545c64;
  }
  .block {
    width: 300px;
    margin-left: 300px;
    margin-top: 120px
  }
</style>