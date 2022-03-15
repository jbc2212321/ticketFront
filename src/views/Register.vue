<template xmlns:text-align="http://www.w3.org/1999/xhtml">
    <div id="Register">
        <canvas id="canvas"></canvas>
        <div class="mainbody">
            <h1>注册</h1>
            <div id="layout">
                <!--    <div class="tex">-->
                <el-form ref="form" label-width="80px">
                    <el-col :span="6" :offset="9">
                        <el-form-item label="用户名" :required="true">
                            <el-input placeholder="请输入用户名" minlength="2" maxlength="10" v-model="username"
                                      clearable></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6" :offset="9">
                        <el-form-item label="手机号" :required="true">
                            <el-input placeholder="请输入手机号" maxlength="11" v-model="phoneNumber" clearable></el-input>
                        </el-form-item>
                    </el-col>


                    <el-col :span="6" :offset="9">
                        <el-form-item label="设置密码" :required="true">
                            <el-tooltip class="item" effect="dark" content="密码必须包含字母、数字、特殊符号且长度在6-16之间" placement="top-start">
                                <el-input placeholder="请输入密码" minlength="6" maxlength="16" v-model="password"
                                          show-password></el-input>
                            </el-tooltip>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6" :offset="9">
                        <el-form-item label="确认密码" :required="true">
                            <el-input placeholder="请确认密码" minlength="6" maxlength="16" v-model="check_password"
                                      show-password></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6" :offset="9">
                        <el-form-item label="用户类型" :required="true">
                            <el-select v-model="value" placeholder="请选择账户类型">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-form>
                <!--    </div>-->
                <el-col :span="10" :offset="10">
                    <el-checkbox v-model="checked">我已认真阅读并同意用户协议</el-checkbox>
                </el-col>
                <el-col :span="4" :offset="14">
                    <el-button type="primary" round @click="getRegister">注册</el-button>
                </el-col>
                <el-col :span="4" :offset="11">
                    <div text-align:center>
                        <el-link type="primary" @click="toLogin">已有账号? 马上登录</el-link>
                    </div>
                </el-col>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Register',
    data () {
      return {
        username: '',
        password: '',
        check_password: '',
        phoneNumber: '',
        checked: false,
        options: [
        //   {
        //   value: '3',
        //   label: '患者'
        // },
          {
          value: '0',
          label: '用户'
        }, {
          value: '1',
          label: '管理员'
        }],
        value: ''
      }
    },
    methods: {
      toLogin: function () {
        this.$router.push({
          path: '/'
        })
      },
      clearAll: function () {
        this.username = ''
        this.password = ''
        this.check_password = ''
        this.phoneNumber = ''
        this.checked = false
        this.value = ''
      },
      getRegister: function () {
        if (this.username.length < 2 || this.username.length > 10) {
          this.$message({
            type: 'error',
            message: '用户名必须在2-10之间!'
          })
          return
        }
        if (!(/^1[34578]\d{9}$/.test(this.phoneNumber))) {
          alert('手机号码有误，请重填')
          return
        }
        if (this.password.length < 6 || this.password.length > 16) {
          this.$message({
            type: 'error',
            message: '密码必须在6-16之间!'
          })
          return
        }
        var reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,16}$/
        var flag = reg.test(this.password)
        if (flag === false) {
          this.$message({
            type: 'error',
            message: '密码必须由 6-16位字母、数字、特殊符号组成!'
          })
          return false
        }
        const reg2 = /[\u4E00-\u9FA5\uF900-\uFA2D]/
        if (reg2.test(this.password)){
          this.$message({
            type: 'error',
            message: '密码不能有中文!'
          })
          return false
        }
        if (this.password !== this.check_password) {
          this.$message({
            type: 'error',
            message: '重复密码不正确!'
          })
          return
        }
        if (this.value === '') {
          this.$message({
            type: 'warning',
            message: '请选择用户权限!'
          })
          return
        }
        if (!this.checked) {
          this.$message({
            type: 'warning',
            message: '请勾选我已阅读用户协议!'
          })
          return
        }
        this.$axios({
          url: 'addUser',
          method: 'post',
          data: {
            username: this.username,
            password: this.password,
            phone: this.phoneNumber,
            value: this.value,
          }
        }).then(res => {
          if (res.data === '手机号已被注册!') {
            this.clearAll()
            this.$message({
              message: '改手机号已被注册！',
              type: 'error',
              duration: 2000,
            })
          } else {
            this.$message({
              message: '注册成功! 即将跳转至登录界面',
              type: 'success',
              duration: 2000,
            })
            this.$router.push({
              path: '/'
            })
          }

        })

      }

    }
  }
</script>

<style src="../assets/css/canvas.css" scoped>

</style>

<style scoped>
    /*@import "../assets/css/canvas.css";*/
    h1 {
        font-size: 40px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        text-align: center;
        padding: 1cm 0 0 0;
    }

    body {
        overflow-x: hidden;
        overflow-y: hidden;
    }

    /*.tex{*/
    /*  padding: 0 0 0 400px;*/
    /*}*/
</style>
