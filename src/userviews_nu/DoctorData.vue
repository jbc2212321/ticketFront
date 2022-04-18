<template>
    <div id="DoctorDate">
        <el-form ref="form" label-width="80px">

            <el-col :span="4">
                <el-form-item label="姓名">
                    <el-input v-model="doctorName" :disabled="doctorNameDisabled"></el-input>
                </el-form-item>
            </el-col>

            <el-form-item label="联系电话">
                <el-col :span="4">
                    <el-input v-model="phoneNo" :disabled="phoneNoDisabled"></el-input>
                </el-col>
            </el-form-item>

            <el-col :span="3">
                <el-form-item label="医生账户">
                    <el-input v-model="daccountNo" :disabled="daccountDisabled"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="3">
                <el-form-item label="医生编号">
                    <el-input v-model="doctorID" :disabled="doctorIDDisabled"></el-input>
                </el-form-item>
            </el-col>

            <el-form-item label="科室">
                <el-col :span="2">
                    <!--                <el-input v-model="sex"></el-input>-->
                    <el-select v-model="departmentNo" placeholder="选择科室">
                        <el-option label="血液科" value=1></el-option>
                        <el-option label="口腔科" value=2></el-option>
                    </el-select>
                </el-col>
            </el-form-item>

            <el-form-item label="性别">
                <el-col :span="4">
                    <el-select v-model="sex" placeholder="选择性别">
                        <el-option label="男性" value="m"></el-option>
                        <el-option label="女性" value="f"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>

            <el-form-item label="出生日期">
                <el-col :span="4">
                    <el-date-picker type="date" placeholder="选择日期" v-model="birthday"
                                    style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>

            <el-form-item label="国籍">
                <el-col :span="4">
                    <el-input v-model="nationality" maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="籍贯">
                <el-col :span="4">
                    <el-input v-model="nativePlace" maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="民族">
                <el-col :span="4">
                    <el-input v-model="nation" maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="毕业院校">
                <el-col :span="6">
                    <el-input v-model="college" maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="详细地址">
                <el-col :span="6">
                    <el-input v-model="address" maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="擅长领域">
                <el-col :span="6">
                    <el-input type="textarea" v-model="expertise" maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="个人著作">
                <el-col :span="6">
                    <el-input type="textarea" v-model="works" maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="个人简介">
                <el-col :span="6">
                    <el-input type="textarea" v-model="introduction" maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="个人成就">
                <el-col :span="6">
                    <el-input type="textarea" v-model="achievements" maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="社会评价">
                <el-col :span="6">
                    <el-input type="textarea" v-model="evaluation" maxlength="100"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交修改</el-button>
                <!--                <el-button type="danger">清空</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: 'DoctorData',
    data () {
      return {
        //设置不可更改
        doctorNameDisabled: false,
        phoneNoDisabled: false,
        daccountDisabled: false,
        doctorIDDisabled: false,
        departmentNoDisabled: false,
        doctorName: '',     //医生姓名
        phoneNo: '',   //电话号码
        daccountNo: '',     //医生账户No
        doctorID: '',      //医生编号
        departmentNo: '',        //科室编号
        trans:{
          1:"血液科",
          2:"口腔科"
        },
        sex: '',       //性别
        birthday: '',     //出生日期
        nationality: '',  //国籍
        nativePlace: '',  //籍贯
        college: '',      //毕业院校
        nation: '',       //民族
        address: '',      //居住地址
        expertise: '',    //擅长领域
        works: '',        //相关著作
        introduction: '',     //个人简介
        achievements: '',     //个人成就
        evaluation: ''       //社会评价

      }
    },
    mounted () {
      this.$axios({
        url: 'getDocDetail',
        method: 'post',
        data: {
          DoctorPhone: this.$session.get('phone')
        }
      }).then(res => {
        this.doctorName = res.data['doctorName']
        this.evaluation = res.data['evaluation']
        this.doctorID = res.data['doctorID']
        this.departmentNo = this.trans[res.data['departmentNo']]
        // console.log(res.data)
        // this.departmentNO = res.data['departmentNO']
        this.daccountNo = res.data['daccountNo']
        this.phoneNo = this.$session.get('phone') //这里为什么出错
        this.address = res.data['address']
        this.birthday = res.data['birthday']
        if (res.data['sex'] === 'f') {
          this.sex = '女性'
        } else if (res.data['sex'] === 'm') {
          this.sex = '男性'
        } else {
          this.sex = ''
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
        this.doctorNameDisabled = true
        this.phoneNoDisabled = true
        this.daccountDisabled = true
        this.doctorIDDisabled = true
        this.departmentNoDisabled = true
      })
    },
    methods: {
      onSubmit () {
        var department;
        if(this.departmentNo==="血液科"){
          department=1
        }else if(this.departmentNo==="口腔科"){
          department=2
        }else if(this.departmentNo===""){
        }else{
          department=Number(this.departmentNo)
        }


        if (this.nationality!== null && this.nationality !== undefined) {
          if(this.nationality.length>100){
            this.$message({
              showClose: true,
              message: '文本内容过长！',
              type: 'warning'
            })
            return
          }
        }
        if (this.nation!== null && this.nation !== undefined) {
          if(this.nation.length>100){
            this.$message({
              showClose: true,
              message: '文本内容过长！',
              type: 'warning'
            })
            return
          }
        }
        if (this.college!== null && this.college !== undefined) {
          if(this.college.length>100){
            this.$message({
              showClose: true,
              message: '文本内容过长！',
              type: 'warning'
            })
            return
          }
        }
        if (this.address!== null && this.address !== undefined) {
          if(this.address.length>100){
            this.$message({
              showClose: true,
              message: '文本内容过长！',
              type: 'warning'
            })
            return
          }
        }
        if (this.expertise!== null && this.expertise !== undefined) {
          if(this.expertise.length>100){
            this.$message({
              showClose: true,
              message: '文本内容过长！',
              type: 'warning'
            })
            return
          }
        }
        if (this.works!== null && this.works !== undefined) {
          if(this.works.length>100){
            this.$message({
              showClose: true,
              message: '文本内容过长！',
              type: 'warning'
            })
            return
          }
        }
        if (this.introduction!== null && this.introduction !== undefined) {
          if(this.introduction.length>100){
            this.$message({
              showClose: true,
              message: '文本内容过长！',
              type: 'warning'
            })
            return
          }
        }
        if (this.achievements!== null && this.achievements !== undefined) {
          if(this.achievements.length>100){
            this.$message({
              showClose: true,
              message: '文本内容过长！',
              type: 'warning'
            })
            return
          }
        }
        if (this.evaluation!== null && this.evaluation !== undefined) {
          if(this.evaluation.length>100){
            this.$message({
              showClose: true,
              message: '文本内容过长！',
              type: 'warning'
            })
            return
          }
        }
        if (this.nativePlace!== null && this.nativePlace !== undefined) {
          if(this.nativePlace.length>100){
            this.$message({
              showClose: true,
              message: '文本内容过长！',
              type: 'warning'
            })
            return
          }
        }

        this.$axios({
          url: 'updateDocDetail',
          method: 'post',
          data: {
            DoctorPhone: this.$session.get('phone'),
            sex: this.sex,
            birthday: this.moment(this.birthday).format('YYYY-MM-DD') ,
            nationality: this.nationality,
            nation: this.nation,
            college: this.college,
            address: this.address,
            departmentNo: department,
            expertise: this.expertise,    //擅长领域
            works: this.works,        //相关著作
            introduction: this.introduction,     //个人简介
            achievements: this.achievements,     //个人成就
            evaluation: this.evaluation,
            nativePlace: this.nativePlace
          }
        }).then(res => {
          // console.log(res.data)
          this.$message({
            showClose: true,
            message: '修改成功！',
            type: 'success'
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>