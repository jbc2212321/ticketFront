<template>
    <div id="MyAppointment">
        <el-dialog
                :visible.sync="dialogVisible"
                width="33%"
                :before-close="handleClose"
                center>

<!--          <div class="dial-middle">-->

            <span class="dial-middle">
                <el-row>
        <span class="demonstration">选择医生 </span>
          <el-select v-model="doctorPhone" placeholder="选择医生">
            <el-option
                    v-for="item in offices"
                    :key="item.doctorPhone"
                    :label="item.label"
                    :value="item.doctorPhone">
            </el-option>
          </el-select>
                </el-row>
          <br><br><br>
                <el-row>
          <span class="demonstration">选择日期 </span>
          <el-date-picker
                  v-model="date1"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
          </el-date-picker>
                </el-row>
          <br><br><br>
                <el-row>
          <template>
            <span class="demonstration">起始时间 </span>
            <el-time-select
                    placeholder="起始时间"
                    v-model="startTime"
                    :picker-options="{
                start: '9:00',
                step: '01:00',
                end: '17:00'
              }">
            </el-time-select>
              <br><br>
            <span class="demonstration">截止时间 </span>
            <el-time-select
                    placeholder="结束时间"
                    v-model="endTime"
                    :picker-options="{
                start: '9:00',
                step: '01:00',
                end: '17:00',
                minTime: startTime
              }">
            </el-time-select>
          </template>
                </el-row>
            </span>
<!--                    </div>-->
                <span slot="footer" class="dialog-footer">
                <el-button @click="submitAppointment" type="primary">提交预约</el-button>
                </span>

        </el-dialog>


        <el-button @click="addAppointment">添加预约</el-button>
        <el-table
                ref="filterTable"
                :data="tableData"
                style="width: 100%"
                :header-cell-style="{textAlign: 'center'}"
                :cell-style="{ textAlign: 'center' }"
                height="600">

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
                    width="120">
            </el-table-column>

            <el-table-column
                    prop="tag"
                    label="所属科室"
                    width="120">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.tag === 1 ? 'primary' : 'success'"
                            disable-transitions>{{transTag[scope.row.tag]}}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column
                    prop="tel"
                    label="手机号">
            </el-table-column>

            <el-table-column
                    prop="time"
                    label="预约时间"
                    width="300" >
            </el-table-column>

            <el-table-column
                    prop="choose"
                    label="状态"
                    width="180">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.choose ===0 ? 'info' : scope.row.choose === 1 ? 'success':'danger'"
                            disable-transitions>{{transState[scope.row.choose]}}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column
                    prop="tag"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                <el-button size="small" type="danger" @click="refuse(scope.row)">取消预约</el-button>
                    </template>
            </el-table-column>

        </el-table>

    </div>
</template>

<style>
    .dial-middle{
        display:flex;
        flex-wrap:wrap;
        justify-content: center;
        align-items: center;
    }
</style>

<script>
  export default {
    name: 'MyAppointment',
    data () {
      return {
        transState: {
          0: '待通过',
          1: '已通过',
          2: '不通过',
        },
        transTag:{
          1:"血液科",
          2:"口腔科"
        },
        tableData: [],
        offices: [],
        pickerOptions: {
          // disabledDate是一个函数,参数是当前选中的日期值,这个函数需要返回一个Boolean值,
          disabledDate: (time) => {
            // 如果函数处理比较简单,可以直接在这里写逻辑方法
            // return time.getTime() < Date.now() - 8.64e7
            // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
            return this.dealDisabledDate(time)
          }
        }, // 日期设置对象
        doctorPhone: '',  //预约医生姓名
        date1: '', //预约日期
        startTime: '',  //起始时间
        endTime: '',   //截止时间
        dialogVisible: false
      }
    },
    mounted () {
      this.$axios({
        url: 'getRelationship',
        method: 'post',
        data: {
          PatientPhone: this.$session.get('phone')
        }
      }).then(res => {
        var AfterList = res.data
        for (let i = 0; i < AfterList.length; i++) {
          var dict = {}
          dict['doctorPhone'] = AfterList[i]['tel']
          dict["label"]=AfterList[i]["tag"]+"医生"+AfterList[i]["name"]
          this.offices.push(dict)
        }
      })

      this.$axios({
        url:"getPatientsAppointment",
        method:"post",
        data:{
          patientPhone:this.$session.get("phone")
        }
      }).then(res=>{
        this.tableData=res.data
        // console.log("tableData:"+res.data)
      })
    },
    methods: {
      dealDisabledDate (time) {
        // time.getTime是把选中的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
        // Date.now()是把今天的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数,这样比较好比较
        // return的值,true是不可以操作选择,false可以操作选择,比如下面这个判断就只能选择今天之后的时间
        return time.getTime() < Date.now()
        // 这里减8.64e7的作用是,让今天的日期可以选择,如果不减的话,今天的日期就不可以选择,判断中写<= 也是没用的,一天的毫秒数就是8.64e7
        // return time.getTime() <= Date.now()
        // return time.getTime() < Date.now() - 8.64e7
      },
      addAppointment(){
        this.doctorPhone=""
        this.date1=""
        this.startTime=""
        this.endTime=""
        this.dialogVisible=true
      },

      submitAppointment(){
        if (this.doctorPhone===""){
          this.$message({
            showClose: true,
            message: '请选择医师！',
            type: 'warning'
          })
          return
        }
        if (this.date1===""||this.startTime===""||this.endTime===""){
          this.$message({
            showClose: true,
            message: '日期或时间不能为空！',
            type: 'warning'
          })
          return
        }
        if (Number(this.endTime.split(":")[0])<=Number(this.startTime.split(":")[0])){
          this.$message({
            showClose: true,
            message: '时间错误！',
            type: 'warning'
          })
          this.endTime=""
          return
        }

        this.$axios({
          url:"getPatientsAppointmentSingle",
          method: "post",
          data:{
            doctorPhone:this.doctorPhone,
            patientPhone: this.$session.get("phone"),
          }
        }).then(res=>{
          console.log(res.data)
          if (res.data===0){
            this.$axios({
              url:"insertPatientAppointment",
              method: "post",
              data:{
                doctorPhone:this.doctorPhone,
                patientPhone: this.$session.get("phone"),
                date:this.date1,
                startTime:this.startTime,
                endTime:this.endTime
              }
            }).then(res=>{
              this.$message({
                showClose: true,
                message: '提交成功！',
                type: 'success'
              })
              this.updateDate()
              this.dialogVisible=false
            })
          }
          else {
            this.$message({
              showClose: true,
              message: '一个医生只能预约一次！',
              type: 'warning'
            })
            this.doctorPhone=""

          }
        })


      },
      refuse (row) {
        this.$confirm('请确认操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
              await this.$axios({
                url: 'deletePatientsAppointment',
                method: 'post',
                data: {
                  num: row['num'],
                }
              }).then(res => {
                this.$message({
                  showClose: true,
                  message: '取消成功！',
                  type: 'success'
                })
                this.updateDate()
              })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      updateDate(){
        this.$axios({
          url:"getPatientsAppointment",
          method:"post",
          data:{
            patientPhone:this.$session.get("phone")
          }
        }).then(res=>{
          this.tableData=res.data
        })
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      }
    }
  }
</script>

<style scoped>

</style>