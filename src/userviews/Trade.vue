<template>
    <div id="Trade">
<!--     版权交易 -->

        <el-form ref="form"  label-width="80px" >

            <el-form-item label="歌曲id"><el-col :span="7" >
                <el-input v-model="songid"></el-input>
            </el-col></el-form-item>

            <el-form-item label="对方id"><el-col :span="7">
                <el-input v-model="buyerid" ></el-input>
            </el-col></el-form-item>

            <el-col :span="9" :offset="3">
            <el-button type="primary" @click="onSubmit">版权授权</el-button>
            <el-button type="primary" @click="onSubmit">版权转让</el-button>
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
          songid:'',
          buyerid:''
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
    #Trade {
        /*padding: 1cm 0 0 12cm;*/
        height:800px
    }
</style>
