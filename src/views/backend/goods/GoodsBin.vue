<!--
 * @Author: niansnana
 * @Begin: 2020-03-30 16:44:46
 * @Update: 22020-03-31 13:24:12
 * @Update log: 第一次测试封装axios
 -->
<template>
  <div>
    <p>商品回收处</p>
    <p>这里测试封装的axios的接口传输</p>
    <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
    <!-- 商品列表 -->
    <el-table
      :data="adminData.slice((currentPage-1) * pagesize,currentPage*pagesize)"
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="role_id" label="角色" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="addAdmin" label-width="70px">
        <el-form-item prop="role_id" label="角色">
          <el-input v-model="addAdmin.role_id"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input v-model="addAdmin.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="addAdmin.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="_addAdmin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      adminData: [],
      dialogFormVisible: false,
      addAdmin: {
        role_id: '',
        username: '',
        password: ''
      }
    }
  },
  created() {
    this._getAdminLists()
  },
  methods: {
    _getAdminLists() {
      api.adminListFn().then(res => {
        const { data } = res.data
        this.adminData = data
      })
    },
    // 添加用户
    _addAdmin() {
      api.adminCreateFn(this.addAdmin).then(res => {
        console.log(res)
        console.log(res.data)
      })
      this.dialogFormVisible = false
    }
  }
}
</script>