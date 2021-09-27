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
          <!-- <el-scrollbar style="width: 100%"> 
            <Roll />
          </el-scrollbar> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import LeftWindows from '../components/LeftWindows.vue'
  
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
    line-height: 200px;
    background-color: #E9EEF3;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #545c64;
    line-height: 160px;
  }
</style>