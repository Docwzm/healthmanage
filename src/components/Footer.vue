<template>
  <div class="main">
<!--    <a-row type="flex" justify="center" >-->
<!--      <span class="footer-item"><a href="#">帮助</a></span>-->
<!--      <span class="footer-item"><a href="#">隐私</a></span>-->
<!--      <span class="footer-item"><a href="#">条款</a></span>-->
<!--    </a-row>-->
    <a-row class="copy-right">
      Copyright © 2019 {{ this.$t('footer.name') }}
    </a-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
  .main{
    height 50px
    text-align center
    color rgba(0,0,0,0.45)
    // 第一行
    .footer-item{
      width 80px
      a{
        color rgba(0,0,0,0.45)
      }
    }
    // 第二行
    .copy-right{
      margin-top 10px
    }
  }
</style>
