<template>
  <el-card class="result-wrap">
    <div v-if=errorMsg>
      <i class="el-icon-error icon-error"></i>
      <div class="txt-info">{{errorMsg}}</div>
    </div>
    <div v-else>
      <i class="el-icon-success icon-success"></i>
      <div class="txt-info">成功！</div>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'result',
    beforeCreate: function() {
      this.$store.dispatch('getCallBackResult').then((res) => {
        this.callBackData = res
      }).catch((err) => {
        // this.$message.error(err)
        console.error('error', err)
        this.errorMsg = err.message
      })
    },
    data() {
      return {
        callBackData: '',
        errorMsg: ''
      }
    }
  }
</script>
<style scoped>
  .result-wrap {
    text-align: center;
  }
  .icon-success {
    font-size: 50px;
    color: #67C23A;
  }
  .icon-error {
    font-size: 50px;
    color: #f56c6c;
  }
  .txt-info {
    font-size: 26px;
    color: #333333; 
    margin-top: 30px;
  }
</style>