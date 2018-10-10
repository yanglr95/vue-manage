<template>
  <el-button type="warning" plain @click="sendSms" :disabled="isDisabled" style="width: 140px" >{{sendTxt}}</el-button>
</template>

<script>
  export default {
    name: 'sendcode',
    props: ['smsType', 'smsMobile', 'clearType'],
    data() {
      return {
        sendTxt: '获取短信验证码',
        isDisabled: false,
        isSend: false,
        count: 60
      }
    },
    methods: {
      sendSms(element) {
        var that = this
        var num = that.count
        var timer = setInterval(function() {
          num--
          that.sendTxt = num + '秒后重新获取'
          that.isDisabled = true
          if (num === 0) {
            that.sendTxt = '获取短信验证码'
            that.isDisabled = false
            clearInterval(timer)
          }
        }, 1000)
        const _data = {
          type: this.smsType,
          mobile: this.smsMobile
        }
        this.loading = true
        this.$store.dispatch('SendSmsCode', _data).then((res) => {
          this.loading = false
        }).catch(() => {
          clearInterval(timer)
          this.loading = false
        })
      }
    }
  }
</script>
