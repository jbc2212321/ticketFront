<template>
  <div id="Patient">
    <el-container>
      <!--        <el-aside >-->
      <!--          <el-menu :default-openeds="['1']">-->
      <!--            <el-row class="tac" align="top">-->
      <el-menu

              default-active="3"
              class="el-menu-vertical-demo"
              border-right-width="0px"
              @open="handleOpen111"
              @close="handleClose111"
              background-color="#2F4050"
              text-color="#fff"
              active-text-color="#ffd04b"
              :collapse="isCollapse"
      >

        <router-link to="MyCase" class="a">
          <el-menu-item index="2">
            <i class="el-icon-s-custom"></i>
            <span slot="title">数据查询</span>
          </el-menu-item>
        </router-link>

        <router-link to="MyDoctor" class="a">
        <el-menu-item index="3">
          <i class="el-icon-s-custom"></i>
          <span slot="title">我的医师</span>
        </el-menu-item>
        </router-link>

        <router-link to="MyAppointment" class="a">
          <el-menu-item index="4">
            <i class="el-icon-message-solid"></i>
            <span slot="title">我的预约</span>
          </el-menu-item>
        </router-link>

        <router-link to="MyData" class="a">
          <el-menu-item index="5">
            <i class="el-icon-tickets"></i>
            <span slot="title">个人资料</span>
          </el-menu-item>
        </router-link>
      </el-menu>

    <el-container>
        <el-header>
          <el-col :span="1" >
            <el-button size="medium" type="menu" @click="handleCollapse"><i class="el-icon-s-operation"></i></el-button>
          </el-col>
          <el-col :span="23">
            <el-dropdown
                    size="medium"
                    placement="bottom"
                    trigger="click"
                    @command="batchOperate"
                    style="margin-left: 10px;">
              <el-button type="info" size="medium" plain>
                {{userName}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="loginout">
                  <i class="el-icon-switch-button" ></i>
                  登出</el-dropdown-item>
                <el-dropdown-item command="change">
                  <i class="el-icon-edit" circle></i>
                  修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
<!--          <el-col :span="4">-->
<!--            <el-row :gutter="15">-->
<!--              <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
<!--                <el-radio-button :label="false">展开</el-radio-button>-->
<!--                <el-radio-button :label="true">收起</el-radio-button>-->
<!--              </el-radio-group>-->
<!--            </el-row>-->
<!--          </el-col>-->

<!--          <el-col :span="5" :offset="15">-->
<!--            <el-row :gutter="15">-->
<!--              <el-col :span="5">-->
<!--                <el-dropdown>-->
<!--                <span class="el-dropdown-link">-->
<!--                  {{userName}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--                </span>-->
<!--                  <el-dropdown-menu slot="dropdown">-->
<!--                    <el-dropdown-item ><el-button @click="outLogin">登出</el-button></el-dropdown-item>-->
<!--                  </el-dropdown-menu>-->
<!--                </el-dropdown>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </el-col>-->
        </el-header>

<!--        <el-main>Main</el-main>-->
        <div><router-view></router-view></div>
      <el-footer><br><br><br>Copyright  JBC</el-footer>

    </el-container>
    </el-container>

    <el-dialog
            :visible.sync="changePassword"
            width="33%"
            :before-close="handleClose"
            center>
          <span>
            <el-form ref="form"  label-width="80px">
              <el-form-item label="当前密码" :required=true><el-col>
                <el-input type="password" v-model="prevpw" placeholder="输入当前密码" minlength="6" maxlength="16"></el-input>
              </el-col></el-form-item>

                <el-form-item label="新密码" :required=true><el-col>
                    <el-tooltip class="item" effect="dark" content="新密码必须包含字母、数字、特殊符号且长度在6-16之间" placement="top-start">
                        <el-input type="password" v-model="newpw" placeholder="输入新密码" minlength="6" maxlength="16"></el-input>
                    </el-tooltip>

              </el-col></el-form-item>

                <el-form-item label="确认密码" :required=true><el-col>
                  <el-input type="password" v-model="conpw" placeholder="确认新密码" minlength="6" maxlength="16"></el-input>
                </el-col></el-form-item>
              </el-form>
          </span>
              <span slot="footer" class="dialog-footer">
              <el-button @click="modifyPassword" type="primary">确认修改</el-button>
              </span>
    </el-dialog>


  </div>
</template>

<script>
  import store from '../store'
export default {
  name: 'PatientHome',
  data(){
    return {
      isCollapse: true,
      userName:"",
      prevpw: '',
      newpw:'',
      conpw:'',
      changePassword: false,
    }
  },
  mounted () {
    this.$axios({
      url:"getPatientName",
      method:"post",
      data:{
        phone:this.$session.get("phone")
      }
    }).then(res=>{
      this.userName=res.data
    })
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
              .then(_ => {
                this.newpw=""
                this.conpw=""
                this.prevpw=""
                done()
              })
              .catch(_ => {
              })
    },
    async modifyPassword () {
      if (this.prevpw === '') {
        this.$message({
          showClose: true,
          message: '密码不能为空！',
          type: 'warning'
        })
        return
      }
      if (this.prevpw.length < 6 || this.prevpw.length > 16) {
        this.$message({
          showClose: true,
          message: '密码长度不正确！',
          type: 'warning'
        })
        return
      }
      if (this.newpw === '') {
        this.$message({
          showClose: true,
          message: '新密码不能为空！',
          type: 'warning'
        })
        return
      }
      if (this.newpw.length < 6 || this.newpw.length > 16) {
        this.$message({
          showClose: true,
          message: '新密码长度不正确！',
          type: 'warning'
        })
        return
      }
      var reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,16}$/
      var flag = reg.test(this.newpw)
      if (flag === false) {
        this.$message({
          type: 'error',
          message: '新密码必须由 6-16位字母、数字、特殊符号组成!'
        })
        return false
      }
      var reg2 =/[\u4E00-\u9FA5\uF900-\uFA2D]/
      if (reg2.test(this.newpw)){
        this.$message({
          type: 'error',
          message: '密码不能有中文!'
        })
        return false
      }
      if (this.newpw !== this.conpw) {
        this.$message({
          showClose: true,
          message: '重复密码不正确！',
          type: 'warning'
        })
        return
      }
      await this.$axios({
        url: 'checkPatientPassword',
        method: 'post',
        data: {
          phone: this.$session.get('phone'),
          password: this.prevpw
        }
      }).then(res => {
        if (res.data) {
          this.$axios({
            url: 'updatePatientPassword',
            method: 'post',
            data: {
              phone: this.$session.get('phone'),
              password: this.newpw
            }
          }).then(res => {
            this.$message({
              showClose: true,
              message: '密码修改成功！',
              type: 'success'
            })
            this.changePassword = false
          })
        } else {
          this.$message({
            showClose: true,
            message: '密码不正确！',
            type: 'error'
          })
          this.prevpw = ""

        }
      })

    },
    handleCollapse(){
      if(this.isCollapse==true)this.isCollapse=false;
      else if(this.isCollapse==false)this.isCollapse=true;
    },
    batchOperate(command) {
      switch (command) {
        case "loginout":
          this.outLogin();
          break;
        case "change":
          this.changePassword = true;
          break;
      }
    },
  outLogin(){
    this.$axios({
      url:"userLoginOut",
      method:"post",
      data:{
        phone:this.$session.get("phone"),
        state:this.$store.state.identity
      }
    }).then(res=>{
      this.$session.remove("phone")
      this.$store.commit("OutLogin")
      this.$router.push({
        path: '/'
      })
    })

  },
  handleOpen111(key, keyPath) {
    console.log(key, keyPath);
  },
  handleClose111(key, keyPath) {
    console.log(key, keyPath);}
  }
}
</script>

