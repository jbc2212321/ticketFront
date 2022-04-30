<template>

    <div id="UploadCsv">
        <!--        action="http://localhost:8096/user/upload"-->
        <el-upload
                class="upload-demo"
                action="http://localhost:5000/invoice/vat_rec.do"
                accept=".jpeg,.png"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handle_success"
                :on-progress="handle_progress"
                :show-file-list="false"
                :beforeUpload="handle_progress"
                :on-exceed="handleExceed">
            <el-button id="initSlide" type="primary" @click="uploadImage">点击上传</el-button>
<!--            <el-button id="initSlide2" type="primary">重新识别</el-button>-->
            <!--            <div slot="tip" class="el-upload__tip">只能上传csv文件</div>-->
        </el-upload>

        <el-button type="text" @click=merge>识别结果展示</el-button>

<!--        <el-button type="text" @click="printImg">打印测试</el-button>-->


        <el-dialog :visible.sync="dialogTableVisible" width="1000px" top="10px">
            <div ref="exportPdf">
                <el-form model="form" class="form_class">
                    <div class="invoicMain">
                        <!-- head start -->
                        <div class="invoiceHeader">
                            <div class="invoiceHeader-left">
                                <ul class="headerLeft">

                                    <li>
                                        <!-- <img src="./qrcode.png" alt=""> -->
                                        <br>
                                        <br>
                                        <br>
                                        <br>
                                        <br>

                                    </li>
                                    <li>
                                        <label>机器编号：</label><span>{{MachineCode}}</span>
                                    </li>
                                </ul>
                                <div class="headerMiddle">
                                    <h1>{{InvoiceTypeOrg}}</h1>
                                    <div class="line"></div>
                                </div>
                            </div>

                            <ul class="headerRight">
                                <br><br>
                                <li>
                                    <label> 发票代码： </label><span>{{InvoiceCode}}</span>
                                </li>
                                <li>
                                    <label> 发票号码： </label><span>{{InvoiceNum}}</span>
                                </li>
                                <li>
                                    <label> 开票日期： </label><span>{{InvoiceDate}}</span>
                                </li>
                                <!--                    <li>-->
                                <!--                      <label> 校&nbsp;&nbsp;验&nbsp;&nbsp;码： </label><span>{{}}</span>-->
                                <!--                    </li>-->
                            </ul>
                        </div>
                        <!-- head end -->
                        <!-- invoice body start -->
                        <div class="invoiceBody">
                            <div class="userInfo">
                                <div class="buy">购买方</div>
                                <ul>
                                    <li>
                                        <label>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</label><span>{{PurchaserName}}</span>
                                    </li>
                                    <li>
                                        <label>纳税人识别号：</label><span>{{PurchaserRegisterNum}}</span>
                                    </li>
                                    <li>
                                        <label>地址、&nbsp;&nbsp;&nbsp;电话：</label><span>{{PurchaserAddress}}</span>
                                    </li>
                                    <li>
                                        <label>开户行及账号：</label><span>{{PurchaserBank}}</span>
                                    </li>
                                </ul>
                                <div class="password">密码区</div>
                                <div class="pwdInfo">{{Password}}</div>
                            </div>
                            <div>
                                <table class="GoodsTable" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="width: 24%">货物或应税劳务、服务名称</td>
                                        <td style="width: 10%">规格型号</td>
                                        <td style="width: 7%">单位</td>
                                        <td style="width: 10%">数量</td>
                                        <td style="width: 10%">单价</td>
                                        <td style="width: 16%">金额</td>
                                        <td style="width: 7%">税率</td>
                                        <td style="width: 16%; border-right: none;">税额</td>
                                    </tr>
                                    <tr class="invoice-list">
                                        <!--                        <table :data="CommodityName"></table>-->
                                        <td>{{CommodityName}}</td>
                                        <td>{{CommodityType}}</td>
                                        <td>{{CommodityUnit}}</td>
                                        <td>{{CommodityNum}}</td>
                                        <td>{{CommodityPrice}}</td>
                                        <td style="text-align:right;white-space:pre">{{CommodityAmount}}</td>
                                        <td style="text-align:right">{{CommodityTaxRate}}</td>
                                        <td style="text-align:right;white-space:pre">{{CommodityTax}}</td>
                                    </tr>


                                    <tr class="total">
                                        <td>合计</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{{TotalAmount}}</td>
                                        <td></td>
                                        <td>{{TotalTax}}</td>
                                    </tr>
                                    <tr class="GoodsTotal">
                                        <td>价税合计(大写)</td>
                                        <td colspan="7">
                                            <div style="width: 100%;display:flex">
                                                <div type="text" style="width: 60%">{{AmountInWords}}</div>

                                                <div type="text" style="width: 30%"> (小写){{AmountInFiguers}}</div>
                                            </div>

                                        </td>
                                    </tr>
                                </table>
                                <div class="userInfo">
                                    <div class="buy">购买方</div>
                                    <ul>
                                        <li>
                                            <label>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</label><span>{{SellerName}}</span>
                                        </li>
                                        <li>
                                            <label>纳税人识别号：</label><span>{{SellerRegisterNum}}</span>
                                        </li>
                                        <li>
                                            <label>地址、&nbsp;&nbsp;&nbsp;电话：</label><span>{{SellerAddress}}</span>
                                        </li>
                                        <li>
                                            <label>开户行及账号：</label><span>{{PurchaserBank}}</span>
                                        </li>
                                    </ul>
                                    <div class="password">备注</div>
                                    <div class="pwdInfo">{{Remarks}}</div>
                                </div>
                            </div>

                        </div>
                        <!-- invoice body start -->
                        <ul class="invoicetFooter">
                            <li>
                                <label>收款人：{{Payee}}</label>
                            </li>
                            <li>
                                <label>复核：{{Checker}}</label>
                            </li>
                            <li>
                                <label>开票人：{{NoteDrawer}}</label>
                            </li>
                            <li>
                                <label>销售方：（章）</label>
                            </li>
                        </ul>
                    </div>
                </el-form>
                <br>
                <el-col :span="8" :offset="11">
                    <el-button type="primary" round @click="saveTicket">确认并保存</el-button>
                    <!--              <el-button type="primary" round v-print="'#printTest'">打 印</el-button>-->
