<template>
  <div id="VerifyHistory">
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


      </el-table>
    </template>
    <br>
  </div>
</template>

<script>
export default {
  name: 'LogManagement',
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
      // date: '',
      // currentPage: 1,
      // pagesize: 8,
      // PageData: [],
      // filters: [{
      //   text: '病人',
      //   value: '病人'
      // }, {
      //   text: '医生',
      //   value: '医生'
      // }, {
      //   text: '管理员',
      //   value: '管理员'
      // }],
      // filterList: [],
      // AllData: [],
      // resultData: [],
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
