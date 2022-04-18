<template>
    <div id="DoctorAppointment">
        <el-table
                ref="filterTable"
                :data="AllAccount"
                style="width: 100%"
                height="800">

            <el-table-column
                    prop="num"
                    label="编号"
                    sortable
                    width="180"
                    column-key="num">
            </el-table-column>

            <el-table-column
                    prop="name"
                    label="病人姓名"
                    width="150">
            </el-table-column>

            <el-table-column
                    prop="tel"
                    label="手机号">
            </el-table-column>

            <el-table-column
                    prop="time"
                    label="预约时间"
                    width="300">
            </el-table-column>

            <el-table-column
                    prop="choose"
                    label="状态"
                    width="180">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.choose === 0 ? 'info' : scope.row.choose === 1? 'success':'danger'"
                            disable-transitions>{{trans[scope.row.choose]}}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column
                    prop="tag"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" @click="agree(scope.row)">同意</el-button>
                    <el-button size="small" type="danger" @click="refuse(scope.row)">拒绝</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
  export default {
    name: 'DoctorAppointment',
    data () {
      return {
        AllAccount: [],
        checkTime: '',
        trans: {
          0: '待通过',
          1: '已通过',
          2: '不通过',
        },
        dialogVisible: false
      }
    },
    computed: {},
    mounted () {
      this.$axios({
        url: 'getDocsAppointment',
        method: 'post',
        data: {
          phone: this.$session.get('phone')
        }
      }).then(res => {
        this.AllAccount = res.data
        console.log(this.AllAccount)
      })
    },
    methods: {
      checkAppointment (row) {
        const date = row['time'].split(' ')[0]
        const btime = row['time'].split(' ')[1].split('-')[0]
        const etime = row['time'].split(' ')[1].split('-')[1]
        this.$axios({
          url: 'checkDocsAppointment',
          method: 'post',
          data: {
            appointmentNo: row['num'],
            doctorPhone: this.$session.get('phone'),
            date1: date + ' ' + btime,
            date2: date + ' ' + etime,
          }
        }).then(res => {
          this.checkTime = res.data
        })

      },
      async agree (row) {
        const date = row['time'].split(' ')[0]
        const btime = row['time'].split(' ')[1].split('-')[0]
        const etime = row['time'].split(' ')[1].split('-')[1]
        if (row['choose'] === 0 || row['choose'] === 2) {
          this.$axios({
            url: 'checkDocsAppointment',
            method: 'post',
            data: {
              appointmentNo: row['num'],
              doctorPhone: this.$session.get('phone'),
              date1: date + ' ' + btime,
              date2: date + ' ' + etime,
            }
          }).then(async res => {
            if (res.data === false) {
              this.$message({
                showClose: true,
                message: '预约时间冲突！',
                type: 'warning'
              })
              return false
            } else {
              await this.$axios({
                url: 'setDocsAppointment',
                method: 'post',
                data: {
                  num: row['num'],
                  state: 1
                }
              }).then(res => {
                this.$message({
                  showClose: true,
                  message: '选择成功！',
                  type: 'success'
                })
                row['choose'] = 1
              })
              return false
            }
          })
        }

        if (row['choose'] === 1) {
          this.$message({
            showClose: true,
            message: '您已经同意过了！',
            type: 'warning'
          })

        }
      },
      refuse (row) {
        this.$confirm('请确认操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          switch (row['choose']) {
            case 0:
              await this.$axios({
                url: 'setDocsAppointment',
                method: 'post',
                data: {
                  num: row['num'],
                  state: 2
                }
              }).then(res => {
                this.$message({
                  showClose: true,
                  message: '选择成功！',
                  type: 'success'
                })
                row['choose'] = 2
              })
              break
            case 1:
              await this.$axios({
                url: 'setDocsAppointment',
                method: 'post',
                data: {
                  num: row['num'],
                  state: 2
                }
              }).then(res => {
                this.$message({
                  showClose: true,
                  message: '选择成功！',
                  type: 'success'
                })
                row['choose'] = 2
              })
              break
            case 2:
              this.$message({
                showClose: true,
                message: '您已经拒绝过了！',
                type: 'warning'
              })
              break
            default:
              break
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      open () {

      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      }
    }
  }
</script>

<style scoped>

</style>