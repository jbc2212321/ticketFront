<template>
    <div id="LogManagement">
        <template>
            <el-date-picker
                    v-model="date"
                    align="right"
                    type="date"
                    placeholder="选择日期"
            >
            </el-date-picker>
            <el-button @click="chooseDate" type="primary">提交筛选</el-button>

            <el-table
                    ref="filterTable"
                    @filter-change="handleFilterChange"
                    :data="PageData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)"
                    style="width: 100%"
                    height="550px"
                    stripe>

                <el-table-column
                        prop="num"
                        label="编号"
                        sortable
                        width="120"
                        column-key="num"
                        align="center">
                </el-table-column>

                <el-table-column
                        prop="id"
                        label="用户ID"
                        width="200"
                        align="center"
                        sortable>
                </el-table-column>

                <el-table-column
                        prop="account"
                        column-key="status"
                        label="用户类型"
                        width="150"
                        align="center"
                        :filters="filters"
                        :filter-method="filterTag">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.account === '管理员' ? 'warning' :scope.row.account === '病人' ? 'primary'
                : scope.row.account === '医生' ? 'success':'danger'"
                                disable-transitions>{{scope.row.account}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="action"
                        label="操作内容"
                        align="center">
                    <template slot-scope="scope">
                        <div class="white">
                            <el-tag
                                    :effect="scope.row.action === '登录' ? 'plain' :scope.row.action === '查看病人列表' ? 'plain'
              : scope.row.action === '添加用户' ? 'plain': scope.row.action === '删除医生或病患' ? 'plain'
              : scope.row.action === '查询预约' ? 'plain': scope.row.action === '登出' ? 'plain'
              : scope.row.action === '查询' ? 'light': scope.row.action === '修改密码' ? 'light'
              : scope.row.action === '上传' ? 'light': scope.row.action === '修改医生权限' ? 'light'
              : scope.row.action === '查看日志' ? 'light': scope.row.action === '删除日志' ? 'light'
              : scope.row.action === '绘制图表' ? 'dark': scope.row.action === '修改个人信息' ? 'dark'
              : scope.row.action === '预约医生' ? 'dark': scope.row.action === '同意预约' ? 'dark'
              : scope.row.action === '查看用户管理界面' ? 'dark': scope.row.action === '取消预约' ? 'dark':'dark'"

                                    :type="scope.row.action === '登录' ? 'success' :scope.row.action === '修改个人信息' ? 'info'
              : scope.row.action === '添加用户' ? 'warning': scope.row.action === '删除医生或病患' ? 'danger'
              : scope.row.action === '修改医生权限' ? 'primary': scope.row.action === '登出' ? 'danger'
              : scope.row.action === '查询' ? 'info': scope.row.action === '修改密码' ? 'success'
              : scope.row.action === '上传' ? 'warning': scope.row.action === '查看用户管理界面' ? 'primary'
              : scope.row.action === '查看日志' ? 'info': scope.row.action === '删除日志' ? 'danger'
              : scope.row.action === '绘制图表' ? 'primary': scope.row.action === '查看病人列表' ? 'info'
              : scope.row.action === '预约医生' ? 'warning': scope.row.action === '同意预约' ? 'success'
              : scope.row.action === '查询预约' ? 'primary': scope.row.action === '取消预约' ? 'danger':'danger'"

                                    disable-transitions>{{scope.row.action}}
                            </el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="执行时间"
                        width="300"
                        sortable
                        align="center"
                >
                </el-table-column>

                <el-table-column
                        prop="manage"
                        label="管理"
                        width="200">
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <br>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 8, 15, 20]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="PageData.length">
        </el-pagination>
    </div>
</template>

<script>
  export default {
    name: 'LogManagement',
    data () {
      return {
        date: '',
        currentPage: 1,
        pagesize: 8,
        PageData: [],
        filters: [{
          text: '病人',
          value: '病人'
        }, {
          text: '医生',
          value: '医生'
        }, {
          text: '管理员',
          value: '管理员'
        }],
        filterList: [],
        AllData: [],
        resultData: [],
      }
    },
    mounted () {
      this.axios()
    },
    watch: {
      filterList (n, o) {
        if (n) {
          if (n.length === 3 || n.length === 0) {
            this.PageData = this.AllData
            this.currentPage = 1
            this.pagesize = 8
          }
          if (n.length === 1) {
            this.PageData = this.AllData.filter((i) => {
              return i.account === n[0]
            })
            this.currentPage = 1
            this.pagesize = 8
          }
          if (n.length === 2) {
            this.PageData = this.AllData.filter((i) => {
              return i.account === n[0] || i.account === n[1]
            })
            this.currentPage = 1
            this.pagesize = 8
          }
        }
      }
    },
    methods: {
      chooseDate () {
        if (this.date === '') {
          this.$message({
            showClose: true,
            message: '请先选择日期！',
            type: 'warning'
          })
          return
        }
        this.$axios({
          url: 'getAllLogByDate',
          method: 'post',
          data: {
            date: this.date
          }
        }).then(res => {
          this.AllData = res.data
          this.PageData = [...res.data]
          this.currentPage = 1
          this.pagesize = 8
        })
      },
      axios () {
        this.$axios({
          url: 'getAllLog',
          method: 'get'
        }).then(res => {
          this.AllData = res.data
          this.PageData = [...res.data]
        })
      },
      filterTag (value, row) {
        return row.account === value
      },
      handleSizeChange (val) {
        this.currentPage = 1
        this.pagesize = val
      },
      handleCurrentChange (val) {
        this.currentPage = val
      },
      handleFilterChange (value) {
        this.filterList = value.status
      },
      deleteRow (row) {
        this.$confirm('执行删除操作后不可恢复, 是否确认操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url: 'deleteLogByNum',
            method: 'post',
            data: {
              num: row['num']
            }
          }).then(res => {
            this.$axios({
              url: 'getAllLog',
              method: 'get'
            }).then(res => {
              this.AllData = res.data
              this.PageData = [...res.data]
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
            })

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      //   handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // }
    }
  }
</script>

<style scoped>

</style>