<template>
    <div id="List">
<!--      用户查看所有获得授权认证的版权列表-->
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
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="userid"
          label="所属用户id"
          width="180">
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
  const typesoptions1 = [{
    label: '红细胞',
    value: '红细胞'
  }, {
    label: '白细胞',
    value: '白细胞'
  }, {
    label: '血小板',
    value: '血小板'
  }]
  const typesoptions2 = [{
    label: '叩痛',
    value: '叩痛'
  }, {
    label: '松动度',
    value: '松动度'
  }, {
    label: '牙石',
    value: '牙石'
  }]
  const translation = {
    '红细胞': 'rbc',
    '白细胞': 'wbc',
    '血小板': 'plt',
    '叩痛': 'pain',
    '松动度': 'mobility',
    '牙石': 'tartar',
  }

  export default {
    name: 'MyCase',
    data () {

      return {

        //医师建议
        proposal_tartar: '',
        proposal_mobility: '',
        proposal_pain: '',

        proposal_rbc: '',
        proposal_wbc: '',
        proposal_plt: '',
        proposal: [{
          '牙石': '叩痛：建议去医院做超声洁牙，必要时做牙周刮治，彻底去除牙结石，避免菌斑附着，才能彻底治愈。平时注意口腔卫生，早晚刷牙，饭后及时漱口，避免辛辣刺激的食物。',
          '松动度': '松动：牙齿松动的原因可能是牙周炎，可以服用一些消炎药帮助消除炎症，炎症一旦消除牙齿松动的现象也就会有所缓解。',
          '叩痛': '牙石：叩击酸痛可能是局部牙本质过敏，也可能是根尖存在炎症。建议先确诊一下病因。'

        }],
        //病人信息
        patientName: '',
        sex: '',
        examinationDate: '',
        examinationNo: '',
        //血液科数据
        plt: '',  //血小板
        rbc: '', //红细胞
        wbc: '',  //白细胞
        //口腔科数据
        pain: '', //叩痛
        mobility: '',  //松动度
        tartar: '',    //牙石

        offices: [{
          value: '口腔科',
          label: '口腔科',
        }, {
          value: '血液科',
          label: '血液科'
        }],
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
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          },
            {
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
        AllCase: [],//筛选后的病例
        currentPage: 1,//默认开始页面
        pagesize: 9,
        filters: [{
          text: '血液科',
          value: 'blood'
        }, {
          text: '口腔科',
          value: 'tooth'
        }],
        filter: '',
        date1: '',
        date2: '',
        min: '',
        max: '999',
        tablename: '',
        value0: '',//科室
        value1: [],//项目
        value2: '',//项目
        screen: [],  //筛选
        screenJson: [],
        types: [],  //选择对应科室的相关项目，对应复选框内的选项
        dialogVisible: false,
        BloodVisible: false,
        ToothVisible: false,
        dialogFormVisible: false,   //图表
        ChartVisible: false,
        chartData: {       //数据
          columns: ['date'],
          rows: []
        },
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
        isShowHistogram: false,
        isShowLine: false,
        form: {
          type: ''
        },
      }
    },
    computed: {
      CaseData: function () {
        return this.AllCase.filter(item => {
          if (this.filter.length === 1) {
            if (item['tag'] !== this.filter[0]) {
              return false
            }
          }
          return true
        })
      },
      PageData: function () {
        if (this.AllCase.length === 0) {
          return []
        }
        return this.CaseData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
      }
    },
    mounted () {
      this.$axios({
        url: 'getPatientDetail',
        method: 'post',
        data: {
          phone: this.$session.get('phone')
        }
      }).then(res => {
        this.patientName = res.data['patientName']
        if (res.data['sex'] === 'm') {
          this.sex = '男性'
        } else if (res.data['sex'] === 'f') {
          this.sex = '女性'
        }

      })
    },
    methods: {
      beforeDialog () {  //点开查询
        // console.log("typeof value",typeof this.value)
        this.value0 = ''
        this.value1 = []
        this.value2 = []
        this.screen = []
        this.dialogVisible = true
      },
      selectChanged () {   //通过选择科室有不同的列表
        if (this.value0 === '口腔科') {
          this.types = typesoptions2
          this.value1 = []
          this.value2 = []
        } else if (this.value0 === '血液科') {
          this.types = typesoptions1
          this.value1 = []
          this.value2 = []
        }

      },
      selectProject () {
        var json = []
        for (let i = 0; i < this.value1.length; i++) {
          var row = {}
          row.label = this.value1[i]
          row.value = this.value1[i]
          json.push(row)
        }
        this.screen = json
      },
      screenSubmit () {
        if (this.value2.length === 0) {
          this.$message({
            showClose: true,
            message: '筛选条件不能为空！',
            type: 'warning'
          })
          return
        }
        var row = {}

        for (let i = 0; i < this.screenJson.length; i++) {
          // console.log("-----------------")
          // console.log("trans:",translation[this.value2])
          if (this.screenJson[i]['values'] === translation[this.value2]) {
            row['down'] = this.min
            row['up'] = this.max
            this.$message({
              showClose: true,
              message: '更新成功！',
              type: 'success'
            })
            return
          }
        }

        row['values'] = translation[this.value2]
        row['down'] = this.min
        row['up'] = this.max
        this.screenJson.push(row)
        this.$message({
          showClose: true,
          message: '筛选成功！',
          type: 'success'
        })
        // console.log("this.screenJson[i]",this.screenJson[0]["values"])
        // console.log("screenJson:",this.screenJson)
      },
      submit () {
        if (this.screenJson.length === 0) {
          this.$message({
            showClose: true,
            message: '筛选不能为空！',
            type: 'warning'
          })
          return
        }
        if (this.date1 === '' || this.date2 === '') {
          this.$message({
            showClose: true,
            message: '日期不能为空！',
            type: 'warning'
          })
          return
        }
        if (this.moment(this.date1).format('YYYY-MM-DD HH:mm:ss') > this.moment(this.date2).format('YYYY-MM-DD HH:mm:ss')) {
          this.$message({
            showClose: true,
            message: '日期不正确！',
            type: 'warning'
          })
          this.date1 = ''
          this.date2 = ''
          return
        }
        const name = this.value0
        if (name === '口腔科') {
          this.tablename = 'tooth'
        } else if (name === '血液科') {
          this.tablename = 'blood'
        }
        this.$axios({
          url: 'selectPatientCase',
          method: 'post',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          data: {
            phone: this.$session.get('phone'),
            'startDate': this.date1,
            'endDate': this.date2,
            tableName: this.tablename,
            value: this.screenJson,
          }
        }).then(res => {
          this.$message({
            showClose: true,
            message: '提交成功！',
            type: 'success'
          })
          if (this.tablename === 'tooth') {
            this.chartData['columns'].push('pain')
            this.chartData['columns'].push('tartar')
            this.chartData['columns'].push('mobility')
          } else {
            this.chartData['columns'].push('wbc')
            this.chartData['columns'].push('rbc')
            this.chartData['columns'].push('plt')
          }
          this.AllCase = res.data
          this.screenJson = []
          this.dialogVisible = false
        })
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
            this.proposal_pain = ''
            this.proposal_mobility = ''
            this.proposal_tartar = ''
            this.proposal_plt = ''
            this.proposal_rbc = ''
            this.proposal_wbc = ''
          })
          .catch(_ => {
          })
      },
      handleChange (value) {
        console.log(value)
      },
      handleSizeChange (val) {
        this.currentPage = 1
        this.pagesize = val
      },
      handleCurrentChange (val) {
        this.currentPage = val
      },
      handleEdit (value, row) {
        if (row['office'] === '血液科') {
          this.BloodVisible = true
          this.examinationDate = row['date']
          this.plt = row['plt']
          this.wbc = row['wbc']
          this.rbc = row['rbc']
          this.examinationNo = row['tableId']
          if (row['plt'] < 100) {
            this.proposal_plt = '血小板过低：注意休息不要熬夜，均衡饮食，适量运动，用点益血生，多吃红豆花生等。'
          }
          if (row['plt'] > 300) {
            this.proposal_plt = '血小板过高：控制脂肪的摄入量，多补充水分，合理饮食，加强体育锻炼。'
          }
          if (row['wbc'] < 4) {
            this.proposal_wbc = '白细胞过低：合理饮食，可以服用一些药物提升白细胞治疗，注意休息，适当锻炼。'
          }
          if (row['wbc'] > 10) {
            this.proposal_wbc = '白细胞过高：注意多喝水，避免辛辣刺激食物，医院就诊，查找白细胞升高的原因，如为感染引起，区分是病毒感染或细菌感染，然后针对性治疗。'
          }
          if (row['rbc'] < 3.5) {
            this.proposal_rbc = '红细胞过低：建议多吃瘦肉和猪肝、蛋黄、牛奶、鱼虾、贝类、大豆、豆腐和血补充铁和蛋白质，多吃蔬菜和水果补充维生素c促进铁的吸收，平常注意防止偏食。'
          }
          if (row['rbc'] > 5.5) {
            this.proposal_rbc = '红细胞过高：在饮食上应注意低盐低脂，多食用高维生素食物;戒烟戒酒，忌食生冷辣性食物。'
          }
        } else {

          this.ToothVisible = true
          this.examinationDate = row['date']
          this.pain = row['pain']
          this.tartar = row['tartar']
          this.mobility = row['mobility']
          this.examinationNo = row['tableId']
          if (row['pain'] > 0) {
            this.proposal_pain = '叩痛:叩击酸痛可能是局部牙本质过敏，也可能是根尖存在炎症。建议先确诊一下病因。'

          }
          if (row['tartar'] > 0) {
            this.proposal_tartar = '牙石:建议去医院做超声洁牙，必要时做牙周刮治，彻底去除牙结石，避免菌斑附着，才能彻底治愈。平时注意口腔卫生，早晚刷牙，饭后及时漱口，避免辛辣刺激的食物。'
          }
          if (row['mobility'] > 0) {
            this.proposal_mobility = '松动度:牙齿松动的原因可能是牙周炎，可以服用一些消炎药帮助消除炎症，炎症一旦消除牙齿松动的现象也就会有所缓解。'
          }
        }
      },
      GeneratingCharts () {
        if (this.AllCase.length === 0) {
          this.$message({
            showClose: true,
            message: '暂无数据！',
            type: 'warning'
          })
          return
        }
        this.dialogFormVisible = true
      },
      showChart () {
        if (this.form['type'].length === 0) {
          this.$message({
            showClose: true,
            message: '请选择图表类型！',
            type: 'warning'
          })
          return
        }
        this.chartData['rows'] = this.AllCase
        if (this.form['type'] === '柱状图') {
          this.isShowHistogram = true
        } else {
          this.isShowLine = true
        }
      },
      handleCloseChart (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
            if (this.isShowHistogram === true) {
              this.isShowHistogram = false
            } else if (this.isShowLine === true) {
              this.isShowLine = false
            }
          })
          .catch(_ => {
          })
      },
    }
  }
</script>

<style scoped>

</style>
