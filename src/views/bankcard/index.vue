<template>
  <div class="home-main ivu-card-body">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>绑定银行卡</span>
      </div>
      <el-form ref="bankcardForm" :model="formModel" :rules="rules" label-width="120px" style="width: 460px">
        <el-form-item label="银行卡号" prop="bankcardNo">
          <el-input
            v-model="formModel.bankcardNo"
            placeholder="银行卡号"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit('bankcardForm')"
            v-loading.fullscreen.lock="fullscreenLoading"
            >绑定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { bindCard } from '@/api/dashboard'
  import { httpPost } from '@/utils'

  export default {
    name: 'bankcard',
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false
          }
          const data = {
            bankcardNo: this.formModel.bankcardNo
          }
          this.fullscreenLoading = true
          bindCard(data).then(response => {
            httpPost(response.url, response.result)
          }).catch(err => {
            this.$message.error(err)
          }).finally(() => {
            this.fullscreenLoading = false
          })
        })
      }
    },
    data() {
      return {
        fullscreenLoading: false,
        companyData: {},
        formModel: {
          bankcardNo: ''
        },
        bankList: [
          { name: '123银行', code: '1' },
          { name: '456银行', code: '2' },
          { name: '789银行', code: '3' }
        ],
        rules: {
          bankcardNo: [
            { required: true, message: '请输入银行卡号', trigger: 'blur' },
            { min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur' }
          ],
          bankcode: [
            { required: true, message: '请选择开户行', trigger: 'blur' }
          ]
        }
      }
    }
  }
</script>
<style>

</style>
