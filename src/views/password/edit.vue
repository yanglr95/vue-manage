<template>
  <div class="home-main ivu-card-body">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <el-form label-width="120px" :model="formModel" style="width: 500px">
        <el-form-item label="手机号">
          <el-input v-model="mobile" disabled></el-input>
        </el-form-item>
        <el-form-item label="短信验证码">
          <el-input v-model="formModel.smscode" style="width: 234px"></el-input>
          <sendCodeTpl :smsType="codeType" :smsMobile="mobile"></sendCodeTpl>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="formModel.password" :minlength="6"  :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            v-loading.fullscreen.lock="fullscreenLoading"
            >确定修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import sendCodeTpl from '@/views/components/sendcode'

  export default {
    name: 'withdraw',
    components: {
      sendCodeTpl
    },
    methods: {
      onSubmit() {
        const data = {
          type: this.codeType,
          mobile: this.mobile,
          smsCode: this.formModel.smscode,
          password: this.formModel.password
        }
        this.fullscreenLoading = true
        this.$store.dispatch('updateUserSetting', data).then((res) => {
          this.$store.dispatch('LogOut').then(() => {
            this.$alert('修改成功', '修改成功', {
              confirmButtonText: '确认',
              callback: action => {
                this.fullscreenLoading = false
                location.reload()
              }
            })
          })
        }).catch((err) => {
          this.fullscreenLoading = false
          this.$message(err)
        })
      }
    },
    beforeCreate: function() {
      this.$store.dispatch('GetUserInfo').then((res) => {
        this.mobile = res.mobile
      }).catch((err) => {
        this.$message(err)
      })
    },
    data() {
      return {
        fullscreenLoading: false,
        codeType: 'RESETPASSWORD',
        mobile: '',
        formModel: {
          smscode: '',
          password: ''
        }
      }
    }
  }
</script>
<style lang="scss">
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
