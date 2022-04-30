<template>

    <div id="train">
        <!--        action="http://localhost:8096/user/upload"-->
        <el-upload
                class="upload-demo"
                action="http://localhost:5000/invoice/huoChe"
                accept=".jpeg,.png"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handle_success"
                :on-progress="handle_progress"
                :show-file-list="false"
                :beforeUpload="handle_progress"
                :on-exceed="handleExceed">
            <el-button id="initSlide" type="primary" @click="uploadImage">点击上传</el-button>
            <el-button id="initSlide2" type="primary">重新识别</el-button>
            <!--            <div slot="tip" class="el-upload__tip">只能上传csv文件</div>-->
        </el-upload>

        <el-button type="text" @click=merge>识别结果展示</el-button>

<!--        <el-button type="text" @click="printImg">打印测试</el-button>-->
      <br>



        <el-dialog :visible.sync="dialogTableVisible" width="500px" top="10px">
          <div ref="exportPdf">
          <div class="ticketfont">
            <el-row>
              <el-col :span="23" :offset="1"><div class="red">{{Identification_number}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="station">{{starting_station}}</div></el-col>
              <el-col :span="8"><div class="arrow">{{train_num}}<br>————————></div></el-col>
              <el-col :span="8"><div class="station">{{destination_station}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="center">{{date}}</div></el-col>
              <el-col :span="8"><div class="center">{{time}}</div></el-col>
              <el-col :span="7" :offset="1"><div>{{seat_num}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="4" :offset="2"><div>{{ticket_rates}}</div></el-col>
              <el-col :span="8" :offset="2"><div class="center">网</div></el-col>
              <el-col :span="7" :offset="1"><div>&nbsp;{{seat_category}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="2"><div>限乘当日当次车</div></el-col>
              <el-col :span="16"><div></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><div></div></el-col>
            </el-row>
            <br>
            <el-row>
              <el-col :span="8" :offset="2"><div>{{id_num}}</div></el-col>
              <el-col :span="6"><div>{{name}}</div></el-col>
              <el-col :span="8"><div></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="3"><div class="bor">买票请到12306 发货请到95306<br>中国铁路祝您旅途愉快</div></el-col>
              <el-col :span="9"><div></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8" :offset="2"><div class="smallfont">{{serial_number}}</div></el-col>
              <el-col :span="8"><div>{{sales_station}}</div></el-col>
              <el-col :span="6"><div></div></el-col>
            </el-row>
          </div>
          <br>
          <el-col :span="9" :offset="7">
            <el-button type="primary" round @click="saveTicket">确 认</el-button>
            <!--              <el-button type="primary" round v-print="'#printTest'">打 印</el-button>-->
            <el-button type="primary" @click="toImg">打印</el-button>

          </el-col>
          <br> <br>
          </div>
        </el-dialog>

        识别号：
        <input type="text" name="Identification_number" v-model="Identification_number" border="0px">
        车票号：
        <input type="text" name="ticket_num" v-model="ticket_num">
        始发站：
        <input type="text" name="starting_station" v-model="starting_station" size="18"><br>
        车次号：
        <input type="text" name="train_num" v-model="train_num" size="18">
        到达站：
        <input type="text" name="destination_station" v-model="destination_station" size="18">
        到达日期：<input type="text" name="date" v-model="date"><br>
        车票金额：
        <input type="text" name="ticket_rates" v-model="ticket_rates">
        席别：
        <input type="text" name="seat_category" v-model="seat_category">
        姓名：
        <input type="text" name="name" v-model="name"><br>
        身份证：
      <input type="text" name="id_num" v-model="id_num">
        序列号：
      <input type="text" name="serial_number" v-model="serial_number">
      售站：
      <input type="text" name="sales_station" v-model="sales_station"><br>
      时间：
      <input type="text" name="time" v-model="time">
      座位号：
      <input type="text" name="seat_num" v-model="seat_num"><br>


    </div>
</template>


<script>
  import html2canvas from 'html2canvas' // 转为图片
  import { Loading } from 'element-ui';
  import printJS from 'print-js' // 打印
  export default {
    name: 'train',
    data () {
      return {
        user_id:'',
        Identification_number:'X006460',
        ticket_num:'',
        starting_station:'广州站',
        train_num:'Z90',
        destination_station:'石家庄站',
        date:'2019年09月29日',
        ticket_rates:'￥224.0元',
        seat_category:'新空调硬座',
        name:'张智清',
        id_num:'1301231997****0015',
        serial_number:'65870300070929X006460',
        sales_station:'汕尾售',
        time:'13:50开',
        seat_num:'01车047号',

        dialogTableVisible: false,

        //发票图片
        ticketImg: '',
        imageName: '',
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

      //转图片打印
      toImg () { // 转图片打印
        html2canvas(this.$refs.exportPdf, {
          backgroundColor: '#ffffff',
          useCORS: true,
          // width: window.screen.availWidth,
          // height: window.screen.availHeight,
          // windowHeight: document.body.scrollHeight,
          // y:window.pageYOffset

          width: 460,
          height: 226,
          windowHeight: 1250,
          y: 0
        }).then((canvas) => {
          // let url = canvas.toDataURL('image/jpeg', 1.0)
          const url = canvas.toDataURL()
          this.img = url
          this.ticketImg = url
          //打印图片
          // alert("打印")
          // printJS({
          //   printable: url,
          //   type: 'image',
          //   documentTitle: '打印图片'
          // })
          //base64格式图片打印查看
          console.log(url)
        })
      },

      // 获取表格选中时的数据
      selectRow (val) {
        this.selectlistRow = val
      },
      // 增加行
      addRow () {
        var list = {
          rowNum: '',
          CommodityName: this.CommodityName,
          CommodityType: this.CommodityType,
          CommodityUnit: this.CommodityUnit,
          CommodityNum: this.CommodityNum,
          CommodityPrice: this.CommodityPrice,
          CommodityAmount: this.CommodityAmount,
          CommodityTaxRate: this.CommodityTaxRate,
          CommodityTax: this.CommodityTax,
        }
        this.tableData.push(list)
      },
      merge () {
        this.dialogTableVisible = true
        this.CommodityName = ''
        this.CommodityType = ''
        this.CommodityUnit = ''
        this.CommodityNum = ''
        this.CommodityPrice = ''
        this.CommodityAmount = ''
        this.CommodityTaxRate = ''
        this.CommodityTax = ''
        // console.log('weis:',this.InvoiceTypeOrg)
        // console.log("是这个吗：",this.tableData[0])
        // console.log('整个;',this.tableData)
        for (let i = 0; i < this.tableData.length; i++) {
          this.CommodityName += this.tableData[i].CommodityName + '\n'
          this.CommodityType += this.tableData[i].CommodityType + '\n'
          this.CommodityUnit += this.tableData[i].CommodityUnit + '\n'
          this.CommodityNum += this.tableData[i].CommodityNum + '\n'
          this.CommodityPrice += this.tableData[i].CommodityPrice + '\n'
          this.CommodityAmount += this.tableData[i].CommodityAmount + ' \n'
          if (i === this.tableData.length - 1) {
            this.CommodityTaxRate += this.tableData[i].CommodityTaxRate + '\n'
          } else {
            this.CommodityTaxRate += this.tableData[i].CommodityTaxRate + '%\n'
          }
          this.CommodityTax += this.tableData[i].CommodityTax + ' \n'
          // console.log("i;",this.tableData[i].CommodityName)
        }

        // for (let key in this.tableData) {
        //   console.log(key + ':' + this.tableData[key]);
        // }
      },

// 删除方法
      // 删除选中行
      delData () {
        for (let i = 0; i < this.selectlistRow.length; i++) {
          let val = this.selectlistRow
          // 获取选中行的索引的方法
          // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
          // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
          val.forEach((val, index) => {
            this.tableData.forEach((v, i) => {
              if (val.rowNum === v.rowNum) {
                // i 为选中的索引
                this.tableData.splice(i, 1)
              }
            })
          })
        }
        // 删除完数据之后清除勾选框
        this.$refs.tableData.clearSelection()
      },

      beforeAvatarUpload (file) {
        const isLt2M = file.size / 1024 / 1024 / 100 < 1
        if (!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 100MB!',
            type: 'warning'
          })
        }
        return isLt2M
      },
      handle_progress (){
        // this.openFullScreen2()
        startLoading()
      },
      handle_success (res) {
        console.log('data:', res)
        if (res.code === 0) {
          // loading.close();
          console.log('res:', res)
          this.InvoiceCode = res.data.InvoiceCode
          this.MachineCode = res.data.MachineCode
          this.InvoiceTypeOrg = res.data.InvoiceTypeOrg
          this.InvoiceNum = res.data.InvoiceNum
          this.InvoiceDate = res.data.InvoiceDate
          this.PurchaserName = res.data.PurchaserName
          this.PurchaserRegisterNum = res.data.PurchaserRegisterNum
          this.PurchaserAddress = res.data.PurchaserAddress
          this.PurchaserBank = res.data.PurchaserBank
          this.Password = res.data.Password
          this.CommodityName = res.data.CommodityName
          this.CommodityType = res.data.CommodityType
          this.CommodityUnit = res.data.CommodityUnit
          this.CommodityNum = res.data.CommodityNum
          this.CommodityPrice = res.data.CommodityPrice
          this.CommodityAmount = res.data.CommodityAmount
          this.TotalAmount = res.data.TotalAmount
          this.CommodityTaxRate = res.data.CommodityTaxRate
          this.CommodityTax = res.data.CommodityTax
          this.TotalTax = res.data.TotalTax
          this.AmountInWords = res.data.AmountInWords
          this.AmountInFiguers = res.data.AmountInFiguers
          this.SellerRegisterNum = res.data.SellerRegisterNum
          this.SellerName = res.data.SellerName
          this.SellerAddress = res.data.SellerAddress
          this.SellerAddress = res.data.SellerAddress
          this.SellerBank = res.data.SellerBank
          this.Payee = res.data.Payee
          this.Checker = res.data.Checker
          this.NoteDrawer = res.data.NoteDrawer
          this.Remarks = res.data.Remarks

          this.imageName = res.imageName
          console.log('图片:', this.imageName)
          endLoading()
          this.$message({
            showClose: true,
            message: '上传成功！',
            type: 'success'
          })

        }
        ;
        //   const loading = this.$loading({
        //     lock: true,
        //     text: 'Loading',
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0.7)'
        //   });
        //   setTimeout(() => {
        //     loading.close();
        //   }, 2000);
        // }  //加载等待的时间

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
      //   }, 20000);
      // },

      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {

        console.log(file)
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },

      saveTicket: function () {
        console.log('userId:', this.$session.get('userId'))
        console.log('imageName:', this.imageName)
        html2canvas(this.$refs.exportPdf, {
          backgroundColor: '#ffffff',
          useCORS: true,
          width: 960,
          height: 590,
          windowHeight: 1250,
          y: 0
        }).then((canvas) => {
          // let url = canvas.toDataURL('image/jpeg', 1.0)
          const url = canvas.toDataURL()
          this.img = url
          this.ticketImg = url
          //base64格式图片打印查看
          console.log(url)
        })

        this.$axios(
          {
            url: 'user/saveTicket',
            method: 'post',
            data: {
              userId: this.$session.get('userId'),
              ticketImg: this.ticketImg,
              username: this.username,
              password: this.password,
              phone: this.phoneNumber,
              value: this.value,
              imageName: this.imageName,
              vatInvoice: {
                InvoiceCode: this.InvoiceCode,
                MachineCode: this.MachineCode,
                InvoiceTypeOrg: this.InvoiceTypeOrg,
                InvoiceNum: this.InvoiceNum,
                InvoiceDate: this.InvoiceDate,
                PurchaserName: this.PurchaserName,
                PurchaserRegisterNum: this.PurchaserRegisterNum,
                PurchaserAddress: this.PurchaserAddress,
                PurchaserBank: this.PurchaserBank,
                Password: this.Password,
                CommodityName: this.CommodityName + '',
                CommodityType: this.CommodityType + '',
                CommodityUnit: this.CommodityUnit + '',
                CommodityNum: this.CommodityNum + '',
                CommodityPrice: this.CommodityPrice + '',
                CommodityAmount: this.CommodityAmount + '',
                TotalAmount: this.TotalAmount + '',
                CommodityTaxRate: this.CommodityTaxRate + '',
                CommodityTax: this.CommodityTax + '',
                TotalTax: this.TotalTax + '',
                AmountInWords: this.AmountInWords + '',
                AmountInFiguers: this.AmountInFiguers + '',
                SellerName: this.SellerName,
                SellerRegisterNum: this.SellerRegisterNum,
                SellerAddress: this.SellerAddress,
                SellerBank: this.SellerBank,
                Payee: this.Payee,
                Checker: this.Checker,
                NoteDrawer: this.NoteDrawer,
                Remarks: this.Remarks,
              }
            }
          }
        ).then(res => {

        })

      }

    }
  }

  let loading        //定义loading变量

  function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({ fullscreen: true,
      lock: true,
      text: '正在识别',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });

  }
  function endLoading() {    //使用Element loading-close 方法
    loading.close()
  }

</script>

<style scoped>
    .red{
      font-size: 25px;
      color: rgb(193, 46, 92);
      font-weight:500;
    }
    .station{
      font-size: 30px;
      font-weight:bold;
      text-align: center;
    }
    .arrow{
      text-align: center;
      font-weight:600;
      font-family:"微软雅黑";
    }
    .ticketfont{
      font-weight:600;
      color:black;
      border-width:1px; border-style:solid; border-color:black;
      background-color: lightcyan;
    }
    .smallfont{
      font-size:10px;
      font-weight:500;
    }

    .bor{
      border:2px dashed;
      text-align: center;
    }




    #train{
      height:800px;
    }

    .center{
      text-align:center;
    }


</style>
