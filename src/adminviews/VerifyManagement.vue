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
                        prop="list_id"
                        label="编号"
                        sortable
                        width="120"
                        column-key="list_id"
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
                        align="center"
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
            list_id:'',
            songid:'',
            songname:'',
            userid:'',
            username:'',
            manage:''
          },
        ]
      }
    },
    mounted () {
      this.$axios({
        url:'/user/song/inquiryByStatus',
        method: 'post',
        data:{
          status:"0"
        }
      }).then(res => {
        console.log("data:",res.data.data)
        this.ManageData = res.data.data
      })
    },

    methods: {

      refuse (row) {
        this.$confirm('操作后将不可更改, 是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log(":", row['num']+'')
          this.$axios({
            url: 'user/song/updateVerifyList',
            method: 'post',
            data: {
              num: row['list_id']+'',
              status:'2'
            }
          }).then(res => {
            this.$axios({
              url: '/user/song/inquiryByStatus',
              method: 'post',
              data:{
                status:"0"
              }
            }).then(res => {
              console.log("更新:",res)
              this.ManageData = res.data.data
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
      agree (row) {
        this.$confirm('操作后将不可更改, 是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log(":", row['num']+'')
          this.$axios({
            url: 'user/song/updateVerifyList',
            method: 'post',
            data: {
              num: row['list_id']+'',
              status:'1'
            }
          }).then(res => {
            this.$axios({
              url: '/user/song/inquiryByStatus',
              method: 'post',
              data:{
                status:"0"
              }
            }).then(res => {
              console.log("更新:",res)
              this.ManageData = res.data.data
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
