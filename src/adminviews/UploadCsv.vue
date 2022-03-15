<template>
    <div id="UploadCsv">
        <template>
            <!--            <span class="demonstration">科室：</span>-->
            <!--            <el-select v-model="value0" placeholder="选择科室" >-->
            <!--                <el-option-->
            <!--                        v-for="item in offices"-->
            <!--                        :key="item.value"-->
            <!--                        :label="item.label"-->
            <!--                        :value="item.value">-->
            <!--                </el-option>-->
            <!--            </el-select>-->
        </template>
        <br><br>
        <el-upload
                class="upload-demo"
                action="http://115.157.200.156:8096/uploadFile"
                accept=".csv"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handle_success"
                :show-file-list="false"
                :beforeUpload="beforeAvatarUpload"
                :on-exceed="handleExceed">
            <el-button id="initSlide" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
        </el-upload>


    </div>
</template>

<script>
  export default {
    name: 'UploadCsv',
    data () {
      return {
        url: '',
        offices: [{
          value: '口腔科',
          label: '口腔科',
        }, {
          value: '血液科',
          label: '血液科'
        }],
        value0: '',//科室

      }
    },
    mounted () {
      // this.$notify({
      //   title: '提示',
      //   message: '血液科csv请以B开头命名，口腔科请以T开头命名',
      //   duration: 0
      // })
    },
    methods: {
      beforeAvatarUpload (file) {
        const isLt2M = file.size / 1024 / 1024 < 1
        if (!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 1MB!',
            type: 'warning'
          })
        }
        return isLt2M
      },
      handle_success (res) {
        if (res === '命名不正确') {
          this.$message({
            showClose: true,
            message: '命名不正确！',
            type: 'error'
          })
        } else if (res === '表名与csv内容冲突') {
          this.$message({
            showClose: true,
            message: '表名与csv内容冲突！',
            type: 'error'
          })
        } else if (res === '内容不合法') {
          this.$message({
            showClose: true,
            message: '内容不合法！',
            type: 'error'
          })
        } else if (res === '上传成功') {
          this.$message({
            showClose: true,
            message: '上传成功！',
            type: 'success'
          })
        }
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
    #UploadCsv {
        padding: 20px 0 0 20px;
    }
</style>