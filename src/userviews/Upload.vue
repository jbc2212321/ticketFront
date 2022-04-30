<template>
    <div id="Upload">

        <br>
        <el-col :span="6">
            歌曲名称:
            <el-input
                    placeholder="请输入内容"
                    v-model="songname"
                    :disabled="true">
            </el-input>
        </el-col>
        <br>
        <br>
        <br>
        <el-col :span="6">
            编号:
            <el-input
                    placeholder="请输入内容"
                    v-model="songid"
                    :disabled="true">
            </el-input>
        </el-col>
        <br>
        <br>
        <br>
        <el-col :span="6">
            作者ID:
            <el-input
                    placeholder="请输入内容"
                    v-model="userid"
                    :disabled="true">
            </el-input>
        </el-col>
        <br>
        <br>
        <br>
        <el-col :span="6">
            作者名:
            <el-input
                    placeholder="请输入内容"
                    v-model="username"
                    :disabled="true">
            </el-input>
        </el-col>
        <br>
        <br>
        <br> <br>
        <el-col :span="3" :offset="1">
            <el-upload
                    class="upload-demo"
                    action="http://localhost:8096/user/song/upload"
                    accept=".wav"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handle_success"
                    :show-file-list="false"
                    :on-exceed="handleExceed">
                <el-button id="initSlide" type="primary">点击上传</el-button>
            </el-upload>
        </el-col>
        <el-col :span="2">
            <el-button type="primary"  @click="handle_cp">申请版权</el-button>
        </el-col>
        <br>
        <br> <br>
        <el-button type="primary" @click="openFullScreen1" v-loading.fullscreen.lock="fullscreenLoading">测试Loading
        </el-button>
    </div>
</template>

<script>
  export default {
    name: 'Upload',
    data () {
      return {
        userid:"",
        username:"",
        songid:"",
        songname:"",
        fullscreenLoading: false
      }
    },
    open () {
      this.$notify({
        title: '提示',
        message: '歌曲已存在，请勿重复上传',
        duration: 0
      })
    },
    mounted: function (){
      console.log("userId:",this.$session.get('userId'))
      this.$axios({
        url: 'queryUser',
        method: 'post',
        data: {
          userId: this.$session.get('userId'),
        }
      }).then(res => {
        console.log('data!!!:',res.data.data)
        console.log('name!!!:',res.data.data["username"])
        this.userid = res.data.data["id"]
        this.username=res.data.data["username"]
      })
    }
    ,
    methods: {
      openFullScreen1 () {
        this.fullscreenLoading = true
        setTimeout(() => {
          this.fullscreenLoading = false
        }, 2000)
      },
      // openFullScreen2() {
      //   const loading = this.$loading({
      //     lock: true,
      //     text: 'Loading',
      //     spinner: 'el-icon-loading',
      //     background: 'rgba(0, 0, 0, 0.7)'
      //   });
      //   setTimeout(() => {
      //     loading.close();
      //   }, 2000);
      // },

      // 限制上传大小
      beforeAvatarUpload (file) {
        const isLt2M = file.size / 100 / 1024 / 1024 < 1
        if (!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 100MB!',
            type: 'warning'
          })
        }
        return isLt2M
      },
      handle_success (res) {
        console.log("res:",res)
        if (res.code === 0){
          this.songid=res.data["id"]
          this.songname=res.data["name"]
        }else{
        alert("dsasda")
        }

        // if (res === '命名不正确') {
        //   this.$message({
        //     showClose: true,
        //     message: '命名不正确！',
        //     type: 'error'
        //   })
        // } else if (res === '内容不合法') {
        //   this.$message({
        //     showClose: true,
        //     message: '内容不合法！',
        //     type: 'error'
        //   })
        // } else if (res === '上传成功') {
        //   this.$message({
        //     showClose: true,
        //     message: '上传成功！',
        //     type: 'success'
        //   })
        // }
      },
      handle_cp(){
        console.log("userid:",this.$session.get('userId'))
        console.log("songid:",this.songid)
        this.$axios({
          url: '/user/song/applyCopyright',
          method: 'post',
          data: {
            userId: this.$session.get('userId')+'',
            username:this.username,
            songid:this.songid+"",
            songname:this.songname,
          }
        }).then(res => {
            console.log("data",res.data)
          if (res.data.code===0){
            alert("申请成功")
          }
        })
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
    }
  }
</script>

<style scoped>
    #Upload {
        height: 800px
    }
</style>
