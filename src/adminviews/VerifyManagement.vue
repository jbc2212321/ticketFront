<template>
    <div id="VerifyManagement">
        <template>
            <el-table
                    ref="filterTable"
                    :data="ManageData"
                    @filter-change="handleFilterChange"
                    style="width: 100%"
                    height="800px"
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
                        prop="userid"
                        label="用户ID"
                        width="200"
                        align="center"
                        sortable>
                </el-table-column>

                <el-table-column
                        prop="username"
                        label="用户名"
                        width="150"
                        align="center">
                </el-table-column>

                <el-table-column
                        prop="songid"
                        label="歌曲id"
                        width="300"
                        sortable
                        align="center"
                >
                </el-table-column>

              <el-table-column
                prop="songname"
                label="歌曲名"
                align="center"
              >
              </el-table-column>

                <el-table-column
                        prop="manage"
                        label="管理"
                        width="200">
                  <template slot-scope="scope">
                    <el-button size="small" type="primary" @click="agree(scope.row)">同意</el-button>
                    <el-button size="small" type="danger" @click="refuse(scope.row)">拒绝</el-button>
                  </template>
                </el-table-column>
            </el-table>
        </template>
        <br>
    </div>
</template>

<script>
  export default {
    name: 'VerifyManagement',
    data () {
      return {
        ManageData:[
          {
            num:'1',
            songid:'2',
            songname:'3',
            userid:'4',
            username:'5',
            manage:''
          },
          {
            num:'2',
            songid:'2',
            songname:'3',
            userid:'4',
            username:'5',
            manage:''
          }
        ]
      }
    },
    mounted () {
      this.axios()
    },

    methods: {

      agree (row) {
        this.$confirm('操作后将不可更改, 是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url: 'updateTodoList',
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

    }
  }
</script>

<style scoped>

</style>
