<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <el-menu
        default-active="$router.path"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/admin/welcome">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin/goods">
              <i class="el-icon-goods"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/goods/bin">
              <i class="el-icon-delete"></i>
              <span slot="title">商品回收站</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-s-grid"></i>
              <span slot="title">部门管理</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-bell"></i>
              <span slot="title">角色管理</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-document"></i>
          <span slot="title">消息管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container class="container">
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-button
              @click="toggleCollapse"
              :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            ></el-button>
          </el-col>
          <el-col :span="20">s</el-col>
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
      isCollapse: false
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
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
