<template>
  <div>
    <img class="myImg I1" src='../assets/img/Login.png' />
    <div class="all">
      <div class="box">
        <h1 class="tab">Login</h1>
        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="username">
            <el-input type="username" v-model="ruleForm.username" ></el-input>
          </el-form-item>
          <el-form-item label="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>


</template>

<script>
  import * as LoginAPI from '../service/login'
  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        isLogin: false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            console.log(this.ruleForm)
            var res = await LoginAPI.getLogin({
              username: this.ruleForm.username,
              password: this.ruleForm.password
            })
            console.log(res)
            if(res.data.isLogin === true){
              alert("登录成功！")
              this.isLogin = res.data.isLogin
              this.$router.push("/myRoll");
            }else{
              alert("登陆失败！")
              this.isLogin = res.data.isLogin
            }
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
  .all {
    width: 400px;
    height: 300px;
    background-color: #fff;
    margin-left: 100px;
    padding-top: 30px 
  }

  .tab {
    text-align: 'center'; 
    color: '#778';
    padding-left: 250px
  }

  .myImg {
    width: 100%;
    height: 100%;
    float: none;
    position: fixed;
    margin-left: -8px;
    margin-top: -7px
  }

  .box {
    width: 600px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .demo-ruleForm {
    padding-right: 100px;
    padding-left: 50px
  }
</style>