<style scoped>
  .a{
    text-decoration: none;
  }
h3{
  color:#f0ebe7;
}

  .el-header {
    background-color:#F3F3F4;
    color: #333;
    text-align: right;
    line-height: 20px;
    padding: 10px 5px 0  0;
  }

.el-footer {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 10px;
}

.el-aside {
  background-color:  #2F4050;
  color: #333;
  text-align: left;
  line-height: 818px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 0;
}

  .el-button--menu {
    color: #FFF !important;
    background-color:#18A689;
    border-color:rgba(255, 255, 255, 0);
  }
  .el-button--menu:focus{
    color: #FFF !important;
    background-color:#18A689;
    border-color:rgba(255, 255, 255, 0);
  }
  .el-button--menu:active,
  .el-button--menu:hover {
    color: #FFF !important;
    background-color:#22be9f;
    border-color:rgba(255, 255, 255, 0);
  }

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #439bf3;
}
.el-icon-arrow-down {
  font-size: 12px;
}

h1 {
  font-size: 25px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
<style scoped>
  .a {
    text-decoration: none;
  }

  .el-header {
    background-color: #F3F3F4;
    color: #333;
    text-align: right;
    line-height: 20px;
    padding: 10px 5px 0 0;
  }

  .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 10px;
  }

  .el-aside {
    background-color: #2F4050;
    color: #333;
    text-align: left;
    line-height: 818px;
  }

  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 0;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #439bf3;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  h1 {
    font-size: 25px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>

<style scoped>
  h3 {
    color: #f0ebe7;
  }

  .el-menu {
    border-right-style: none;
    border-right-width: 0;
  }

  .el-menu-vertical-demo.el-menu--collapse.el-menu {
    border-right-style: solid;
    border-right-width: 4px;
  }

  .el-menu-vertical-demo.el-menu {
    border-right-style: solid;
    border-right-width: 4px;
  }

  .el-button--menu {
    color: #FFF !important;
    background-color: #18A689;
    border-color: rgba(255, 255, 255, 0);
  }

  .el-button--menu:focus {
    color: #FFF !important;
    background-color: #18A689;
    border-color: rgba(255, 255, 255, 0);
  }

  .el-button--menu:active,
  .el-button--menu:hover {
    color: #FFF !important;
    background-color: #22be9f;
    border-color: rgba(255, 255, 255, 0);
  }
</style>