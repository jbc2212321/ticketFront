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
            <el-button type="primary" @click="onSubmit1">版权授权</el-button>
            <el-button type="primary" @click="onSubmit2">版权转让</el-button>
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
          buyerid:'',
          status:''
      }
    },
    mounted () {

    },
    methods: {
      //授权
      onSubmit1() {
        this.$axios({
          url:"", //url
          method:"post",
          data:{
            ownerid:this.$session.get('userId'),
            buyerid: this.buyerid,
            songid: this.songid,
            status:1,
          },
        }).then(res=>{
          // this.$message({
          //   showClose: true,
          //   message: "修改成功！",
          //   type: 'success'
          // })
          // console.log(123+this.ownerid+this.buyerid+this.songid+status)
        })
      },

      //转让 交易
      onSubmit2() {
        this.$axios({
          url:"", //url
          method:"post",
          data:{
            ownerid:this.$session.get('userId'),
            buyerid: this.buyerid,
            songid: this.songid,
            status:0,
          },
        }).then(res=>{
          if(res.data.code===0){

          }
          // this.$message({
          //   showClose: true,
          //   message: "修改成功！",
          //   type: 'success'
          // })
          // console.log(123+this.ownerid+this.buyerid+this.songid+status)
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
