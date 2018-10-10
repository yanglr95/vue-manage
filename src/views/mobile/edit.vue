<template>
  <el-row>
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>修改手机号</span>
        </div>
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
        </el-steps>
        <div v-if=!active>
          <el-form label-width="120px" :model="formModel" :rules="rules" ref="oldForm" style="width: 500px;margin: 40px 0 0">
            <el-form-item label="手机号">
              <el-input v-model="formModel.mobile" disabled></el-input>
            </el-form-item>
            <el-form-item label="短信验证码" prop="oldSmsCode">
              <el-input v-model="formModel.oldSmsCode" :maxlength="6" style="width: 234px"></el-input>
              <sendCodeTpl :smsType="oldType" :smsMobile="formModel.mobile"></sendCodeTpl>
            </el-form-item>
          </el-form>
          <el-button style="margin: 14px 0 0 120px;width: 160px;" @click="next" type="primary">下一步</el-button>
        </div>
        <div v-else-if="active===1">
          <el-form label-width="120px" :model="newMobile" ref="newMobile" :rules="newRules" style="width: 500px;margin: 40px 0 0">
            <el-form-item label="手机号" prop="newsMobile">
              <el-input v-model="newMobile.newsMobile" required :maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="短信验证码" prop="smscode">
              <el-input v-model="newMobile.smscode" :maxlength="6" style="width: 234px"></el-input>
              <newSendCodeTpl :smsType="newType" :smsMobile="newMobile.newsMobile"></newSendCodeTpl>
            </el-form-item>
          </el-form>
          <el-button style="margin: 14px 0 0 120px;width: 160px;" @click="bindNewMobile" type="primary">确定修改</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import sendCodeTpl from '@/views/components/sendcode'
  import newSendCodeTpl from '@/views/components/newSendCode'

  export default {
    components: {
      sendCodeTpl,
      newSendCodeTpl
    },
    data() {
      return {
        active: 0,
        oldType: 'CHECKOLDMOBILE',
        newType: 'UPDATEMOBILE',
        formModel: {
          mobile: '',
          oldSmsCode: ''
        },
        newMobile: {
          newsMobile: '',
          smscode: ''
        },
        rules: {
          oldSmsCode: [
            { required: true, message: '请输入短信验证码', trigger: 'blur' }
          ]
        },
        newRules: {
          newsMobile: [
            { required: true, message: '请输入新手机号', trigger: 'blur' }
          ],
          smscode: [
            { required: true, message: '请输入短信验证码', trigger: 'blur' }
          ]
        }
      }
    },
    beforeCreate: function() {
      this.$store.dispatch('GetUserInfo').then((res) => {
        this.formModel.mobile = res.mobile
      }).catch((err) => {
        this.$message(err)
      })
    },
    methods: {
      next() {
        var that = this
        const data = {
          type: this.oldType,
          mobile: this.formModel.mobile,
          smsCode: this.formModel.oldSmsCode
        }
        this.fullscreenLoading = true
        this.$refs.oldForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('updateUserSetting', data).then((res) => {
              this.fullscreenLoading = false
              if (that.active++ > 2) that.active = 0
            }).catch((err) => {
              this.fullscreenLoading = false
              this.$message(err)
            })
          }
        })
      },
      bindNewMobile() {
        const data = {
          type: this.newType,
          mobile: this.newMobile.newsMobile,
          smsCode: this.newMobile.smscode
        }
        this.fullscreenLoading = true
        this.$refs.newMobile.validate(valid => {
          if (valid) {
            this.$store.dispatch('updateUserSetting', data).then((res) => {
              this.fullscreenLoading = false
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.$store.dispatch('LogOut').then(() => {
                location.reload()
              })
            }).catch((err) => {
              this.fullscreenLoading = false
              this.$message(err)
            })
          }
        })
      }
    }
  }
</script>
