<template>
    <div id="UserManagement">
        <!-- 账户过滤器 -->

        <el-table
                ref="filterTable"
                height="600px"
                :data="PageData"
                @filter-change="handleFilterChange"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="num"
                    label="编号"
                    sortable
                    width="180"
                    column-key="num">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="用户名"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="tel"
                    label="手机号">
            </el-table-column>
            <el-table-column
                    ref="choose"
                    column-key="status"
                    prop="tag"
                    label="账户类型"
                    width="180"
                    :filters="filters"
                    :filter-method="filterTag">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.tag === '病患' ? 'primary' : 'success'"
                            disable-transitions>{{scope.row.tag}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="lookRow(scope.$index, PageData)"
                            size="small">
                        查看
                    </el-button>
                    &nbsp;&nbsp;&nbsp;
                    <el-button
                            @click.native.prevent="deleteRow(scope.$index, PageData)"
                            size="small"
                            type="danger">
                        移除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 9, 15, 20]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length">
        </el-pagination>

        <!--  医生表格-->
        <el-dialog
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose">
      <span><table border="1"
                   cellspacing="0px"
                   style="margin:auto;"
                   width="800px">
    <tr height="50" style="text-align: center;">
        <td rowspan="2">姓名</td>
        <td rowspan="2" width="100">{{doctorName}}</td>
        <td width="100">性别</td>
        <td width="100">{{sex}}</td>
        <td>医生编号</td>
        <td width="100">{{doctorID}}</td>
        <td rowspan="3" width="120">照片</td>
    </tr>
    <tr height="50" style="text-align: center;">
        <td>医生账户</td>
        <td>{{ daccountNo }}</td>
        <td>科室编号</td>
        <td>{{departmentNO}}</td>
    </tr>
    <tr height="50" style="text-align: center;">
        <td width="100">电话号码</td>
        <td colspan="2">{{phoneNO }}</td>
        <td>出生年月</td>
        <td colspan="2">{{ birthday }}</td>
    </tr>
    <tr height="50" style="text-align: center;">
        <td>国籍</td>
        <td colspan="2">{{nationality}}</td>
        <td>籍贯</td>
        <td width="100">{{nativePlace}}</td>
        <td>民族</td>
        <td>{{nation}}</td>
    </tr>
    <tr height="50" style="text-align: center;">
        <td>毕业院校</td>
        <td colspan="2">{{college}}</td>
        <td>现居住地址</td>
        <td colspan="3">{{address}}</td>
    </tr>
    <tr height="50" style="text-align: center;">
        <td rowspan="2">擅长领域</td>
        <td colspan="6" rowspan="2">{{expertise}}</td>
    <tr height="50" style="text-align: center;">
    </tr>
    <tr height="40" style="text-align: center;">
        <td rowspan="2">个人著作</td>
        <td colspan="6" rowspan="2">{{works}}</td>
    <tr height="40" style="text-align: center;">
    </tr>
    <tr height="80" style="text-align: center;">
        <td rowspan="2">个人简介</td>
        <td colspan="6" rowspan="2">{{introduction}}</td>
    <tr height="80" style="text-align: center;">
    </tr>
    <tr height="50" style="text-align: center;">
        <td rowspan="2">个人成就</td>
        <td colspan="6" rowspan="2">{{achievements}}</td>
    <tr height="50" style="text-align: center;">
    </tr>
    <tr height="80" style="text-align: center;">
        <td rowspan="2">社会评价</td>
        <td colspan="6" rowspan="2">{{evaluation}}</td>
    <tr height="80" style="text-align: center;">
    </tr>
