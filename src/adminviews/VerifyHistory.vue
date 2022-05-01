<template>
  <div id="VerifyHistory">
    <template>
      <el-table
        ref="filterTable"
        @filter-change="handleFilterChange"
        style="width: 100%"
        height="800px"
        stripe>

        <el-table-column
          prop="list_id"
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
      list_id:'',
      userid:'',
      username:'',
      songid:'',
      songname:'',
    }
  },
  mounted () {
    this.axios({
      url:'',
      method: 'post'
    }).then(res => {
      this.list_id= res.list_id
      this.userid = res.userid
      this.username = res.username
      this.songid = res.songid
      this.songname = res.songname
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
