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
                action="http://localhost:8096/user/upload"
                accept=".jpeg,.png"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handle_success"
                :show-file-list="false"
                :beforeUpload="beforeAvatarUpload"
                :on-exceed="handleExceed">
            <el-button id="initSlide" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
        </el-upload>

        <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>
        <el-form model="form" :rules="rules" class="form_class">
        <el-dialog  :visible.sync="dialogTableVisible" width="1000px" top="10px">
            <div class="invoicMain">
                <!-- head start -->
                <div class="invoiceHeader">
                    <div class="invoiceHeader-left">
                        <ul class="headerLeft">
                            <li>
                                <!-- <img src="./qrcode.png" alt=""> -->
                                <br>
                                <br>
                                <br><br><br>
                            </li>
                            <li>
                                <label>机器编号：</label>
                                <label>
                                    <input type="text" name="MachineCode" v-model="MachineCode"  border="0px" >
                                </label>
                            </li>
                        </ul>
                        <div class="headerMiddle">
                            <h1><input type="text" name="InvoiceTypeOrg" v-model="InvoiceTypeOrg"></h1>
                            <div class="line"></div>
                        </div>
                    </div>

                    <ul class="headerRight">
                        <br><br>
                        <li>
                            <label>发票代码：</label>
                            <input type="text" name="InvoiceCode" v-model="InvoiceCode" size="18">
                        </li>
                        <li>
                            <label>发票号码：</label>
                            <input type="text" name="InvoiceNum" v-model="InvoiceNum" size="18">
                        </li>
                        <li>
                            <label>开票日期：</label>
                            <input type="text" name="InvoiceDate" v-model="InvoiceDate" size="18">
                        </li>
<!--                        <li>-->
<!--                            <label> 校&nbsp;&nbsp;验&nbsp;&nbsp;码： </label><span>11111 22222 33333 44444</span>-->
<!--                        </li>-->
                    </ul>
                </div>
                <!-- head end -->
                <!-- invoice body start -->
                <div class="invoiceBody">
                    <div class="userInfo">
                        <div class="buy">购买方</div>
                        <ul>
                            <li>
                                <label>名&nbsp;称：</label><input type="text" name="PurchaserName" v-model="PurchaserName">
                            </li>
                            <li>
                                <label>纳税人识别号：</label><input type="text" name="PurchaserRegisterNum" v-model="PurchaserRegisterNum">
                            </li>
                            <li>
                                <label>地址、&nbsp;&nbsp;&nbsp;电话：</label><input type="text" name="PurchaserAddress" v-model="PurchaserAddress">
                            </li>
                            <li>
                                <label>开户行及账号：</label><input type="text" name="PurchaserBank" v-model="PurchaserBank">
                            </li>
                        </ul>
                        <div class="password">密码区</div>
                        <el-input type="textarea" v-model="Password" rows="4"></el-input>
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
                                <td><el-input type="textarea" v-model="CommodityName" rows="5"></el-input></td>
                                <td><el-input type="textarea" v-model="CommodityType" rows="5"></el-input></td>
                                <td><el-input type="textarea" v-model="CommodityUnit" rows="5"></el-input></td>
                                <td><el-input type="textarea" v-model="CommodityNum" rows="5"></el-input></td>
                                <td><el-input type="textarea" v-model="CommodityPrice" rows="5"></el-input></td>
                                <td><el-input type="textarea" v-model="CommodityAmount" rows="5"></el-input></td>
                                <td><el-input type="textarea" v-model="TotalAmount" rows="5"></el-input></td>
                                <td><el-input type="textarea" v-model="CommodityTaxRate" rows="5"></el-input></td>
                            </tr>


                            <tr class="total">
                                <td>合计</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><el-input type="textarea" v-model="TotalAmount" rows="1"></el-input></td>
                                <td></td>
                                <td><el-input type="textarea" v-model="TotalTax" rows="1"></el-input></td>
                            </tr>
                            <tr class="GoodsTotal">
                                <td>价税合计(大写)</td>
                                <td colspan="7">
                                    <div style="width: 100%;display:flex">
                                        <div type="text" style="width: 60%" ><input type="text" name="AmountInWords" v-model="AmountInWords" size="40"></div>

                                        <div type="text" style="width: 40%" > (小写)</div><input type="text" name="AmountInFiguers" v-model="AmountInFiguers" size="40">
                                    </div>

                                </td>
                            </tr>
                        </table>
                        <div class="userInfo">
                            <div class="buy">销售方</div>
                            <ul>
                                <li>
                                    <label>名&nbsp;称：</label><input type="text" name="SellerName" v-model="SellerName">
                                </li>
                                <li>
                                    <label>纳税人识别号：</label><input type="text" name="SellerRegisterNum" v-model="SellerRegisterNum">
                                </li>
                                <li>
                                    <label>地址、&nbsp;&nbsp;&nbsp;电话：</label><input type="text" name="SellerAddress" v-model="SellerAddress">
                                </li>
                                <li>
                                    <label>开户行及账号：</label><input type="text" name="PurchaserBank" v-model="PurchaserBank">
                                </li>
                            </ul>
                            <div class="password">备注</div>
                            <div class="pwdInfo"><el-input type="textarea" v-model="Remarks" rows="4"></el-input></div>
                        </div>
                    </div>

                </div>
                <!-- invoice body start -->
                <ul class="invoicetFooter">
                    <li>
                        <label>收款人：</label><input type="text" name="Payee" v-model="Payee">

                    </li>
                    <li>
                        <label>复核：</label><input type="text" name="Checker" v-model="Checker">
                    </li>
                    <li>
                        <label>开票人：</label><input type="text" name="NoteDrawer" v-model="NoteDrawer">
                        <label>销售方：（章）</label>
                    </li>
                </ul>
            </div>

        </el-dialog></el-form>
    </div>
</template>

<script>
  export default {
    name: 'UploadCsv',
    data () {
      return {
        //发票数据
        InvoiceCode:'',
        MachineCode:'123',
        InvoiceTypeOrg:'',
        InvoiceNum:'',
        InvoiceDate:'',
        PurchaserName:'123',
        PurchaserRegisterNum:'',
        PurchaserAddress:'',
        PurchaserBank:'',
        Password:'',
        CommodityName:'',
        CommodityType:'',
        CommodityUnit:'',
        CommodityNum:'',
        CommodityPrice:'',
        CommodityAmount:'',
        TotalAmount:'',
        CommodityTaxRate:'',
        CommodityTax:'',
        TotalTax:'',
        AmountInWords:'',
        AmountInFiguers:'',
        SellerName:'',
        SellerRegisterNum:'',
        SellerAddress:'',
        SellerBank:'',
        Payee:'',
        Checker:'',
        NoteDrawer:'',
        Remarks:'',

        dialogTableVisible: false,
        url: '',
        api:"user/upload",
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
        const isLt2M = file.size / 1024 / 1024/100 < 1
        if (!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 100MB!',
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
    .invoiceHeader-left{
        width: 67%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .headerRight{
        margin-left: 28px;
    }
    .headerMiddle{
        margin-right: 15px;
    }
</style>
