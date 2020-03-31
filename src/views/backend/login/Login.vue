<!--
 * @Author: niansnana
 * @Begin: 2020-03-31 14:16:15
 * @Update: 
 * @Update log: 简单编写登录页
 -->
<template>
  <div class="container">
    <div class="main-content">
      <div class="login-header">
        <h2>shopify</h2>
      </div>
      <el-form class="login-body" :model="userLogin" :rules="userLoginRules" ref="userLoginRef">
        <el-form-item prop="username">
          <el-input v-model="userLogin.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="userLogin.password"
            placeholder="密码"
            prefix-icon="el-icon-setting"
            suffix-icon="el-icon-view"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <p>尚未完成，跳往<a href="/admin/index">后台</a></p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="warning">注册</el-button>
        </el-form-item>
      </el-form>
      <div class="login-footer">shopify 2020 © niansnana</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usersData: [],
      userLogin: {
        username: '',
        password: ''
      },
      userLoginRules: {}
    }
  },
  methods: {
    login() {
      // 登录验证
      this.$api.userLoginFn(this.userLogin).then(res => {
        const result = res.data.data
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  height: 100vh
  background-color: #2b4b6b
  .main-content
    min-height: 70vh
    display: flex
    flex-flow: column wrap
    justify-content: center
    align-items: center
    padding: 50px 20px 150px
    background-color: transparent
    text-align: center
    .login-header
      padding: 20px
      color: #ffffff
      h2
        margin: 0 0 15px
        font-size: 40px
        font-weight: 400
        letter-spacing: 2px
        text-transform: uppercase
    .login-body
      padding: 20px 30px
      background-color: #fff
    .login-footer
      position: absolute
      bottom: 0
      color: #fff
      padding: 20px 40px
</style>