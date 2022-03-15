<template>
    <div id="MyPatient">
        <template>

            <!-- 弹窗 -->
            <el-dialog
                    :visible.sync="editVisible"
                    width="70%"
                    heigti="500px"
                    :before-close="handleClose">
      <span>
        <el-table
                @filter-change="handleFilterChange"
                ref="filterTable"
                :data="recordData"
                style="width: 100%"
                height="600"> <!--二级界面数据(点击查看之后显示) -->

        <el-table-column
                prop="num"
                label="体检单号"
                sortable
                width="180"
                column-key="num">
        </el-table-column>

        <el-table-column
                column-key="status"
                prop="tag"
                label="体检科室"
                width="180"
                :filters="filters"
                :filter-method="filterTag">
        <template slot-scope="scope">
          <el-tag
                  :type="scope.row.tag === '口腔科' ? 'primary' : 'success'"
                  disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
        </el-table-column>

        <el-table-column
                prop="date"
                label="体检日期"
                sortable
                width="180"
                column-key="date">
        </el-table-column>

        <el-table-column
                prop="name"
                label="病人姓名"
                width="150">
        </el-table-column>

        <el-table-column
                prop="tel"
                label="手机号">
        </el-table-column>

        <el-table-column
                prop="action"
                label="操作"
                width="120">
          <template slot-scope="scope">
              <el-button
                      size="small" @click="LookRecord(scope.row)"
              >查看体检单</el-button>
          </template>
        </el-table-column>
      </el-table>
        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage2"
                :page-sizes="[5, 9, 15, 20]"
                :page-size="9"
                layout="total, sizes, prev, pager, next, jumper"
                :total="record.length">
        </el-pagination>
      </span>
            </el-dialog>

            <!-- 本体 -->
            <el-table
                    ref="filterTable"
                    :data="tableData"
                    style="width: 100%"
                    height="600"> <!-- tableData：一级界面数据 -->

<!--                <el-table-column-->
<!--                        prop="num"-->
<!--                        label="编号"-->
<!--                        sortable-->
<!--                        width="180"-->
<!--                        column-key="num">-->
<!--                </el-table-column>-->

<!--                <el-table-column-->
<!--                        prop="name"-->
<!--                        label="病人姓名"-->
<!--                        width="300">-->
<!--                </el-table-column>-->

<!--                <el-table-column-->
<!--                        prop="sex"-->
<!--                        label="性别"-->
<!--                        width="180">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-tag-->
<!--                                :type="scope.row.sex === '男性' ? 'primary' : 'success'"-->
<!--                                disable-transitions>{{scope.row.sex}}-->
<!--                        </el-tag>-->
<!--                    </template>-->
<!--                </el-table-column>-->

<!--                <el-table-column-->
<!--                        prop="tel"-->
<!--                        label="手机号">-->
<!--                </el-table-column>-->

<!--                <el-table-column-->
<!--                        prop="action"-->
<!--                        label="操作"-->
<!--                        width="300">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button-->
<!--                                size="small"-->
<!--                                plain-->
<!--                                type="primary"-->
<!--                                @click="LookPatient(scope.row)">查看体检单-->
<!--                        </el-button>-->
<!--                        <el-button-->
<!--                                size="small"-->
<!--                                plain-->
<!--                                type="success"-->
<!--                                @click="initChart(scope.row)">生成图表-->
<!--                        </el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
            </el-table>
            <!-- 本体分页 -->
        </template>
        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 9, 15, 20]"
                :page-size="9"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length">
        </el-pagination>


        <!--        血液科体检报告单-->
        <el-dialog
                :visible.sync="BloodVisible"
                width="60%"
                :before-close="handleClose">
      <span>
        <div class='title'>体检单号：{{examinationNo}}</div>
        <table border="1"
               cellspacing="0px"
               style="margin:auto;"
               width="800px">
    <tr height="50" style="text-align: center;">
        <td width="100">姓名</td>
        <td width="100">{{patientName}}</td>
        <td width="100">性别</td>
        <td width="100">{{sex}}</td>
        <td width="100">体检日期</td>
        <td width="100">{{examinationDate}}</td>
    </tr>
    <tr height="50" style="text-align: center;">
      <td width="100">代号</td>
      <td width="200" colspan="2">项目</td>
      <td width="200" colspan="2">结果</td>
      <td width="100">参考值</td>
    </tr>
            <!-- 白细胞 -->
    <tr height="50" style="text-align: center;">
      <td width="100">WBC</td>
      <td width="200" colspan="2">白细胞</td>
      <td width="200" colspan="2">{{wbc}}</td>   <!-- 检测值 -->
      <td width="100">4--10 10^9/L</td>
    </tr>
            <!-- 红细胞 -->
    <tr height="50" style="text-align: center;">
      <td width="100">RBC</td>
      <td width="200" colspan="2">红细胞</td>
      <td width="200" colspan="2">{{wbc}}</td>   <!-- 检测值 -->
      <td width="100">3.5--5.5</td>
    </tr>
            <!-- 血小板 -->
    <tr height="50" style="text-align: center;">
      <td width="100">PLT</td>
      <td width="200" colspan="2">血小板</td>
      <td width="200" colspan="2">{{plt}}</td>   <!-- 检测值 -->
      <td width="100">100-300 10^9/L</td>
    </tr>

