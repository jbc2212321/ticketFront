<template>
    <div id="MyDoctor">
        <template>
            <!-- 账户过滤器 -->
            <!--            <el-button @click="resetTagFilter">清除账户过滤器</el-button>-->
            <el-button @click="dialogVisible = true">添加医师</el-button>
            <el-dialog
                    :visible.sync="dialogVisible"
                    width="80%"
                    :before-close="handleClose">
                <!--                添加医生弹出的对话框-->
                <span>
<!--          选择医生-->
          <el-table
                  ref="filterTable"

                  @filter-change="handleFilterChange"
                  :data="PageData"
                  style="width: 100%"
                  stripe
                  height="513px">
          <el-table-column
                  prop="num"
                  label="编号"
                  sortable
                  width="120"
                  column-key="num">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="医生姓名"
                  width="150">
          </el-table-column>
          <el-table-column
                  prop="tag"
                  label="所属科室"
                  width="180"
                  column-key="status"
                  :filters="filters"
                  :filter-method="filterTag">
          <template slot-scope="scope">
            <el-tag
                    :type="scope.row.tag === '口腔科' ? 'primary' : 'success'"
                    disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
          </el-table-column>
          <el-table-column
                  prop="tel"
                  label="手机号">
          </el-table-column>

          <el-table-column
                  prop="choose"
                  label="状态"
                  width="100">
            <template slot-scope="scope">
              <el-tag
                      :type="scope.row.choose === '未选' ? 'primary' : 'success'"
                      disable-transitions>{{scope.row.choose}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
                  prop="tag"
                  label="操作"
                  width="200">
              <template slot-scope="scope">
            <el-button size="mini" @click="choose(scope.row)">选择</el-button>
              <el-button
                      @click.native.prevent="cancel(scope.row)"
                      size="mini"
                      type="danger">
                  取消
              </el-button>
              </template>
          </el-table-column>

        </el-table>
<el-row :gutter="20">
    <el-col :span="21">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 8, 15, 20]"
                        :page-size="8"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableData.length">
  </el-pagination>
