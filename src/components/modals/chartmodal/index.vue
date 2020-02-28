<template>
  <div class="main">
    <div class="scroll">
      <a-row v-for="(item, key) in data" :key="key" class="line">
        <a-col  :span="14" class="left">
          <img :src="item.headImg?item.headImg:defaultPic" alt="" class="head-img">
          {{item.userName}}
        </a-col>
        <a-col  :span="8" class="right">{{item.value}}{{ unit }}</a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import defaultPic from '../../../statics/img/default.png'

export default {
  data() {
    return {
      defaultPic
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    },
    unit: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus">
  .main{
    height 420px
    overflow hidden
    // 超出滑动
    .scroll{
      overflow-y scroll
      height 430px
    }
    // 头像
    .head-img{
      width 24px
      height 24px
      vertical-align middle
      border-radius 50%
    }
    // 每一行
    .line{
      height 37px
      line-height 37px
      .right{
        text-align right
      }
    }
  }
</style>
