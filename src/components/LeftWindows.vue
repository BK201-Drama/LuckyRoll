<template id="LeftWindows">
  <div class="navbar">
    <el-container style="height: 1000px; border: 1px solid #eee">
      
      <el-aside width="300px" style="background-color: #eee">
        <el-menu :default-openeds="['1', '3']">

          <!-- myRoll -->
          <router-link to='/myRoll'>
            <el-menu-item index="1">
              <i class="el-icon-message"></i>我的转盘
            </el-menu-item>
          </router-link>

          <!-- more -->
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>更多</template>
            <el-menu-item index="2-1">选项2-1</el-menu-item>
            <el-menu-item index="2-2">选项2-2</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>设置</template>

            <router-link to='/voiceControl'>
              <el-menu-item index="3-1">声音调节</el-menu-item>
            </router-link>

            <router-link to='/changeTheme'>
              <el-menu-item index="3-2">切换主题</el-menu-item>
            </router-link>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>