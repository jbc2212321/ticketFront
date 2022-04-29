<template>
    <div id="Inquiry">
        <template>
<!--          用户查询已获得的版权、提交版权的审核状态-->
            <el-table
                    ref="filterTable"
                    :data="tableData"
                    style="width: 100%"
                    height="800">

                <el-table-column
                        prop="num"
                        label="歌曲编号"
                        sortable
                        width="240"
                        column-key="num">
                </el-table-column>

                <el-table-column
                        prop="songid"
                        label="歌曲ID"
                        width="240">
                </el-table-column>

                <el-table-column
                        prop="songname"
                        label="歌曲名"
                        >
                </el-table-column>

                <el-table-column
                        prop="status"
                        label="状态"
                        width="180">
<!--      :filters="[{ text: '审核中', value: '0' }, { text: '通过', value: '1' }, { text: '不通过', value: '2' }]"
                        :filter-method="filterTag"
               <template slot-scope="scope">-->
<!--                        <el-tag-->
<!--                                :type="scope.row.state ===0 ? 'info' : scope.row.state === 1 ? 'success':'danger'"-->
<!--                                disable-transitions>{{trans[scope.row.state]}}-->
<!--                        </el-tag>-->
<!--                    </template>-->
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
  export default {
    name: 'Inquiry', //用户查询已获得的版权、提交版权的审核状态
    data () {
      return {
        tableData:[{
          num:'1',
          songid:'123',
          songname:'123',
          userid:'123',
          username:'123',
          status:'0',
        },
          {
            num:'2',
            songid:'234',
            songname:'2123',
            userid:'1223',
            username:'2123',
            status:'1',
          }],
        filter: '',
        trans: {
          0: '待通过',
          1: '通过',
          2: '不通过',
        },
      }
    },
    computed: {
      // tableData: function () {
      //   return this.DocList.filter(item => {
      //     if (this.filter.length === 1) {
      //       if (item['tag'] !== this.filter[0]) {
      //         return false
      //       }
      //     }
      //     return true
      //   })
      // },
      // PageData: function () {
      //
      //   return this.tableData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
      //
      // },
    },
    mounted () {
      //初始化列表
      this.$axios({
        url: 'getAllDoc',
        method: 'get',
      }).then(res => {
        this.DocList = res.data //修改
      })

      //初始化列表 axios
      this.$axios({
        url: 'getRelationship',
        method: 'post',
        data: {
          PatientPhone: this.$session.get('phone')
        }
      }).then(res => {
        this.tableData = res.data
        console.log(this.tableData)
      })
    },
    methods: {
      handleFilterChange (value) {
        this.filter = value.status
      },
      handleSizeChange (val) {
        this.currentPage = 1
        this.pagesize = val
      },
      handleCurrentChange (val) {
        this.currentPage = val
      },
      filterTag (value, row) {
        return row.tag === value
      },

      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
            this.checked = []
            this.$axios({
              url: 'getAllDoc',
              method: 'get',
            }).then(res => {
              this.DocList = res.data
            })
          })
          .catch(_ => {
          })
      },


    }
  }
</script>

<style scoped>

</style>
