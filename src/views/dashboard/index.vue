<template>
  <div class="home-main ivu-card-body">
    <div v-if="!isAccount">
        <noAccount></noAccount>
    </div>
    <div v-else>
      <el-row>
        <el-col>
          <el-card shadow="hover">
            <p slot="title">
              <Icon type="pie-graph"></Icon>
              账户概览
            </p>
            <el-row :gutter="16">
              <el-col :span="3" class="col-title">
                账户余额
              </el-col>
              <el-col :span="6" class="col-title">{{formatNumber(companyData.amount, 2)}}元</el-col>
              <el-col :span="15">
                <el-button :disabled="!hasBankCard" type="primary" @click="rechargeLink" style="margin-right: 10px;">充值</el-button>
                <el-button :disabled="!hasBankCard" @click="withdrawLink" type="primary">提现</el-button></el-col>
            </el-row>
            <el-row :gutter="16" class="margin-top-20">
              <el-col :span="3" class="col-title">
                银行卡
              </el-col>
              <el-col :span="6" class="col-title">
                {{ hasBankCard ? bankName(companyData.bankcode) : '&nbsp;' }}
                {{ hasBankCard ? safeBank(companyData.bankcardNo) : '' }}
              </el-col>
              <el-col :span="15">
                <el-button
                  type="primary" style="margin-right: 10px;"
                  v-loading.fullscreen.lock="fullscreenLoading"
                  @click="bankCard">
                  {{ hasBankCard ? '解绑银行卡' : '绑定银行卡' }}</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="16" class="margin-top-20">
              <el-col :span="3" class="col-title">
                手机号
              </el-col>
              <el-col :span="6" class="col-title">{{mobile}}</el-col>
              <el-col :span="15"><el-button type="primary" @click="editMobile" style="margin-right: 10px;">修改手机号</el-button></el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="24">
          <el-card shadow="hover">
            <p slot="title">
              <Icon type="document-text"></Icon>
              企业信息
            </p>
            <el-row :gutter="16">
              <el-col :span="3">
                企业名称
              </el-col>
              <el-col :span="9">{{companyData.enterpriseName}}</el-col>
              <el-col :span="3">
                法人姓名
              </el-col>
              <el-col :span="9">{{companyData.legal}}</el-col>
            </el-row>
            <el-row :gutter="16" class="margin-top-20">
              <el-col :span="3">
                法人证件类型
              </el-col>
              <el-col :span="9">身份证</el-col>
              <el-col :span="3">
                法人证件号码
              </el-col>
              <el-col :span="9">{{companyData.legalIdCardNo}}</el-col>
            </el-row>
            <el-row :gutter="16" class="margin-top-20">
              <el-col :span="3">
                联系人姓名
              </el-col>
              <el-col :span="9">{{companyData.contact}}</el-col>
              <el-col :span="3">
                联系人手机号
              </el-col>
              <el-col :span="9">{{companyData.contactPhone}}</el-col>
            </el-row>
            <el-row :gutter="16" class="margin-top-20">
              <el-col :span="3">
                企业证件编码
              </el-col>
              <el-col :span="9">{{companyData.unifiedCode}}</el-col>
            </el-row>
            <el-row :gutter="16" class="margin-top-20">
              <el-button type="primary" style="margin-right: 10px;" v-loading.fullscreen.lock="fullscreenLoading" @click="companyEdit">企业信息修改</el-button>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
             <el-form-item label="交易类型">
              <el-select v-model="searchForm.type" placeholder="全部">
                <el-option label="全部" value=""></el-option>
                <el-option label="提现" value="CASH_DRAW"></el-option>
                <el-option label="充值" value="RECHARGE"></el-option>
                <el-option label="还代偿" value="REPAY_COMPENSATORY"></el-option>
                <el-option label="代偿" value="COMPENSATORY"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间">
              <el-col :span="11">
                <el-date-picker 
                  type="date" 
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择时间" v-model="searchForm.firstDateTime" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择时间" v-model="searchForm.lastDateTime" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="recordSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-tabs type="border-card">
        <el-tab-pane label="交易记录">
          <el-table
            v-loading="tableLoading"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="id"
              label="ID">
            </el-table-column>
            <el-table-column
              prop="date"
              label="时间">
              <template slot-scope="scope">
                {{scope.row.date | parseTime('{y}-{m}-{d} {h}:{i}')}}
              </template>
            </el-table-column>
            <el-table-column
              prop="pointTypeName"
              label="记录类型">
            </el-table-column>
            <el-table-column
              prop="fromUser"
              label="关联用户">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="金额">
              <template slot-scope="scope">
                {{formatNumber(scope.row.amount, 2)}}
              </template>
            </el-table-column>
            <el-table-column
              prop="balance"
              label="结余">
              <template slot-scope="scope">
                {{formatNumber(scope.row.balance, 2)}}
              </template>
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注">
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handlerPageChange"
            :page-sizes="[10, 20, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next"
            :total=totalCount
            class="pagination">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { safeBank, bankName, formatNumber, httpPost, parseTime } from '@/utils'
  import noAccount from './components/noAccount'

  export default {
    name: 'home',
    components: {
      noAccount
    },
    computed: {
      hasBankCard() {
        const { bankcardNo } = this.companyData
        return !!(bankcardNo && bankcardNo.length)
      },
      ...mapGetters([
        'mobile'
      ])
    },
    methods: {
      safeBank,
      bankName,
      formatNumber,
      httpPost,
      parseTime,
      handleSizeChange(val) {
        const _data = {
          pointType: this.searchForm.type,
          pointStartDate: this.searchForm.firstDateTime,
          pointEndDate: this.searchForm.lastDateTime,
          pageSize: val
        }
        this.tableLoading = true
        this.$store.dispatch('getCompanyRecord', _data).then((res) => {
          this.tableData = res.result
          this.totalCount = res.totalCount
          this.tableLoading = false
        }).catch((err) => {
          this.$message(err)
        })
      },
      handlerPageChange(val) {
        const _data = {
          pointType: this.searchForm.type,
          pointStartDate: this.searchForm.firstDateTime,
          pointEndDate: this.searchForm.lastDateTime,
          pageNumber: val
        }
        this.tableLoading = true
        this.$store.dispatch('getCompanyRecord', _data).then((res) => {
          this.tableData = res.result
          this.totalCount = res.totalCount
          this.tableLoading = false
        }).catch((err) => {
          this.$message(err)
        })
      },
      rechargeLink() {
        this.$router.push({ path: '/recharge' })
      },
      withdrawLink() {
        this.$router.push({ path: '/withdraw' })
      },
      editMobile() {
        this.$router.push({ path: '/mobile/edit' })
      },
      companyEdit() {
        this.fullscreenLoading = true
        this.$store.dispatch('companyEdit').then((res) => {
          if (res.result && res.url) {
            httpPost(res.url, res.result)
            this.fullscreenLoading = false
          }
        }).catch((err) => {
          this.fullscreenLoading = false
          this.$message(err)
        })
      },
      bankCard() {
        if (this.companyData.bankcardNo) {
          this.unBindCard()
        } else {
          this.$router.push({ path: '/bankcard' })
        }
      },
      unBindCard() {
        const data = {
          bankcode: this.companyData.bankcode,
          bankcardNo: this.companyData.bankcardNo
        }
        this.fullscreenLoading = true
        this.$store.dispatch('unBindCard', data).then((res) => {
          if (res.result && res.url) {
            httpPost(res.url, res.result)
            this.fullscreenLoading = false
          }
        }).catch((err) => {
          this.fullscreenLoading = false
          this.$message.error(err)
        })
      },
      recordSearch() {
        const _data = {
          pointType: this.searchForm.type,
          pointStartDate: this.searchForm.firstDateTime,
          pointEndDate: this.searchForm.lastDateTime
        }
        this.tableLoading = true
        this.$store.dispatch('getCompanyRecord', _data).then((res) => {
          this.tableData = res.result
          this.totalCount = res.totalCount
          this.tableLoading = false
        }).catch((err) => {
          this.$message.error(err)
        })
      }
    },
    beforeCreate: function() {
      const _data = {}
      this.$store.dispatch('getCompanyList').then((res) => {
        const { companyData: { result, isPassed }} = res
        this.companyData = result
        this.isAccount = isPassed
      }).catch((err) => {
        this.$message.error(err)
      })
      this.$store.dispatch('getCompanyRecord', _data).then((res) => {
        this.tableData = res.result
        this.totalCount = res.totalCount
      }).catch((err) => {
        this.$message.error(err)
      })
      this.$store.dispatch('getCallBackResult').then((res) => {
        if (res) {
          this.$alert(res.isError ? res.message : '成功', '结果', {
            confirmButtonText: '确定',
            callback: () => {
              this.$store.dispatch('updateResult')
            }
          })
        }
      }).catch((err) => {
        this.errorMsg = err.message
      })
    },
    data() {
      return {
        fullscreenLoading: false,
        companyData: {},
        tableLoading: false,
        isAccount: false,
        totalCount: 0,
        tableData: [],
        searchForm: {
          type: '',
          firstDateTime: '',
          lastDateTime: ''
        }
      }
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .col-title{
    line-height: 38px;
  }
  .pagination{
    float: right;
    padding: 20px 0;
  }
  .line{
    text-align: center;
  }
</style>
