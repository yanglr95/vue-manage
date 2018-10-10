<template>
  <div class="home-main ivu-card-body">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>提现</span>
      </div>
      <el-form label-width="80px" :model="formModel" style="width: 500px">
        <el-form-item label="银行卡">
          {{bankName(bankData.bankCode)}} {{safeBank(bankData.bankCardNo)}} 
        </el-form-item>
        <el-form-item label="提现金额">
          <el-input v-model="formModel.amount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提现</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { safeBank, bankName, httpPost } from '@/utils'

  export default {
    name: 'withdraw',
    components: {
    },
    methods: {
      safeBank,
      bankName,
      httpPost,
      onSubmit() {
        this.fullscreenLoading = true
        this.$store.dispatch('UserWithdraw', this.formModel).then((res) => {
          if (res.result) {
            httpPost(res.result.gatewayUrl, res.result)
            this.fullscreenLoading = false
          }
        }).catch((err) => {
          this.$message(err)
        })
      }
    },
    beforeCreate: function() {
      this.$store.dispatch('GetUserBankInfo').then((res) => {
        this.bankData = res
        this.formModel.bankCode = res.bankCode
      }).catch((err) => {
        this.$message(err)
      })
    },
    data() {
      return {
        bankData: '',
        formModel: {
          amount: '',
          bankCode: ''
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
</style>
