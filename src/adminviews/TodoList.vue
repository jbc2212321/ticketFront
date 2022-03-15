<template>
    <div id="TodoList">
        <template>
<!--            <el-button-->
<!--                    onclick="document.getElementById('reset').style.display='block';document.getElementById('delete').style.display='none'">-->
<!--                重置密码-->
<!--            </el-button>-->
<!--            <el-button-->
<!--                    onclick="document.getElementById('reset').style.display='none';document.getElementById('delete').style.display='block'">-->
<!--                删除医师-->
<!--            </el-button>-->


            <div id="reset" style="display:block">
                <el-table
                        ref="filterTable"
                        :data="resetData"
                        style="width: 100%"
                        height="600"
                        stripe
                        header-cell-style="center">

                    <el-table-column
                            prop="num"
                            label="编号"
                            sortable
                            width="80"
                            column-key="num"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="name"
                            label="用户名"
                            width="120"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="id"
                            label="用户ID"
                            width="150"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="type"
                            label="账户类型"
                            width="100"
                            align="center">
                        <template slot-scope="scope">
                            <el-tag
                                    :type="scope.row.type === '病人' ? 'primary' :
                                    scope.row.type === '医生' ? 'success' : 'warning'"
                                    disable-transitions>{{scope.row.type}}
                            </el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="tel"
                            label="手机号"
                            width="150"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="content"
                            label="申请内容"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="time"
                            label="提交时间"
                            width="200"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="state"
                            label="处理状态"
                            width="180"
                            align="center">
                        <template slot-scope="scope">
                            <el-tag
                                    :type="scope.row.state === 0 ? 'info' : scope.row.state === 1 ? 'success':'danger'"
                                    disable-transitions>{{trans[scope.row.state]}}
                            </el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="tag"
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
                            <el-button size="small" type="primary" @click="agreeReset(scope.row)">同意</el-button>
                            <el-button size="small" type="danger" @click="refuseReset(scope.row)">拒绝</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>

            <div id="delete" style="display: none">
                <el-table
                        ref="filterTable"
                        :data="deleteData"
                        style="width: 100%"
                        height="600"
                        stripe
                        header-cell-style="center">

                    <el-table-column
                            prop="num"
                            label="编号"
                            sortable
                            width="80"
                            column-key="num"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="name"
                            label="病人姓名"
                            width="120"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="id"
                            label="病人ID"
                            width="80"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="doctorName"
                            label="医生姓名"
                            width="120"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="doctorId"
                            label="医生ID"
                            width="80"
                            align="center">
                    </el-table-column>


                    <el-table-column
                            prop="content"
                            label="申请内容"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="time"
                            label="提交时间"
                            width="200"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="state"
                            label="处理状态"
                            width="180"
                            align="center">
                        <template slot-scope="scope">
                            <el-tag
                                    :type="scope.row.state === 0 ? 'info' : scope.row.state === 1 ? 'success':'danger'"
                                    disable-transitions>{{trans[scope.row.state]}}
                            </el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="tag"
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
                            <el-button size="small" type="primary" @click="agreeDelete(scope.row)">同意</el-button>
                            <el-button size="small" type="danger" @click="refuseDelete(scope.row)">拒绝</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </template>


    </div>
</template>

<script>
  export default {
    name: 'TodoList',
    data () {
      return {
        resetData: [],
        deleteData: [],
        trans: {
          0: '待处理',
          1: '已处理'
        }
      }
    },
    mounted: function () {
      this.$axios({
        url: 'getTodoListReset',
        method: 'get',
      }).then(res => {
        this.resetData = res.data
      })
      this.$axios({
        url: 'getTodoListDelete',
        method: 'get',
      }).then(res => {
        this.deleteData = res.data
      })
    },
    methods: {
      agreeReset (row) {
        this.$confirm('操作后将不可更改, 是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url: 'updateTodoList',
            method: 'post',
            data: {
              num: row.num,
              state: 1,
              content: row.content,
              phone: row.tel,
              type: row.type
            }
          }).then(res => {
            this.$axios({
              url: 'getTodoListReset',
              method: 'get',
            }).then(res => {
              this.resetData = res.data
            })
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      refuseReset (row) {
        this.$confirm('操作后将不可更改, 是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url: 'updateTodoList',
            method: 'post',
            data: {
              num: row.num,
              state: 2,
              content: row.content,
              phone: row.tel,
              type: row.type
            }
          }).then(res => {
            this.$axios({
              url: 'getTodoListReset',
              method: 'get',
            }).then(res => {
              this.resetData = res.data
            })
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      agreeDelete (row) {
        this.$confirm('操作后将不可更改, 是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url: 'updateTodoList',
            method: 'post',
            data: {
              num: row.num,
              state: 1,
              content: row.content,
              patientId:row.id,
              doctorId: row.doctorId,
              type: row.type
            }
          }).then(res => {
            this.$axios({
              url: 'getTodoListDelete',
              method: 'get',
            }).then(res => {
              this.deleteData = res.data
            })
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      refuseDelete (row) {
        this.$confirm('操作后将不可更改, 是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url: 'updateTodoList',
            method: 'post',
            data: {
              num: row.num,
              state: 2,
              content: row.content,
              patientId:row.id,
              doctorId: row.doctorId,
              type: row.type
            }
          }).then(res => {
            this.$axios({
              url: 'getTodoListDelete',
              method: 'get',
            }).then(res => {
              this.deleteData = res.data
            })
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      open () {

      },

    }
  }
</script>

<style scoped>
    .el-dialog .el-dialog__body {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>