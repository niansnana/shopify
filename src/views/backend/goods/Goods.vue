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
          <el-input placeholder="请输入内容" v-model="keywords" clearable>
            <el-button slot="append" icon="el-icon-search" title="搜索" @click="queryContent"></el-button>
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
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="changeAdminStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="上架时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditGoodsDialog(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteGoods(scope.row.id)"
            >删除</el-button>
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
    <!-- 创建商品Dialog -->
    <el-dialog title="添加商品" :visible.sync="showAddGoodsDialog" @close="resetAddForm" width="50%">
      <el-form :model="addGoods" :rules="addGoodsRules" ref="addGoodsRef" label-width="100px">
        <el-form-item label="商品名称" prop="name" required>
          <el-input v-model="addGoods.name"></el-input>
        </el-form-item>
        <el-row :gutter="4">
          <el-col :span="10">
            <el-form-item label="商品分类" prop="cat_id">
              <el-cascader filterable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="商品价格" prop="price" required>
              <el-input v-model.number="addGoods.price"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="商品logo" prop="logo">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品简介" prop="introduce" required>
          <el-input type="textarea" v-model="addGoods.introduce"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createGoods">立即创建</el-button>
          <el-button @click="resetAddForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改商品Dialog -->
    <el-dialog title="编辑商品" :visible.sync="editDialoVisible" @close="resetEditForm" width="50%">
      <el-form :model="editGoodsData" :rules="addGoodsRules" ref="editGoodsRef" label-width="100px">
        <el-form-item label="商品名称" prop="name" required>
          <el-input v-model="editGoodsData.name"></el-input>
        </el-form-item>
        <el-row :gutter="4">
          <el-col :span="10">
            <el-form-item label="商品分类" prop="cat_id">
              <el-cascader filterable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="商品价格" prop="price" required>
              <el-input v-model="editGoodsData.price"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="商品logo" prop="logo">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品简介" prop="introduce" required>
          <el-input type="textarea" v-model="editGoodsData.introduce"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editGoods">立即修改</el-button>
          <el-button @click="resetEditForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义校验规则
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('商品价格不能为空！'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('输入不合法，请重新输入！'))
        } else {
          if (value < 0) {
            callback(new Error('价格必须大于等于 0'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      keywords: '',
      currentPage: 1, // 初始页
      pagesize: 10, // 每页数据
      // 表格数据
      goodsData: [],
      total: 0,
      // 创建商品
      showAddGoodsDialog: false,
      addGoods: {
        name: '',
        price: '',
        introduce: ''
      },
      addGoodsRules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        price: [
          {
            required: true,
            validator: checkNum,
            trigger: 'blur'
          }
        ],
        introduce: [
          { required: true, message: '请输入商品简介', trigger: 'blur' },
          { min: 4, max: 32, message: '长度在 4 到 32 个字符', trigger: 'blur' }
        ]
      },
      // 编辑商品
      editDialoVisible: false,
      editGoodsData: {},
      editGoodsRules: {} // 防止冗余，不必要时候调用 addGoodsRules 规则
    }
  },
  created() {
    this.getGoods()
  },
  methods: {
    // 获取表单数据
    async getGoods() {
      const { data: res } = await this.$http.get('goods')
      if (res.code !== 200) return this.$message.error('数据加载失败！')
      this.goodsData = res.data
      this.total = res.data.length
    },
    // 在线修改商品状态
    async changeAdminStatus(goodsData) {
      // console.log(goodsData)
      const { data: res } = await this.$http.put(
        `goods/${goodsData.id}?status=${goodsData.status}`
      )
      if (res.code !== 200) {
        goodsData.status = !goodsData.status
        this.$message.error(res.msg)
      }
      this.$message.success(res.msg)
    },
    // 创建商品
    async createGoods() {
      const { data: res } = await this.$http.post('goods', this.addGoods)
      if (res.code !== 201) {
        this.$message.error(res.msg)
      }
      this.$message.success(res.msg)
      this.showAddGoodsDialog = false
      this.getGoods()
    },
    // 查看指定商品
    async showEditGoodsDialog(id) {
      const { data: res } = await this.$http.get('goods/' + id)
      if (res.code !== 201) {
        this.$message.error('数据加载异常，请稍后再试···')
      }
      this.editGoodsData = res.data
      this.editDialoVisible = true
    },
    // 编辑指定商品
    async editGoods() {
      const { data: res } = await this.$http.put(
        'goods/' + this.editGoodsData.id,
        this.editGoodsData
      )
      if (res.code !== 200) {
        this.$message.error('修改失败，没想到吧，哈哈···')
      }
      this.$message.success(res.msg)
      this.editDialoVisible = false
      this.getGoods()
    },
    // 删除商品
    async deleteGoods(id) {
      const confirmResult = await this.$confirm(
        '此操作讲永久删除该商品，是否继续？',
        '删除信息',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消成功')
      }
      const { data: res } = await this.$http.delete('goods/' + id)
      this.getGoods() // 小知识点，js的异步与同步，放在底部反而会同步加载导致页面不刷新
      if (res.code !== 204) {
        return this.$message.error(res.msg)
      }
      this.$message.success(res.msg)
    },
    // 模糊查询（失败...）
    async queryContent() {
      // this.goodsData.filter(goods => {
      //   if (goods.name.includes(this.keywords)) {
      //     // console.log(goods)
      //     return goods
      //   }
      // })
    },
    // 重置
    resetAddForm() {
      this.$refs.addGoodsRef.resetFields()
    },
    resetEditForm() {
      this.$refs.editGoodsRef.resetFields()
    },
    handleSizeChange(size) {
      this.pagesize = size // 页码数据数更新
      // console.log(this.pagesize) //每页下拉显示数据
    },
    handleCurrentChange(page) {
      this.currentPage = page // 页码值动态更新
      // console.log(this.currentPage)
    },
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>