<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <el-menu
        :default-active="activePath"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
        background-color="#333744"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/admin/welcome" @click="savaActivePath('/admin/welcome')">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu :index="item.path" v-for="item in menuList" :key="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <el-menu-item
            :v-show="item.id == subitem.parent"
            :index="subitem.path"
            v-for="subitem in subMenus"
            :key="subitem.id"
            @click="savaActivePath(subitem.path)"
          >
            <i :class="subitem.icon"></i>
            <span slot="title">{{ subitem.title }}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container class="container">
      <el-header>
        <el-row>
          <el-col :span="2">
            <el-button
              @click="toggleCollapse"
              :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            ></el-button>
            <el-button type="text" icon="el-icon-refresh" title="刷新当前页面" @click="refreshCurrentPage"></el-button>
          </el-col>
          <el-col :span="2" :offset="20">
            <i class="el-icon-bell"></i>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <el-dropdown>
              <span class="el-dropdown-link">
                admin
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activePath: '', // 解决页面刷新，高亮失效问题
      isCollapse: false,
      menuList: [],
      subMenus: []
    }
  },
  created() {
    this.getMenus()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    async getMenus() {
      const { data: resM } = await this.$http.get('menus')
      const { data: resS } = await this.$http.get('submenu')
      this.menuList = resM.data
      this.subMenus = resS.data
    },
    savaActivePath(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    // 刷新当然路由页面
    refreshCurrentPage(){
      this.$router.go(0)
    },
    // 退出登录
    logout(){
      this.$router.push('/admin')
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-container
  height: 100%
  .el-aside
    background-color: #333744
    .el-menu
      border-right: none
  .container
    background-color: #eaedf1
    .el-header
      background-color: #fff
      line-height: 60px
</style>>
