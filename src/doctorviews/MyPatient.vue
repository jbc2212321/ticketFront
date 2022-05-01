<template>
    <div id="MyPatient">
        <template>


            <!-- 本体 -->
            <el-table
                    ref="filterTable"
                    :data="tableData"
                    style="width: 100%"
                    height="600"> <!-- tableData：一级界面数据 -->

                <el-table-column
                        prop="num"
                        label="编号"
                        sortable
                        width="280"
                        column-key="num">
                </el-table-column>

                <el-table-column
                        prop="time"
                        label="上传时间"
                >
                </el-table-column>

                <el-table-column
                        prop="type"
                        label="小票类型"
                        width="200">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.type === '增值税发票' ? 'primary' : 'success'"
                                disable-transitions>{{scope.row.type}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="action"
                        label="操作"
                        width="300">
                    <template slot-scope="scope">
                        <!--                        展示 和 删除 按钮 位置-->
                        <el-button
                                size="small"
                                plain
                                type="primary"
                                @click="showTicket(scope.row)">展示
                        </el-button>
                        <el-button
                                size="small"
                                plain
                                type="danger"
                                @click="open(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog :visible.sync="dialogVisible" width="1250px" top="100px">
                <el-col :span="12" ><div class="big">原图</div></el-col>
                <el-col :span="12"><div class="big">OCR识别结果</div></el-col>
                <br>
                <el-image
                        style="width: 600px; height: 400px"
                        :src="BinaryData"
                        :preview-src-list="srcList">
                </el-image>
                <el-image
                        style="width: 600px; height: 400px"
                        :src="OcrBinaryData"
                        :preview-src-list="srcList">
                </el-image>

            </el-dialog>
            <!-- 本体分页 -->
        </template>
        <!--        <el-pagination-->
        <!--                background-->
        <!--                @size-change="handleSizeChange"-->
        <!--                @current-change="handleCurrentChange"-->
        <!--                :current-page="currentPage"-->
        <!--                :page-sizes="[5, 9, 15, 20]"-->
        <!--                :page-size="9"-->
        <!--                layout="total, sizes, prev, pager, next, jumper"-->
        <!--                :total="tableData.length">-->
        <!--        </el-pagination>-->

    </div>
</template>

<script>
  export default {
    name: 'MyPatient',

    data () {
      return {
        time: '123',
        type: '普通增值税发票',
        BinaryData: '',
        OcrBinaryData:"",
        date01: '',
        date02: '',
        dialogVisible: false,
        ChartVisible: false,
        chartSettings: {
          labelMap: {
            'date': '体检日期',
            'pain': '叩痛',
            'mobility': '松动度',
            'tartar': '牙石',
            'rbc': '红细胞',
            'wbc': '白细胞',
            'plt': '血小板',
          },
        },
        //图表

        pain: '', //叩痛
        mobility: '',  //松动度
        tartar: '',    //牙石
        ToothVisible: false,
        patientList: [],
        patientRecord: [],  //病人体检单号列表
        currentPage1: 5,
        currentPage3: 5,
        currentPage4: 4,
        currentPage: 1,    //第一级
        pagesize: 9,
        currentPage2: 1,  //第二级
        pagesize2: 9,
        filters: [{
          text: '血液科',
          value: '血液科'
        }, {
          text: '口腔科',
          value: '口腔科'
        }],
        filter: '',
        editVisible: false

      }
    },
    computed: {
      tableData: function () {
        return this.patientList.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
      },
      record: function () {
        return this.patientRecord.filter(item => {
          if (this.filter.length === 1) {
            if (item['tag'] !== this.filter[0]) {
              return false
            }
          }
          return true
        })
      },
      recordData: function () {
        return this.record.slice((this.currentPage2 - 1) * this.pagesize2, this.currentPage2 * this.pagesize2)
      }
    },
    mounted () {
      this.$axios({
        url: 'user/listTicket',
        method: 'post',
        data: {
          userId: this.$session.get('userId')
        },
      }).then(res => {
        // console.log("这v爱上",res.data)
        // this.patientList = res.data.data
        console.log("data2:", res.data.data)
        for (const i in res.data.data) {
          console.log(i,  res.data.data[i])
          var list = {
            num: res.data.data[i].ticket_id,
            time: res.data.data[i].create_time,
            type: res.data.data[i].type,
          }
          this.patientList.push(list)
        }
      })
      // console.log("patientList:",this.patientList)
      // console.log("data2:", res)
    },
    methods: {
      LookPatient (row) {  //查看所有体检单
        this.$axios({
          url: 'getDocsPatientsRecord',
          method: 'post',
          data: {
            doctorPhone: this.$session.get('phone'),
            patientPhone: row['tel'],
          }
        }).then(res => {
          this.patientRecord = res.data
          this.editVisible = true
          // console.log(res.data)
          this.sex = row['sex']
          this.patientName = row['name']
        })
      },
      LookRecord (row) {  //查看体检单号对应的病人信息
        this.$axios({
          url: 'getDocsPatientsRecordDetail',
          method: 'post',
          data: {
            tableID: row['num'],
            office: row['tag']
          }
        }).then(res => {
          if (row['tag'] === '血液科') {
            this.BloodVisible = true
            this.examinationDate = row['date']
            this.examinationNo = row['num']
            this.plt = res.data['plt']
            this.wbc = res.data['wbc']
            this.rbc = res.data['rbc']
          } else if (row['tag'] === '口腔科') {
            this.ToothVisible = true
            this.examinationDate = row['date']
            this.examinationNo = row['num']
            this.pain = res.data['pain']
            this.tartar = res.data['tartar']
            this.mobility = res.data['mobility']
          }
        })
      },
      handleFilterChange (value) {
        this.filter = value.status
      },
      filterTag (value, row) {
        return row.tag === value
      },
      handleSizeChange (val) {
        this.currentPage2 = 1
        this.pagesize2 = val
      },
      handleCurrentChange (val) {
        this.currentPage2 = val
      },
      open (row) {

        this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //没用
            // for (const i in this.patientList) {
            //   if (this.patientList[i].num===row["num"]){
            //     console.log(i,this.patientList[i])
            //     delete this.patientList[i]
            //     console.log("list:",this.patientList)
            //   }
            // }

          this.$axios({
            url: '/user/delTicket',
            method: 'post',
            data: {
              ticketId:row['num'],
              userId: this.$session.get('userId')
            }
          }).then(res => {
            this.$axios({
              url: 'user/listTicket',
              method: 'post',
              data: {
                userId: this.$session.get('userId')
              },
            }).then(res => {
              this.patientList=[]
              for (const i in res.data.data) {
                console.log(i,  res.data.data[i])
                var list = {
                  num: res.data.data[i].ticket_id,
                  time: res.data.data[i].create_time,
                  type: res.data.data[i].type,
                }
                this.patientList.push(list)
              }
            })
          })

          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      //获取图表行信息
      initChart (row) {
        // console.log("行信息",row)
        this.dialogFormVisible = true
        this.patientNum = row['num']
      },
      showTicket (row) {
        console.log('num:', row['num'])
        this.$axios({
          url: 'user/showTicket',
          method: 'post',
          data: {
            // doctorPhone: this.$session.get('phone'),
            userId: this.$session.get('userId'),
            ticketId: row['num'],
          }
        }).then(res => {
          this.dialogVisible = true
          console.log('结果:', res)
          // console.log("url:",res.data.data[0].ocr_binary_data)
          this.BinaryData = res.data.data.BinaryData
          this.OcrBinaryData = res.data.data.OcrBinaryData
          console.log("url:",this.url)
          // this.patientRecord = res.data
          // this.editVisible = true
          // // console.log(res.data)
          // this.sex = row['sex']
          // this.patientName = row['name']
        })
      },
      //图表方法
      showChart () {
        let date = new Date()

        // console.log("起始日期:",this.moment(this.date01).format("YYYY-MM-DD HH:mm:ss"))
        // console.log("终止日期:",this.date02)
        if (this.chooseOffice === '') {
          this.$message({
            showClose: true,
            message: '请选择科室！',
            type: 'warning'
          })
          return
        }
        if (this.form['type'].length === 0) {
          this.$message({
            showClose: true,
            message: '请选择图表类型！',
            type: 'warning'
          })
          return
        }
        if (this.date01 === '' || this.date02 === '') {
          this.$message({
            showClose: true,
            message: '请选择日期！',
            type: 'warning'
          })
          return
        }
        if (this.moment(this.date01).format('YYYY-MM-DD HH:mm:ss') > this.moment(this.date02).format('YYYY-MM-DD HH:mm:ss')) {
          this.$message({
            showClose: true,
            message: '日期不正确！',
            type: 'warning'
          })
          this.date01 = ''
          this.date02 = ''
          return
        }
        this.$axios({
          url: 'getDocsPatientsChart',
          method: 'post',
          data: {
            doctorPhone: this.$session.get('phone'),
            patientNum: this.patientNum,
            type: this.chooseOffice,
            date01: this.date01,
            date02: this.date02
          }
        }).then(res => {
          this.chartData['columns'] = ['date']
          if (this.chooseOffice === '血液科') {
            this.chartData['columns'].push('wbc')
            this.chartData['columns'].push('rbc')
            this.chartData['columns'].push('plt')
          } else {
            this.chartData['columns'].push('pain')
            this.chartData['columns'].push('tartar')
            this.chartData['columns'].push('mobility')
          }

          this.chartData['rows'] = res.data
          if (this.form['type'] === '柱状图') {
            this.isShowHistogram = true
          } else {
            this.isShowLine = true
          }
          // console.log("折线图:",this.isShowLine)
          // console.log("柱状图:",this.isShowHistogram)
          // console.log(this.chartData)
        })

      },

      //关闭图表
      handleCloseChart (done) {
        // console.log("关闭时：",this.chartData)
        this.$confirm('确认关闭？')
          .then(_ => {
            // this.dialogFormVisible=false
            done()
            if (this.isShowHistogram === true) {
              this.isShowHistogram = false
            } else if (this.isShowLine === true) {
              this.isShowLine = false
            }
            this.chartData['columns'] = ['date']
            this.form['type'] = ''
            this.chooseOffice = ''
            this.date01 = ''
            this.date02 = ''
          })
          .catch(_ => {
          })
      },
    }
  }

</script>

<style scoped>
    .title {
        font-size: small;
        padding: 0 19cm 0.5cm 0;
    }
.big{
    font-size:large;
    text-align:center;
}
</style>