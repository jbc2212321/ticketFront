<template>
    <div id="MyCase">
        <template>
            <!-- 点击查询病历弹出的对话框 -->
            <el-dialog
                    :visible.sync="dialogVisible"
                    width="39%"
                    height="600px"
                    :before-close="handleClose">
      <span>
        <template>
          <span class="demonstration">科室：</span>
          <el-select v-model="value0" placeholder="选择科室" @change="selectChanged">
            <el-option
                    v-for="item in offices"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template>
          <span class="demonstration">&#8194; 体检项目：</span>
          <el-select v-model="value1" multiple placeholder="选择项目" @change="selectProject">
            <el-option
                    v-for="item in types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
          <br><br>
          <span class="demonstration">选择需要添加筛选条件的项目：</span>
          <el-select v-model="value2" placeholder="请选择">
            <el-option
                    v-for="item in screen"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
          <br><br>
          <span class="demonstration">筛选区间</span>
          <el-input-number size="mini" v-model="min" @change="handleChange" :min="0" :max="999"
                           label="最小值"></el-input-number>
          <span class="demonstration">至</span>
          <el-input-number size="mini" v-model="max" @change="handleChange" :min="0" :max="999" label="最大值"
                           value="999"></el-input-number>
            <span class="demonstration"></span>
          <el-button type="primary" @click="screenSubmit" size="mini">提交筛选</el-button>
        </template>
        <br><br>
        <template>
          <div class="block">
            <span class="demonstration">时间区间</span>
            <el-date-picker
                    size="mini"
                    v-model="date1"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
            </el-date-picker>

            <span class="demonstration">至</span>
            <el-date-picker
                    size="mini"
                    v-model="date2"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </template>
        <br>
        <el-col :span="4" :offset="18"><el-button @click="submit" type="primary">提交</el-button></el-col>
        <br><br>

      </span>
            </el-dialog>

            <el-dialog title="根据体检单绘制图表" :visible.sync="dialogFormVisible"
                       width="27%"
                       height="400px">
                <el-form :model="form">
                    <el-form-item label="绘制图表类型">
                        <el-select v-model="form.type" placeholder="请选图表类型">
                            <el-option label="折线图" value="折线图"></el-option>
                            <el-option label="柱状图" value="柱状图"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="showChart">确 定</el-button>
                </div>
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

            <!-- 主界面 -->
            <el-button @click="beforeDialog">查询体检单</el-button>
            <el-button type="primary" @click="GeneratingCharts">生成图表</el-button>
            <el-table
                    :data="PageData"
                    style="width: 100%"
                    height="580">

                <el-table-column
                        prop="tableId"
                        label="体检单号"
                        sortable
                        width="120"
                        column-key="num">
                </el-table-column>

                <el-table-column
                        prop="office"
                        label="科室"
                        width="180">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.office === '口腔科' ? 'primary' : 'success'"
                                disable-transitions>{{scope.row.office}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="date"
                        label="体检日期">
                    <!-- :formatter="formatter"> -->
                </el-table-column>

                <!-- 操作按键（查看）此部分后续可能需要更改 -->
                <el-table-column
                        prop="tag"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">查看
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
        </template>


        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 9, 15, 20]"
                :page-size="9"
                layout="total, sizes, prev, pager, next, jumper"
                :total="CaseData.length">
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
      <td width="200" colspan="2">{{rbc}}</td>   <!-- 检测值 -->
      <td width="100">3.5--5.5</td>
    </tr>
            <!-- 血小板 -->
    <tr height="50" style="text-align: center;">
      <td width="100">PLT</td>
      <td width="200" colspan="2">血小板</td>
      <td width="200" colspan="2">{{plt}}</td>   <!-- 检测值 -->
      <td width="100">100-300 10^9/L</td>
    </tr>
        <tr height="50" style="text-align: center;">
          <td width="100">
       建议
          </td>
          <td width="500" colspan="5">
              <p>{{proposal_plt}}</p>
                <p>{{proposal_wbc}}</p>
               <p>{{proposal_rbc}}</p>

          </td>
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
      <td width="150" colspan="2">牙石</td> <!-- tartar -->
      <td width="200" colspan="3">{{tartar}}</td> <!-- 检测值 有无牙石 牙石数量从少到多由1-5表示 -->
    </tr>
    <tr height="50" style="text-align: center;">
      <td width="100">
   建议
      </td>
      <td width="500" colspan="5">
          <p>  {{proposal_tartar}}</p>
          <p>{{proposal_mobility}}</p>
            <p> {{proposal_pain}}</p>

      </td>
    </tr>

            <!--            {{proposal[proposal_tartar]}}-->
            <!--            {{proposal[proposal_mobility]}}-->
            <!--            {{proposal[proposal_pain]}}-->

</table></span>
        </el-dialog>
        <!--口腔科体检报告单-->
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