</table></span>
        </el-dialog>

        <!--病人表格  -->
        <el-dialog
                :visible.sync="dialogVisibleP"
                width="60%"
                :before-close="handleClose">
      <span><table border="1"
                   cellspacing="0px"
                   style="margin:auto;"
                   width="800px">
    <tr height="50" style="text-align: center;">
        <td rowspan="2">姓名</td>
        <td rowspan="2" width="100">{{patientName}}</td>
        <td rowspan="2" width="100">性别</td>
        <td rowspan="2" width="100">{{sex}}</td>
        <td width="100">病人编号</td>
        <td width="100">{{patientID}}</td>
    </tr>
    <tr height="50" style="text-align: center;">
        <td>账户编号</td>
        <td>{{paccountNo}}</td>
    </tr>
    <tr height="50" style="text-align: center;">
        <td width="100">电话号码</td>
        <td colspan="2">{{phoneNO}}</td>
        <td>出生年月</td>
        <td colspan="2">{{birthday}}</td>
    </tr>
</table></span>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'UserManagement',
    data () {
      return {
        currentPage: 1,//默认开始页面
        count: 0,//筛选
        pagesize: 9,
        AllAccount: [],
        filters: [{
          text: '病患',
          value: '病患'
        }, {
          text: '医师',
          value: '医师'
        }],
        filter: '',
        dialogVisible: false,
        dialogVisibleP: false,
        //  接下来是医生表格的数据
        doctorID: '',
        departmentNO: '',
        daccountNo: '',
        doctorName: '',
        phoneNO: '',
        address: '',
        birthday: '',
        sex: '',
        introduction: '',
        expertise: '',
        achievements: '',
        nationality: '',
        nation: '',
        college: '',
        nativePlace: '',
        works: '',
        evaluation: '',
        //这里是病人的详细信息
        patientID: '',
        paccountNo: '',
        patientName: '',
        //

      }
    },
    computed: {
      tableData: function () {
        return this.AllAccount.filter(item => {
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
      }
    },
    mounted () {
      this.$axios({
        url: 'getAllDocAndPatient',
        method: 'get',
      }).then(res => {
        this.AllAccount = res.data
      })

    },
    methods: {
      filterTag (value, row) {
        return row.tag === value
      },
      lookRow (index, tableData) {
        this.$axios({
          url: 'getInformationDocOrPatient',
          method: 'post',
          data: {
            phone: tableData[index]['tel'],
            tag: tableData[index]['tag'],
          }
        }).then(res => {
          if (tableData[index]['tag'] === '医师') {
            this.doctorName = res.data['doctorName']
            this.evaluation = res.data['evaluation']
            this.doctorID = res.data['doctorID']
            this.departmentNO = res.data['departmentNo']
            this.daccountNo = res.data['daccountNo']
            this.phoneNO = tableData[index]['tel'] //这里为什么出错
            this.address = res.data['address']
            this.birthday = res.data['birthday']
            if(res.data['sex']==="m"){
              this.sex="男性"
            }else if(res.data['sex']==='f'){
              this.sex="女性"
            }else {

            }
            this.introduction = res.data['introduction']
            this.expertise = res.data['expertise']
            this.achievements = res.data['achievements']
            this.nationality = res.data['nationality']
            this.nation = res.data['nation']
            this.college = res.data['college']
            this.nativePlace = res.data['nativePlace']
            this.works = res.data['works']
            this.evaluation = res.data['evaluation']
            this.dialogVisible = true
          } else {
            this.patientID = res.data['patientID']
            this.paccountNo = res.data['paccountNo']
            this.patientName = res.data['patientName']
            this.phoneNO = tableData[index]['tel']
            this.birthday = res.data['birthday']
            this.sex = res.data['sex']
            this.dialogVisibleP = true
          }
        })

      },
      deleteRow (index, tableData) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url: 'deleteDocOrPatient',
            method: 'post',
            data: {
              phone: tableData[index]['tel'],
              tag: tableData[index]['tag'],
            }
          }).then(res => {
            this.$axios({
              url: 'getAllDocAndPatient',
              method: 'get',
            }).then(res => {
              this.AllAccount = res.data
              console.log(this.AllAccount)
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
      handleSizeChange (val) {
        this.currentPage = 1
        this.pagesize = val
      },
      handleCurrentChange (val) {
        this.currentPage = val
      },
      handleFilterChange (value) {
        this.filter = value.status
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
    }
  }
</script>

<style scoped>

</style>
