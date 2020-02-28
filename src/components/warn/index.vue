<template>
  <a-row class="main-warn">
    <a-row class="warn" @click.native="jumpTo('/dealwarn')">
      <a-icon type="warning" theme="filled" class="warning-icon"/>
      <span class="first">{{ repetWarn.count }} {{ $t('dashboard.repeatWarn') }}</span>
      <span class="second">{{ time }}</span>
      <span class="pics">
        <img :src="item?item:defaultPic" alt=""
             v-for="(item, key) in repetWarn.headImg"
             :key="key"
        >
      </span>
    </a-row>
  </a-row>
</template>

<script>
import mixin from '../../common/js/mixin'
import defaultPic from '../../statics/img/default.png'

export default {
  mixins: [mixin],
  data() {
    return {
      defaultPic
    }
  },
  props: {
    repetWarn: {
      type: Object
    }
  },
  computed: {
    time() {
      if (this.repetWarn.time) {
        return this.formatTime(this.repetWarn.time);
      } else {
        return '0000-00-00 00:00:00'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .main-warn{
    .warn{
      cursor pointer
      height 40px
      line-height 40px
      color #fff
      background-color #F63842
      border-radius 2px
      .warning-icon{
        color #fff
        margin 0 24px
        font-size 16px
      }
      .first{
        font-size 16px
        font-family PingFangSC-Medium
        font-weight 500
      }
      .second{
        font-size 12px
        font-family PingFangSC-Medium
        font-weight 500
        padding-left 6px
        color rgba(255,255,255,50.28%)
      }
      .pics{
        float right
        position relative
        width 80px
        margin 8px 7px 0 17px
        img{
          width 24px
          height 24px
          border-radius 50%
          position absolute
        }
        img:nth-child(1){
          left 12px
        }
        img:nth-child(2){
          left 24px
        }
        img:nth-child(3){
          left 36px
        }
      }
    }
  }
</style>
