<template>
    <div id="MyData">
        <el-form ref="form"  label-width="80px" >

            <el-form-item label="姓名"><el-col :span="7" >
                <el-input v-model="patientName" :disabled="true"></el-input>
            </el-col></el-form-item>

            <el-form-item label="联系电话"><el-col :span="7">
                <el-input v-model="phoneNo" :disabled="true"></el-input>
            </el-col></el-form-item>

            <el-form-item label="病人账户"><el-col :span="7">
                <el-input v-model="paccountNo" :disabled="true"></el-input>
            </el-col></el-form-item>

            <el-form-item label="病人编号"><el-col :span="7">
                <el-input v-model="patientID" :disabled="true"></el-input>
            </el-col></el-form-item>

            <el-form-item label="性别"><el-col :span="7">
                <el-select v-model="sex" placeholder="选择性别">
                    <el-option label="男性" value="m"></el-option>
                    <el-option label="女性" value="f"></el-option>
                </el-select>
            </el-col></el-form-item>

            <el-form-item label="出生日期"><el-col :span="7">
                <el-date-picker type="date" placeholder="选择日期" v-model="birthday" style="width: 100%;"></el-date-picker>
            </el-col></el-form-item>

            <el-col :span="7" :offset="2">
            <el-button type="primary" @click="onSubmit">提交修改</el-button>
<!--            <el-button type="danger">清空</el-button>-->
            </el-col>

        </el-form>

    </div>
</template>

<script>
  export default {
    name: 'MyData',
    data() {
      return {

          patientID: '',
          paccountNo: '',
          patientName: '',
          phoneNo: '',
          birthday: '',
          sex: '',

      }
    },
    mounted () {
        this.$axios({
          url:"getPatientDetail",
          method:"post",
          data:{   
            phone:this.$session.get("phone")
          }
        }).then(res=>{
            console.log(res.data)
            this.patientID=res.data["patientID"]
            this.paccountNo=res.data["paccountNo"]
            this.patientName=res.data["patientName"]
            this.phoneNo=res.data["phoneNo"]
            this.birthday=res.data["birthday"]
            this.sex=res.data["sex"]
        })
    },
    methods: {
      onSubmit() {
        this.$axios({
          url:"updatePatientDetail",
          method:"post",
          data:{
            patientID: this.patientID,
            paccountNo: this.paccountNo,
            patientName: this.patientName,
            phoneNo: this.$session.get("phone"),
            birthday: this.moment(this.birthday).format('YYYY-MM-DD'),
            sex: this.sex,
          }
        }).then(res=>{
          this.$message({
            showClose: true,
            message: "修改成功！",
            type: 'success'
          })

        })
      }
    }
  }
</script>

<style scoped>
    #MyData {
        padding: 1cm 0 0 12cm
    }
</style>