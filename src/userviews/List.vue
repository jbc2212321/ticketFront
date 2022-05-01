<template>
    <div id="List">
<!--      用户查看所有获得授权认证的版权列表-->
      <el-table
        ref="filterTable"
        :data="tableData"
        style="width: 100%"
        height="800">

        <el-table-column
          prop="list_id"
          label="编号"
          sortable
          width="120"
          column-key="list_id">
        </el-table-column>

        <el-table-column
          prop="songid"
          label="歌曲ID"
          width="120">
        </el-table-column>

        <el-table-column
          prop="songname"
          label="歌曲名"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="userid"
          label="所属用户id"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="所属用户名"
          width="180">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>


  export default {
    data() {
      return {
        tableData:[{
          num:'',
          songid:'',
          songname:'',
          userid:'',
          username:'',
        }]
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
        // console.log("res:",res)

        this.tableData = res.data.data
        console.log("data:",this.tableData)
      })

    },
  }
</script>

<style scoped>

</style>
