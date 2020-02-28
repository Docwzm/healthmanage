<template>
  <div class="index-card">
       <a-row class="card-title">
           {{$t(item.title)}}
       </a-row>
      <div class="card-left" @click="jumpTo('/dealwarn')">
          <a-row class="card-number">{{item.undeal}}</a-row>
          <a-row class="card-deal">{{$t('dashboard.itemsPending')}}</a-row>
      </div>
      <div class="card-right" v-bind:style="{backgroundImage:'url(' + item.backImg + ')'}">
      </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import mixin from '../../../common/js/mixin'
import '../../../common/js/iconfont'

export default {
  mixins: [mixin],
  props: {
    item: null
  }
}
</script>

<style lang="stylus" scoped>
    .index-card {
        margin-right 14px
        border-radius 4px
        background-color #fff
        text-align center
        flex 1
        position relative
        height 170px
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
        &:last-of-type {
            margin-right 0
        }
    }
    .index-card:hover {
        box-shadow: 0 4px 15px 6px #d7dbe0;
    }
 .card-title {
     height 16px;
     font-size 16px;
     font-family PingFangSC-Regular,PingFang SC;
     font-weight 400;
     color rgba(0,0,0,1);
     line-height 16px;
     margin-top 20px;
     margin-left 13px;
     text-align left;
 }
 .card-left {
     cursor : pointer;
     float: left;
     margin-top: 62px;
     height: 42%;
     position relative
     .card-number {
         height: 34px;
         font-size: 34px;
         font-family: PingFangSC-Medium,PingFang SC;
         font-weight: 500;
         color: rgba(0,0,0,1);
         line-height: 34px;
         position absolute
         left 20px;
         bottom 40px;
     }
     .card-deal {
         width: 58px;
         height: 14px;
         font-size: 14px;
         font-family: PingFangSC-Regular,PingFang SC;
         font-weight: 400;
         color: rgba(0,0,0,.65);
         line-height: 14px;
         position absolute;
         left 20px;
         bottom 22px;
     }
 }
 .card-right {
     width 77px
     height 83px
     position absolute
     right 0
     bottom -1px
     border-radius 4px
 }

</style>
