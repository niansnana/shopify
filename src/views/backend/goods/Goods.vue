<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 商品搜索 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="input" clearable>
            <el-button slot="append" icon="el-icon-search" title="搜索"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" title="添加商品" @click="showAddGoodsDialog = true">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 商品列表 -->
      <el-table
        :data="goodsData.slice((currentPage-1) * pagesize,currentPage*pagesize)"
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="introduce" label="商品简介"></el-table-column>
        <el-table-column prop="logo" label="商品Logo"></el-table-column>
        <el-table-column prop="price" label="商品价格（元）"></el-table-column>
        <el-table-column label="商品状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="changeAdminStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="上架时间"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 弹出表单 -->
    <el-dialog title="添加商品" :visible.sync="showAddGoodsDialog">
      <el-form :model="form" label-width="70px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品信息">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上架时间">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddGoodsDialog = false">取 消</el-button>
        <el-button type="primary" @click="showAddGoodsDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      currentPage: 1, // 初始页
      pagesize: 10, // 每页数据
      // 表格数据
      goodsData: [],
      total: 0,
      // 弹出表单
      showAddGoodsDialog: false,
      form: {
        name: '',
        info: '',
        price: '',
        addedTime: ''
      }
    }
  },
  created() {
    this.getGoods()
  },
  methods: {
    async getGoods() {
      const { data: res } = await this.$http.get('goods')
      if (res.code !== 200) return this.$message.error('数据加载失败！')
      this.goodsData = res.data
      this.total = res.data.length
    },
    handleSizeChange(size) {
      this.pagesize = size // 页码数据数更新
      // console.log(this.pagesize) //每页下拉显示数据
    },
    handleCurrentChange(page) {
      this.currentPage = page // 页码值动态更新
      // console.log(this.currentPage)
    },
    async changeAdminStatus(goodsData){
      // console.log(goodsData)
      const { data: res } = await this.$http.put(`goods/${goodsData.id}?status=${goodsData.status}`)
      if(res.code !== 200){
        goodsData.status = !goodsData.status
        this.$message.error(res.msg)
      }
      this.$message.success(res.msg)
    }
  }
}
</script>