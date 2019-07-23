<template>
  <!-- 面包屑 -->
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 输入框 -->
    <div style="margin: 15px 0px;">
      <el-input
        placeholder="请输入内容"
        v-model="userobj.query"
        @keyup.enter.native="init"
        class="input-with-select"
        style="width:400px;margin-right:10px"
      >
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <el-button type="success" plain @click="adddialogFormVisible = true">添加用户</el-button>
    </div>

    <!-- 添加表格 -->
    <el-table :data="userList" :border="true" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <!-- 自定义模板 -->
      <el-table-column label="用户状态" width="80px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="100"
            inactive-value="0"
          ></el-switch>
        </template>
      </el-table-column>
      <!-- 自定义模板 -->
      <el-table-column label="操作" width="250px">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button
              type="primary"
              icon="el-icon-edit"
              :round="true"
              style="background-color:yellow"
              @click=showedit(scope.row)
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top-start">
            <el-button
              type="primary"
              icon="el-icon-share"
              :round="true"
              style="background-color:green"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button
              type="primary"
              icon="el-icon-delete"
              :round="true"
              style="background-color:red"
              @click='delUserList(scope.row.id)'
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页业务 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userobj.pagenum"
      :page-sizes="[3, 5, 10, 15]"
      :page-size="userobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加业务对话框 -->
    <el-dialog title="添加用户" :visible.sync="adddialogFormVisible">
      <el-form :model="addform" ref='addform' :rules='rules'>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addform.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addform.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addform.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click='addsubmit'>确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑业务弹框 -->

    <el-dialog title="编辑用户" :visible.sync="editdialogFormVisible">
      <el-form :model="editform"  ref='editform'  :label-width="'80px'" :rules='rules'>
        <el-form-item label="用户名">
          <el-input v-model="editform.username" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop='email'>
          <el-input v-model="editform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop='mobile'>
          <el-input v-model="editform.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click='editsubmit'>确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除业务弹框 -->
    <template>
      <el-button type="text"></el-button>
    </template>

  </div>
</template>
<script>
import { getAllUserList, addUser, editUser, delUser } from '@/api/user_index.js'
export default {
  data () {
    return {
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editform: {
        id: '',
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      adddialogFormVisible: false,
      editdialogFormVisible: false,
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 3
      },
      total: 0,
      userList: [],
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          // 添加正则验证规则
          { pattern: /\w+[@]\w+[.]\w+/, message: '请输入合法的电子邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入合法的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 数据初始化
    init () {
      getAllUserList(this.userobj)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.userList = res.data.data.users
            this.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 分页设置
    handleSizeChange (val) {
      // console.log(`每页${val}`)
      this.userobj.pagesize = val
      this.init()
    },
    // 分页设置
    handleCurrentChange (val) {
      // console.log(val)
      this.userobj.pagenum = val
      this.init()
    },
    // 添加新用户
    addsubmit () {
      // 对表单元素数据进行验证
      this.$refs.addform.validate(valid => {
        if (valid) {
          // 调用添加接口方法
          addUser(this.addform)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 201) {
                this.$message({
                  type: 'success',
                  message: '数据添加成功'
                })
                // 重置表单元素数据
                this.$refs.addform.resetFields()
                // 刷新页面
                this.init()
                // 隐藏弹框
                this.adddialogFormVisible = false
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            type: 'error',
            message: '数据不合法'
          })
          return false
        }
      })
    },
    // 显示编辑弹框,导入默认数据
    showedit (row) {
      console.log(row)
      this.editdialogFormVisible = true
      this.editform.id = row.id
      this.editform.username = row.username
      this.editform.email = row.email
      this.editform.mobile = row.mobile
    },
    // 编辑查询修改用户信息
    editsubmit () {
      // 对表单元素数据进行验证
      this.$refs.editform.validate(valid => {
        if (valid) {
          // 调用添加接口方法
          editUser(this.editform)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: '数据添加成功'
                })
                // 重置表单元素数据
                this.$refs.editform.resetFields()
                // 刷新页面
                this.init()
                // 隐藏弹框
                this.editdialogFormVisible = false
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            type: 'error',
            message: '数据不合法'
          })
          return false
        }
      })
    },
    // 根据id删除用户数据
    delUserList (id) {
      console.log(id)
      this.$confirm(`此操作将永久删除ID为${id}的用户数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser(id)
          .then(res2 => {
            if (res2.data.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '数据已删除'
              })
              this.init()
            }
          })
          .catch(err2 => {
            console.log(err2)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