<!--                    <el-button type="primary" @click="toImg">打印</el-button>-->
                </el-col>
                <br></div>
        </el-dialog>
        <br>
        机器编号：
        <input type="text" name="MachineCode" v-model="MachineCode" border="0px">
        发票类型：
        <input type="text" name="InvoiceTypeOrg" v-model="InvoiceTypeOrg"><br>
        发票代码：
        <input type="text" name="InvoiceCode" v-model="InvoiceCode" size="18">
        发票号码：
        <input type="text" name="InvoiceNum" v-model="InvoiceNum" size="18">
        开票日期：
        <input type="text" name="InvoiceDate" v-model="InvoiceDate" size="18">
        <br>购买方:<br>
        名&nbsp;称：<input type="text" name="PurchaserName" v-model="PurchaserName">
        纳税人识别号：
        <input type="text" name="PurchaserRegisterNum" v-model="PurchaserRegisterNum">
        地址、&nbsp;电话：
        <input type="text" name="PurchaserAddress" v-model="PurchaserAddress">
        开户行及账号：
        <input type="text" name="PurchaserBank" v-model="PurchaserBank"><br>
        密码区：
        <el-input type="text" v-model="Password" rows="4"></el-input>
        合计：
        <el-input type="text" v-model="TotalAmount" rows="4"></el-input>
        <el-input type="text" v-model="TotalTax" rows="4"></el-input>
        <td>价税合计(大写)</td>
        <div type="text" style="width: 60%"><input type="text" name="AmountInWords" v-model="AmountInWords" size="40">
        </div>
        <div type="text" style="width: 40%"> (小写)</div>
        <input type="text" name="AmountInFiguers" v-model="AmountInFiguers"
               size="40">


        <br>销售方:<br>

        名&nbsp;称：
        <input type="text" name="SellerName" v-model="SellerName">

        纳税人识别号：<input type="text" name="SellerRegisterNum" v-model="SellerRegisterNum">

        地址、&nbsp;电话：<input type="text" name="SellerAddress" v-model="SellerAddress">

        开户行及账号：<input type="text" name="PurchaserBank" v-model="PurchaserBank">

        <br>备注：<br>
        <el-input type="text" v-model="Remarks" rows="4"></el-input>

        收款人：<input type="text" name="Payee" v-model="Payee">

        复核：<input type="text" name="Checker" v-model="Checker">

        开票人：<input type="text" name="NoteDrawer" v-model="NoteDrawer">


        <template>
            <div class="tableDate">
                <div class="button" style="width:3%;float:right;">
                    <P>
                        <el-button class="el-icon-plus" @click.prevent="addRow()"></el-button>
                    </P>
                    <p>
                        <el-button class="el-icon-minus" @click.prevent="delData()"></el-button>
                    </p>
                </div>
                <div class="table">
                    <el-table
                            :data="tableData"
                            ref="table"
                            tooltip-effect="dark"
                            border
                            stripe
                            style="width: 95%"
                            @selection-change='selectRow'>
                        <el-table-column type="selection" width="45" align="center"></el-table-column>
                        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
                        <el-table-column label="货物或应税劳务、服务名称" align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.CommodityName"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="规格型号">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.CommodityType"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="单位">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.CommodityUnit"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="数量">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.CommodityNum"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="单价">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.CommodityPrice"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="金额">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.CommodityAmount"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="税率">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.CommodityTaxRate"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="税额">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.CommodityTax"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </template>

    </div>
