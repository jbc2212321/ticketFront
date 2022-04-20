<template xmlns:text-align="http://www.w3.org/1999/xhtml">

    <div id="Login">
        <canvas id="canvas"></canvas>
        <div class="mainbody">
        <!--        <canvas id="canvas"></canvas>-->
        <h1>登录</h1>
        <el-row>
            <el-col :span="6" :offset="9">
                <div id="app">
                    <el-input placeholder="请输入账号" minlength="11" maxlength="11" v-model="username" clearable></el-input>
                </div>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="6" :offset="9">
                <div class="grid-content bg-purple">
                    <div id="app2">
                        <el-input placeholder="请输入密码" minlength="6" maxlength="16" v-model="password"
                                  show-password></el-input>
                    </div>
                </div>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="6" :offset="9">
                <div id="app6">
                    <template>
                        <el-select v-model="value" placeholder="请选择账户类型">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </div>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="6" :push="12">
                <div class="grid-content bg-purple">
                    <el-button type="primary" round @click="submit">提交</el-button>
                    <el-button type="primary" round @click="reset">重置</el-button>
                </div>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="4" :offset="11">
                <div text-align:center>
                    <el-link type="primary" @click="toRegister">注册账号</el-link>
                    <br>
                    <el-link type="primary" @click="dialogVisible = true">忘记密码?</el-link>
                </div>
            </el-col>
        </el-row>

        <el-dialog
                :visible.sync="dialogVisible"
                width="35%"
                title="请提供电话号码和账户类型，管理员会协助重置密码"
                :before-close="handleClose"
                :show-close="true"
                center>
      <span>
        <el-form :model="form">
          <el-row>
            <el-col :span="20">
              <el-form-item label="电话号码" :label-width="formLabelWidth">
                <el-input v-model="form.tel" maxlength="11"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="20">
              <el-form-item label="账户类型" :label-width="formLabelWidth">
                <el-select v-model="form.type" placeholder="请选择账户类型">
<!--                  <el-option label="病人" value="病人"></el-option>-->
                  <el-option label="用户" value="用户"></el-option>
                  <el-option label="管理员" value="管理员"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </span>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetPassword">提 交</el-button>
      </span>
        </el-dialog>
        </div>
    </div>
</template>
<script>

  export default {
    name: 'Login',
    data () {
      return {
        username: '',
        password: '',
        dialogVisible: false,
        options: [
        //   {
        //   value: '2',
        //   label: '患者'
        // },
          {
          value: '0',
          label: '用户'
        }, {
          value: '1',
          label: '管理员'
        }],
        form: {
          tel: '',
          type: '',
        },
        formLabelWidth: '120px',
        value: ''
      }
    },
    mounted () {
      console.log(this.$store.state.identity)
    },
    methods: {
      resetPassword () {
        if (!(/^1[34578]\d{9}$/.test(this.form.tel))) {
          this.$message({
            // showClose: true,
            message: '手机号不正确！',
            type: 'warning'
          })
          this.form.tel = ''
          return
        }
        if (this.form.type === '') {
          this.$message({
            showClose: true,
            message: '请选择类型！',
            type: 'warning'
          })
          return
        }
        this.$axios({
          url: 'sendResetPassword',
          method: 'post',
          data: {
            phone: this.form.tel,
            type: this.form.type,
          }
        }).then(res => {
          console.log(res.data)
          if (res.data === false) {
            this.$message({
              showClose: true,
              message: '无该手机号！',
              type: 'error'
            })
            this.form.tel = ''
          } else {
            this.$message({
              showClose: true,
              message: '已向管理员发送请求！',
              type: 'success'
            })
            this.form.tel = ''
            this.form.type = ''
            this.dialogVisible = false
          }

        })

      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.form.tel = ''
            this.form.type = ''
            done()
          })
          .catch(_ => {
          })
      },
      submit: function () {
        if (this.username === '') {
          this.$message({
            showClose: true,
            message: '用户名不能为空！',
            type: 'warning'
          })
          return
        }
        if (this.password === '') {
          this.$message({
            showClose: true,
            message: '密码不能为空！',
            type: 'warning'
          })
          return
        }
        if (this.value === '') {
          this.$message({
            showClose: true,
            message: '请选择权限！',
            type: 'warning'
          })
          return
        }
        this.$axios({
          url: 'checkUser',
          method: 'post',
          data: {
            phone: this.username,
            password: this.password,
            value: this.value,
          }
        }).then(res => {
          // console.log(res)
          if (!res.data) {
            this.$message({
              showClose: true,
              message: '用户名或密码错误！',
              type: 'error'
            })
          } else {
            console.log(res.data.message)
            this.changeLogin(this.value)
            this.$session.set('phone', this.username)
            this.$session.set('userId', res.data.message)
            switch (this.value) {
              case '1':
                console.log("管理员",this.value)
                this.$router.push({
                  path: 'admin/LogManagement'
                })
                break
              // case '2':
              //
              //   this.$router.push({
              //     path: 'patient/MyDoctor'
              //   }).catch(() => {
              //   })
              //   break
              case '0':
                console.log("用户",this.value)
                console.log("res:",res)
                this.$router.push({
                  path: 'user/Upload'
                }).catch(() => {
                })
                break
            }

          }
        })
      },
      reset: function () {
        this.username = ''
        this.password = ''
      },
      changeLogin: function (state) {
        this.$store.commit('Login')
        this.$store.commit('UserLogin', state)
      },
      toRegister: function () {
        this.$router.push({
          path: 'register'
        })
      }
    }
  }
</script>
<style src="../assets/css/canvas.css" scoped>

</style>

<style scoped>
/*@import "src/assets/css/canvas.css";*/
/*@import "../assets/css/canvas.css";*/
    h1 {
        font-size: 40px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        text-align: center;
        padding:1cm 0 0 0;
    }

   #Login{
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .el-dialog .el-dialog__body {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
