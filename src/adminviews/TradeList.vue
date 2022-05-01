<template>
    <div id="TradeList">
        <template>
<!--            <el-button-->
<!--                    onclick="document.getElementById('reset').style.display='block';document.getElementById('delete').style.display='none'">-->
<!--                重置密码-->
<!--            </el-button>-->
<!--            <el-button-->
<!--                    onclick="document.getElementById('reset').style.display='none';document.getElementById('delete').style.display='block'">-->
<!--                删除医师-->
<!--            </el-button>-->


            <div id="reset">
                <el-table
                        ref="filterTable"
                        :data="tableData"
                        style="width: 100%"
                        height="800"
                        stripe
                        header-cell-style="center">

                    <el-table-column
                            prop="num"
                            label="编号"
                            sortable
                            width="120"
                            column-key="num"
                            align="center">
                    </el-table-column>

                  <el-table-column
                    prop="songid"
                    label="歌曲id"
                    sortable
                    width="120"
                    align="center">
                  </el-table-column>

                  <el-table-column
                    prop="songname"
                    label="歌曲名"
                    align="center">
                  </el-table-column>

                    <el-table-column
                            prop="owner"
                            label="原作者名"
                            width="180"
                            align="center">
                    </el-table-column>

                  <el-table-column
                    prop="ownerid"
                    label="原作者id"
                    width="200"
                    align="center">
                  </el-table-column>


                    <el-table-column
                            prop="buyer"
                            label="购买者名"
                            width="180"
                            align="center">
                    </el-table-column>

                  <el-table-column
                    prop="buyerid"
                    label="购买者id"
                    width="200"
                    align="center">
                  </el-table-column>

                    <el-table-column
                            prop="status"
                            label="交易类型"
                            width="180"
                            align="center">
                        <template slot-scope="scope">
                            <el-tag
                                    :type="scope.row.status ===0 ? 'primary' : scope.row.status === 1 ? 'success':'danger'"
                                    disable-transitions>{{trans[scope.row.status]}}
                            </el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="tag"
                            label="操作"
                            width="200"
                            align="center">
                        <template slot-scope="scope">
                            <el-button size="small" type="primary" @click="agreeReset(scope.row)">同意</el-button>
                            <el-button size="small" type="danger" @click="refuseReset(scope.row)">拒绝</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>

        </template>


    </div>
</template>

<script>
  export default {
    name: 'TradeList',
    data () {
      return {
        tableData:[
          {
            num:'',
            songid:'',
            songname:'',
            owner:'',
            ownerid:"",
            buyer:"",
            buyerid:'',
            status:""
          }
        ],

        trans: {
          0: '转让',
          1: '授权'
        }
      }
    },
    mounted: function () {
      this.$axios({
        url:'/user/song/tradeList',
        method: 'post',

      }).then(res => {
        // console.log("res:",res)

        this.tableData = res.data.data
        console.log("data:",this.tableData)
      })
    },
    methods: {
      agreeReset (row) {
        this.$confirm('操作后将不可更改, 是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("owner", row.owner)
          console.log("ownerid", row.ownerid)
          console.log("buyer", row.buyer)
          console.log("buyerid", row.buyerid)
          console.log("status", row.status)
          this.$axios({
            url: '/user/song/buy',
            method: 'post',
            data: {
              num: row.num+"",
              songid:row.songid+"",
              songname:row.songname+"",
              owner:row.owner,
              ownerid:row.ownerid+"",
              buyer:row.buyer,
              buyerid:row.buyerid+"",
              status:row.status+""
            }
          }).then(res => {
            this.$axios({
              url: '/user/song/tradeList',
              method: 'post',

            }).then(res => {
              this.tableData = res.data.data
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

      refuseReset (row) {
        this.$confirm('操作后将不可更改, 是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("owner", row.owner)
          console.log("ownerid", row.ownerid)
          console.log("buyer", row.buyer)
          console.log("buyerid", row.buyerid)
          console.log("status", row.status)
          this.$axios({
            url: '/user/song/buyDel',
            method: 'post',
            data: {
              num: row.num+"",
              songid:row.songid+"",
              songname:row.songname+"",
              owner:row.owner,
              ownerid:row.ownerid+"",
              buyer:row.buyer,
              buyerid:row.buyerid+"",
              status:row.status+""
            }
          }).then(res => {
            this.$axios({
              url: '/user/song/tradeList',
              method: 'post',

            }).then(res => {
              this.tableData = res.data.data
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
    .el-dialog .el-dialog__body {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
