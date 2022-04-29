<template>
  <div class="home">
    <el-container>
      <el-aside width="18">
        <el-aside>
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-menu"></i>数字音乐版权保护系统-管理员</template>
              <el-menu-item index="1-1" ><router-link to="/admin/LogManagement">用户管理</router-link></el-menu-item>
              <el-menu-item index="1-2">日志管理</el-menu-item>
              <el-menu-item index="1-3">数据查询</el-menu-item>
              <el-menu-item index="1-4">数据加密</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
      </el-aside>
      <el-container>
        <el-header><h1>数字音乐版权保护系统</h1></el-header>
        <div style="height: 800px;overflow: auto"><router-view></router-view></div>
<!--        <el-main ><router-view></router-view></el-main>-->
        <el-footer><br><br><br>数字音乐版权保护系统</el-footer>
      </el-container>
    </el-container>
<!--    <el-button type="primary" round @click="submit">跳转</el-button>-->


  </div>
</template>

<script>


export default {
  name: 'Home',
  data () {
    return {
        songid:'',
        songname:'',
        userid:'',
        username:'',
    }
  },
  methods: {
    submit:function (){
      this.$router.push({
        path: 'admin'
      })
    }
  },
  components: {
  }
}
</script>
<style scoped>
.el-header {
  /*background-color: #4d92ec;*/
  /*color: #3c57ee;*/
  text-align: center;
  line-height: 20px;
}

.el-footer {
  /* background-color: #ffffff;
  color: #333; */
  text-align: center;
  line-height: 10px;
}

.el-aside {
  /* background-color:  #ffffff;
  color: #333; */
  text-align: left;
  line-height: 818px;
}

.el-main {
  /* background-color: #ffffff;
  color: #333; */
  /*text-align: left;*/
  /*line-height: 760px;*/
}
h1{
  font-size:25px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

</style>