</table></span>
        </el-dialog>
        <!--        血液科体检报告单-->

        <!--口腔科体检报告单-->
        <el-dialog
                :visible.sync="ToothVisible"
                width="60%"
                :before-close="handleClose">
      <span>
        <div class='title'>体检单号：{{examinationNo}}</div>
        <table border="1"
               cellspacing="0px"
               style="margin:auto;"
               width="800px">
    <tr height="50" style="text-align: center;">
        <td width="100">姓名</td>
        <td width="100">{{patientName}}</td>
        <td width="100">性别</td>
        <td width="100">{{sex}}</td>
        <td width="100">体检日期</td>
        <td width="100">{{examinationDate}}</td>
    </tr>
    <tr height="50" style="text-align: center;">
      <td width="50" td rowspan="4">口腔</td>
      <td width="150" colspan="2">项目</td>
      <td width="200" colspan="3">结果</td>
    </tr>
            <!-- 叩痛 pain -->
    <tr height="50" style="text-align: center;">
      <td width="150" colspan="2">叩痛</td> <!-- pain -->
      <td width="200" colspan="3">{{pain}}</td> <!-- 检测值 由轻到重五个等级1-5 -->
    </tr>
            <!-- 松动度 mobility -->
    <tr height="50" style="text-align: center;">
      <td width="150" colspan="2">松动度</td>  <!-- mobility -->
      <td width="200" colspan="3">{{mobility}}</td>  <!-- 检测值 不松动-严重由1-3表示 -->
    </tr>
            <!-- 牙石 tartar -->
    <tr height="50" style="text-align: center;">
      <td width="150" colspan="2">项目</td> <!-- tartar -->
      <td width="200" colspan="3">{{tartar}}</td> <!-- 检测值 有无牙石 牙石数量从少到多由1-5表示 -->
    </tr>

</table></span>
        </el-dialog>
        <!--口腔科体检报告单-->

        <el-dialog title="绘制图表" :visible.sync="dialogFormVisible"
                   width="23%"
                   height="400px">
            <el-form :model="form">
                <el-form-item label="选择科室">
                    <el-select v-model="chooseOffice" placeholder="选择科室">
                        <el-option
                                v-for="item in offices"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图表类型">
                    <el-select v-model="form.type" placeholder="图表类型">
                        <el-option label="折线图" value="折线图"></el-option>
                        <el-option label="柱状图" value="柱状图"></el-option>
                    </el-select>
                </el-form-item>
                <template>
                    <el-form-item label="起始日期">
                        <el-date-picker
                                v-model="date01"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="截止日期">
                        <el-date-picker
                                v-model="date02"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>

                </template>
            </el-form>
            <el-button type="primary" @click="showChart">提交</el-button>
            <br>
        </el-dialog>

        <el-dialog title="图表" :visible.sync="isShowLine"
                   width="80%"
                   height="600px"
                   :before-close="handleCloseChart">
            <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </el-dialog>

        <el-dialog title="图表" :visible.sync="isShowHistogram"
                   width="80%"
                   height="600px"
                   :before-close="handleCloseChart">
            <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'MyPatient',
    data () {
      return {
        sex: '',
        patientName: '',
        examinationDate: '',
        examinationNo: '',
        //血液科数据
        BloodVisible: false,
        plt: '',  //血小板
        rbc: '', //红细胞
        wbc: '',  //白细胞
        //口腔科数据

        offices: [{
          value: '口腔科',
          label: '口腔科',
        }, {
          value: '血液科',
          label: '血液科'
        }],
        value: '',//科室
        //图表
        patientNum: -1,
        form: {
          type: '' //图表类型
        },
        //选择类型
        chooseOffice: '',
        isShowHistogram: false,
        isShowLine: false,
        chartData: {       //数据
          columns: ['date'],
          rows: []
        },
        date1: '',//起始时间
        date2: '',//截止时间
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '一个月前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 1000 * 3600 * 24 * 30)
              picker.$emit('pick', date)
            }
          }, {
            text: '半年前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 15768000 * 1000)
              picker.$emit('pick', date)
            }
          }, {
            text: '一年前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 31536000 * 1000)
              picker.$emit('pick', date)
            }
          }]
        },
        date01: '',
        date02: '',
        dialogFormVisible: false,
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
        url: 'getDocsPatient',
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        data: {
          DoctorPhone: this.$session.get('phone')
        },
        // headers: {'content-type': 'application/x-www-form-urlencoded'}
      }).then(res => {
        // console.log(res.data)
        this.patientList = res.data

      })
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
      open () {
        this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
        if (this.moment(this.date01).format("YYYY-MM-DD HH:mm:ss") >this.moment(this.date02).format("YYYY-MM-DD HH:mm:ss") ) {
          this.$message({
            showClose: true,
            message: '日期不正确！',
            type: 'warning'
          })
          this.date01=""
          this.date02=""
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

</style>