</template>


<script>
  import html2canvas from 'html2canvas' // 转为图片
  import { Loading } from 'element-ui';
  import printJS from 'print-js' // 打印
  export default {
    name: 'Upload',
    data () {
      return {
        tableData: [],
        selectlistRow: [],

        //发票数据
        InvoiceCode: '',
        MachineCode: '',
        InvoiceTypeOrg: 'XX省增值税专用发票',
        InvoiceNum: '',
        InvoiceDate: '',
        PurchaserName: '',
        PurchaserRegisterNum: '',
        PurchaserAddress: '',
        PurchaserBank: '',
        Password: '',
        CommodityName: '',
        CommodityType: '',
        CommodityUnit: '',
        CommodityNum: '',
        CommodityPrice: '',
        CommodityAmount: '',
        TotalAmount: '',
        CommodityTaxRate: '',
        CommodityTax: '',
        TotalTax: '',
        AmountInWords: '',
        AmountInFiguers: '',
        SellerName: '',
        SellerRegisterNum: '',
        SellerAddress: '',
        SellerBank: '',
        Payee: '',
        Checker: '',
        NoteDrawer: '',
        Remarks: '',
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
      // toImg () { // 转图片打印
      //   html2canvas(this.$refs.exportPdf, {
      //     backgroundColor: '#ffffff',
      //     useCORS: true,
      //     width: 960,
      //     height: 590,
      //     windowHeight: 1250,
      //     y: 0
      //   }).then((canvas) => {
      //     const url = canvas.toDataURL()
      //     this.img = url
      //     this.ticketImg = url
      //     // console.log(url)
      //   })
      // },

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
        console.log('整个;',this.tableData.length)
        // if(this.tableData.length)
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
          console.log('AmountInFiguers:', res.data.AmountInFiguers)
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
          // this.CommodityName = res.data.CommodityName
          // this.CommodityType = res.data.CommodityType
          // this.CommodityUnit = res.data.CommodityUnit
          // this.CommodityNum = res.data.CommodityNum
          // this.CommodityPrice = res.data.CommodityPrice
          // this.CommodityAmount = res.data.CommodityAmount
          this.TotalAmount = res.data.TotalAmount
          // this.CommodityTaxRate = res.data.CommodityTaxRate
          // this.CommodityTax = res.data.CommodityTax
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

      saveTicket: async function () {
        console.log('userId:', this.$session.get('userId'))
        console.log('imageName:', this.imageName)
        await html2canvas(this.$refs.exportPdf, {
          backgroundColor: '#ffffff',
          useCORS: true,
          width: 960,
          height: 590,
          windowHeight: 1250,
          y: 0
        }).then((canvas) => {
          const url = canvas.toDataURL()
          this.img = url
          this.ticketImg = url
          // console.log(url)
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
          if (res.data.code===0){
            this.$message({
              showClose: true,
              message: '保存成功！',
              type: 'success'
            })
          }
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
    .rright {: align = "right"
    }

    .btn {
        width: 16em;
        margin-left: 0rem;
        margin-top: 0rem;
        text-align: center;
    }

    #wsInputDiv {
        width: 18em;
        opacity: 0.7;
    }

    .result-item {
        list-style: none;
        padding: 0;
        position: relative;
        margin: 0 0 14px;
        overflow: hidden
    }

    .form-control, .result-name {
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
        color: #333;
        line-height: 20px
    }

    .result-name {
        width: 90px;
    }

    .form-control {
        width: 196px;
    }

    #UploadCsv {
        padding: 20px 0 0 20px;
    }

    #ul,
    ul li {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    label {
        color: #9c5223;
    }

    .invoicMain {
        white-space: pre-line;
        /*千万不要删*/
        width: 920px;
        margin: 0 auto;
        font-size: 14px;
        color: #000;
        padding: 20px;
        border: 3px solid #000;
    }

    .invoiceHeader {
        height: 126px;
        display: flex;
        /* justify-content: space-between; */
        align-items: center;
    }

    .headerLeft li:nth-child(1) {
        text-indent: 1em;
    }

    .headerLeft li img {
        width: 105px;
        height: 105px;

    }

    .headerMiddle h1 {
        font-size: 32px;
        color: #9c5223;
        font-family: 'kaiti';
        margin: 5px 12px;
    }

    .line {
        height: 2px;
        border-top: #9c5223 1px solid;
        border-bottom: #9c5223 1px solid;
    }

    .headerRight li {
        line-height: 24px;
    }

    .invoiceBody {
        border: 1px solid #9c5223;
    }

    .userInfo {
        width: 100%;
        display: flex;
        align-items: center;
        height: 96px;
        border-bottom: 1px solid #9c5223;
    }

    .userInfo ul {
        width: 50%;
        margin: 0 5px;
        padding: 0;

    }

    .userInfo ul li {
        line-height: 24px;
    }

    .buy {
        width: 20px;
        border-right: 1px solid #9c5223;
        padding: 0 10px;
        text-align: center;
        height: 100%;
        display: flex;
        align-items: center;
        color: #9c5223;
    }

    .password {
        width: 20px;
        padding: 0 10px;
        border-right: 1px solid #9c5223;
        border-left: 1px solid #9c5223;
        text-align: center;
        height: 100%;
        display: flex;
        align-items: center;
        color: #9c5223;
    }

    .pwdInfo {
        flex: 1;
        padding-left: 5px;
    }

    .goodsInfo {
        height: 210px;
        margin: 0;
        padding: 0;

    }

    .goodsInfo li {
        display: flex;
        color: #9c5223;
        text-align: center;
    }

    .name {
        width: 260px;
        border-right: 1px solid #9c5223;
    }

    .spec {
        width: 140px;
        border-right: 1px solid #9c5223;
    }

    .qty {
        width: 108px;
        border-right: 1px solid #9c5223;
    }

    .unit,
    .taxRate {
        width: 65px;
        border-right: 1px solid #9c5223;
    }

    .qty,
    .price {
        width: 160px;
        border-right: 1px solid #9c5223;
    }

    .money {
        flex: 1;
        border-right: 1px solid #9c5223;
    }

    .taxAmount {
        flex: 1;
    }

    .GoodsTable {
        height: 210px;
        width: 100%;
        border-collapse: collapse;
    }

    .GoodsTable .invoice-list {
        /* height: 24px; */
    }

    .GoodsTable td {
        border-right: 1px solid #9c5223;
        color: #9c5223;
    }

    .GoodsTable tr:nth-child(1),
    .GoodsTable tr:nth-last-child(2) {
        height: 24px;
    }

    .GoodsTable tr:nth-last-child(1) {
        height: 34px;
    }

    .GoodsTable tr:nth-child(1) td {
        text-align: center;
    }

    .GoodsTotal {
        border-top: 1px solid #9c5223;
        border-bottom: 1px solid #9c5223;
    }

    .total td:nth-child(1) {
        text-align: center;
    }

    .invoicetFooter {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
    }

    .invoicetFooter li {
        width: 25%;
    }

    .invoiceHeader-left {
        width: 67%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .headerRight {
        margin-left: 28px;
    }

    .headerMiddle {
        margin-right: 15px;
    }
    #UploadCsv{
      height:800px
    }
</style>