</el-col>

    <el-col :span="3"><el-button type="primary" plain size="medium" @click="chooseDoc">确认</el-button></el-col>

    </el-row>

      </span>
            </el-dialog>

            <el-dialog
                    :visible.sync="editVisible"
                    width="30%"
                    heigti="200px"
                    :before-close="handleClose">
                  <span>
                    选择医生可查看的科室
                    <br><br>
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox label="口腔科"></el-checkbox>
                      <el-checkbox label="血液科"></el-checkbox>
                    </el-checkbox-group>
                    <br>

                      <el-button size="mini" @click="choosePermission">确认</el-button>

                  </span>
            </el-dialog>

            <!--            -->
            <el-table
                    ref="filterTable"
                    :data="AfterList"
                    style="width: 100%"
                    height="560">
                <el-table-column
                        prop="num"
                        label="编号"
                        sortable
                        width="180"
                        column-key="num">
                </el-table-column>

                <el-table-column
                        prop="name"
                        label="医生姓名"
                        width="180">
                    <!-- :formatter="formatter"> -->
                </el-table-column>
                <el-table-column
                        prop="tag"
                        label="所属科室"
                        width="180"
                        :filters="[{ text: '口腔科', value: '口腔科' }, { text: '血液科', value: '血液科' }]"
                        :filter-method="filterTag">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.tag === '口腔科' ? 'primary' : 'success'"
                                disable-transitions>{{scope.row.tag}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tel"
                        label="手机号">
                    <!-- :formatter="formatter"> -->
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="状态"
                        width="180">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.state ===0 ? 'info' : scope.row.state === 1 ? 'success':'danger'"
                                disable-transitions>{{trans[scope.row.state]}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tag"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="editRelationship(scope.row)">编辑权限
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="delDoc(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
  export default {
    name: 'MyDoctor',
    data () {
      return {
        editDoctorPhone: '',
        checkList: ['口腔科', '血液科'],
        xyList: ['口腔科', '血液科'],
        ykList: ['口腔科', '血液科'],
        chooseTag: '',
        checked: [],
        dialogVisible: false,
        editVisible: false,
        DocList: [],
        AfterList: [],
        filters: [{
          text: '口腔科',
          value: '口腔科'
        }, {
          text: '血液科',
          value: '血液科'
        }],
        filter: '',
        currentPage: 1,
        pagesize: 8,
        trans: {
          0: '待通过',
          1: '已选',
          2: '不通过',
        }
      }
    },
    computed: {
      tableData: function () {
        return this.DocList.filter(item => {
          if (this.filter.length === 1) {
            if (item['tag'] !== this.filter[0]) {
              return false
            }
          }
          return true
        })
      },
      PageData: function () {

        return this.tableData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)

      },
    },
    mounted () {
      //初始化医生列表
      this.$axios({
        url: 'getAllDoc',
        method: 'get',
      }).then(res => {
        this.DocList = res.data
      })

      //初始化选择列表
      this.$axios({
        url: 'getRelationship',
        method: 'post',
        data: {
          PatientPhone: this.$session.get('phone')
        }
      }).then(res => {
        this.AfterList = res.data
        console.log(this.AfterList)
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
      checkChoose () {
        var yk = 0
        var xy = 0
        var list = this.AfterList.concat(this.checked)
        for (let i = 0; i < list.length; i++) {
          if (list[i]['tag'] === '血液科') {
            xy++
          } else if (list[i]['tag'] === '口腔科') {
            yk++
          }
        }
        console.log('xy:', xy, 'yk:', yk)
        return {
          'xy': xy,
          'yk': yk
        }
        if (xy === 1 && yk === 1) {
          return false
        }
        return xy <= 1 && yk <= 1

      },
      choose (row) {
        if (!this.checked.includes(row)) {
          var check = this.checkChoose()
          var xy = check.xy
          var yk = check.yk
          if (row['tag'] === '血液科') {
            xy++
          } else if (row['tag'] === '口腔科') {
            yk++
          }
          if (xy < 2 && yk < 2) {
            row['choose'] = '已选'
            this.checked.push(row)
            this.$message({
              showClose: true,
              message: '选择成功！',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '每个部门只能选择一个医生!',
              type: 'warning'
            })
          }

        }

      },
      cancel (row) {
        row['choose'] = '未选'
        if (this.checked.includes(row)) {
          this.checked.splice(this.checked.indexOf(row))
          this.$message({
            showClose: true,
            message: '取消成功！',
            type: 'success'
          })
        }

      },
      chooseDoc () {
        console.log(this.checked)
        var yk = 0
        var xy = 0
        var list = this.AfterList
        console.log(list)
        for (let i = 0; i < list.length; i++) {
          if (list[i]['choose'] === '已选') {
            if (list[i]['tag'] === '血液科') {
              xy++
            } else if (list[i]['tag'] === '口腔科') {
              yk++
            }
          }
        }
        if (xy === 1 && yk === 1) {
          this.$message({
            showClose: true,
            message: '医师已经存在!',
            type: 'error'
          })
          return false
        } else {
          this.$axios({
            url: 'addDoctorAndPermission',
            method: 'post',
            data: {
              PatientPhone: this.$session.get('phone'),
              Doctor: this.checked
            }
          }).then(res => {
            this.$message({
              showClose: true,
              message: '选择成功！',
              type: 'success'
            })
            this.$axios({
              url: 'getRelationship',
              method: 'post',
              data: {
                PatientPhone: this.$session.get('phone')
              }
            }).then(res => {
              this.AfterList = res.data
              this.checked = []
              this.dialogVisible = false
              this.$axios({
                url: 'getAllDoc',
                method: 'get',
              }).then(res => {
                this.DocList = res.data
              })
            })
          }).catch(reason => {
            this.$message({
              showClose: true,
              message: '医师已经存在！',
              // message:reason,
              type: 'error'
            })
          })
        }
      },
      editRelationship (row) {
        this.editVisible = true
        this.editDoctorPhone = row['tel']
        this.$axios({
          url: 'getPatientRelationship',
          method: 'post',
          data: {
            DoctorPhone: this.editDoctorPhone,
            PatientPhone: this.$session.get('phone'),
          }
        }).then(res => {
          var list = []
          if (res.data[0]['blood']) {
            list.push('血液科')
          }
          if (res.data[0]['tooth']) {
            list.push('口腔科')
          }
          if (row['tag'] === '口腔科') {
            this.ykList = list
            this.checkList = this.ykList
            this.chooseTag = '口腔科'
          } else if (row['tag'] === '血液科') {
            this.xyList = list
            this.checkList = this.xyList
            this.chooseTag = '血液科'
          }
          // console.log("checklist:",this.checkList)
        })

      },
      choosePermission () {
        // console.log("checklist2:",this.checkList)
        this.$axios({
          url: 'updateRelationship',
          method: 'post',
          data: {
            DoctorPhone: this.editDoctorPhone,
            PatientPhone: this.$session.get('phone'),
            checkList: this.checkList
          }
        }).then(res => {
          this.$message({
            showClose: true,
            message: '选择成功！',
            type: 'success'
          })
          this.$axios({
            url: 'getPatientRelationship',
            method: 'post',
            data: {
              DoctorPhone: this.editDoctorPhone,
              PatientPhone: this.$session.get('phone'),
            }
          }).then(res => {
            var list = []
            if (res.data[0]['blood']) {
              list.push('血液科')
            }
            // console.log("list1:",list)
            if (res.data[0]['tooth']) {
              list.push('口腔科')
            }
            // console.log("list2:",list)
            if (this.chooseTag === '口腔科') {
              this.ykList = this.list
            } else if (this.chooseTag === '血液科') {
              this.xyList = this.list
            }
            this.editVisible = false
          })

        })
      },
      delDoc: function (row) {
        this.$confirm('此操作需经过管理员同意, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (row['state'] === 0) {
            this.$message({
              showClose: true,
              message: '已向管理员提交！',
              type: 'warning'
            })
            return
          }
          this.$axios({
            url: 'sendDeleteDoctor',
            method: 'post',
            data: {
              doctorPhone: row['tel'],
              patientPhone: this.$session.get('phone'),
            }
          }).then(res => {
            row['state'] = 0
          })
          // this.$axios({
          //   url: 'deleteRelationship',
          //   method: 'post',
          //   data: {
          //     DoctorPhone: row['tel'],
          //     PatientPhone: this.$session.get('phone'),
          //   }
          // }).then(res => {
          //   this.$axios({
          //     url: 'getRelationship',
          //     method: 'post',
          //     data: {
          //       PatientPhone: this.$session.get('phone')
          //     }
          //   }).then(res => {
          //     this.AfterList = res.data
          //   })
          // })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleEdit: function () {

      },
    }
  }
</script>

<style scoped>

</style>
