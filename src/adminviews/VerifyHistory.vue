<template>
  <div id="VerifyHistory">
    <template>
      <el-table
        ref="filterTable"
        @filter-change="handleFilterChange"
        style="width: 100%"
        height="800px"
        :data="tableData"
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

<!--        <el-table-column-->
<!--                prop="status"-->
<!--                label="状态"-->
<!--                sortable-->
<!--                width="120"-->
<!--                column-key="num"-->
<!--                align="center">-->
<!--        </el-table-column>-->

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
      tableData:[{
        list_id:'1',
        songid:'123',
        songname:'123',
        userid:'123',
        username:'123',
        // status:'0',
      },],
      // trans: {
      //   1: '通过',
      //   2: '不通过',
      // },
    }
  },
  mounted () {
    this.$axios({
      url:'/user/song/inquiryByStatus',
      method: 'post',
      data:{
        status:"1"
      }
    }).then(res => {
      console.log("data:",res.data.data)
      this.tableData = res.data.data
    })

  },

  methods: {

    agree (row) {
      this.$confirm('操作后将不可更改, 是否确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: 'updateVerifyHistory',
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
    refuse (row) {
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
