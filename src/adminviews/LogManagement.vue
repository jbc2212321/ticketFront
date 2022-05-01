<template>
    <div id="LogManagement">
        <template>
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
                        width="240"
                        column-key="num"
                        align="center">
                </el-table-column>

                <el-table-column
                        prop="id"
                        label="用户ID"
                        width="240"
                        align="center"
                        sortable>
                </el-table-column>

                <el-table-column
                        prop="username"
                        label="用户名"
                        width="120"
                        align="center"
                        sortable>
                </el-table-column>

                <el-table-column
                        prop="phone"
                        label="电话号码"
                        width="120"
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
                                :type="scope.row.account === '管理员' ? 'warning' :scope.row.account === '用户' ? 'primary'
                : scope.row.account === '其他' ? 'success':'danger'"
                                :effect="scope.row.action === '管理员' ? 'dark' :scope.row.action === '用户' ? 'dark':'dark'"
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
                                    :effect="scope.row.action === '登录' ? 'plain' :scope.row.action === '注册' ? 'plain'
              : scope.row.action === '' ? 'plain': scope.row.action === '删除用户' ? 'plain'

              : scope.row.action === '保存发票' ? 'light': scope.row.action === '查看小票' ? 'light'
              : scope.row.action === '展示小票' ? 'light': scope.row.action === '删除小票' ? 'light'
              : scope.row.action === '保存车票' ? 'light': scope.row.action === '' ? 'light':'dark'"

                                    :type="scope.row.action === '登录' ? 'success' :scope.row.action === '注册' ? 'info'
              : scope.row.action === '' ? 'warning': scope.row.action === '删除用户' ? 'danger'

              : scope.row.action === '保存发票' ? 'success': scope.row.action === '展示小票' ? 'primary'
              : scope.row.action === '查看小票' ? 'primary': scope.row.action === '保存车票' ? 'success'
              : scope.row.action === '删除小票' ? 'danger':'warning'"

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
                        align="center"
                        width="150">
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
          text: '用户',
          value: '用户'
        },{
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
          url: 'admin/log/listLog',
          method: 'post'
        }).then(res => {
          console.log('日志：',res.data.data)
          this.AllData = res.data.data
          this.PageData = [...res.data.data]
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
            url: '/admin/log/delLog',
            method: 'post',
            data: {
              num: row['num']
            }
          }).then(res => {
            this.$axios({
              url: '/admin/log/listLog',
              method: 'post'
            }).then(res => {
              this.AllData = res.data.data
              this.PageData = [...res.data.data]
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