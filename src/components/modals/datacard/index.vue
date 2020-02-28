<template>
  <div>
    <a-row class="health-container" type="flex" justify="space-between">
      <a-col :span="6" class="left-container">
        <a-row style="position: relative">
          <a-row class="card-title">{{ $t('dashboard.all') }}</a-row>
          <a-row class="warn-word">{{ undeal }}<span style="font-size: 14px;">
            {{ $t('dashboard.items') }}
          </span></a-row>
            <a-row class="undeal-word" @click.native="jumpTo('/dealwarn')">
              <img class="right-arrow" src="../../../statics/img/home/right.png" />
              <a-row class="undeal">{{ $t('dashboard.pending') }}</a-row>
            </a-row>
         </a-row>

        <a-row class="warn-result">
          <span class="dealed" @click="jumpToDeal('dealed')">{{ deal }} {{ $t('dashboard.processed') }}</span> |
          <span class="dealed" @click="jumpToDeal('ignore')">{{ ignore }} {{ $t('dashboard.ignored') }}</span>
        </a-row>
      </a-col>
        <a-col :span="14" type="flex" style="display: flex">
            <index-card v-for="(item, key) in indexCardData" :item="item" :key="key"></index-card>
        </a-col>
        <a-col :span="3" class="sort-card">
            <a-row class="card-img" @click.native="jumpTo('/warnconfig')">
                <a-row>
                  <img src="../../../statics/img/home/sort.png">
                </a-row>
                <a-row class="card-word">{{ $t('dashboard.customCards') }}</a-row>
            </a-row>
        </a-col>
    </a-row>
  </div>
</template>

<script>
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import mixin from '../../../common/js/mixin'
import '../../../common/js/iconfont'
import defaultPic from '../../../statics/img/default.png'
import IndexCard from '../../../components/modals/indexcard/index';

export default {
  mixins: [mixin],
  props: {
    loading: {
      type: Boolean
    },
    indexCardData: {
      type: Array,
      default: []
    },
    undeal: {
      default: 0
    },
    deal: {
      default: 0
    },
    ignore: {
      default: 0
    },
  },
  methods: {
    // 跳转
    jumpToDeal(type) {
      this.$router.push({ name: 'dealwarn', params: { type } });
    }
  },
  components: {
    IndexCard
  }
}
</script>

<style lang="stylus" scoped>
   .health-container {
       width 100%;
       //右侧容器
       .left-container{
           text-align center
           height 170px
           border-radius 4px
           background-image url("../../../statics/img/home/total.png")
           box-shadow 0 1px 6px rgba(0, 0, 0, 0.2)
           .warn-word{
               height:48px;
               font-size:48px;
               font-family:PingFangSC-Medium,PingFang SC;
               font-weight:500;
               color:rgba(255,255,255,1);
               line-height:48px;
               position: absolute;
               left: 20px;
               top: 50px;
           }
           .undeal-word {
               font-size:14px;
               font-family:PingFangSC-Regular,PingFang SC;
               font-weight:400;
               color:rgba(255,255,255,1);
               line-height:14px;
               height:22px;
               background:rgba(255,255,255,1);
               position: absolute;
               left: 20px;
               top: 102px;
               border-radius:11px;
               .right-arrow {
                   float: right;
                   padding-right: 8px;
                   padding-top: 6px;
               }
               .undeal {
                   color: #F5222D;
                   width: 83px;
                   padding-top: 4px;
                   padding-left: 10px;
                   cursor : pointer;
               }
           }
           .card-title {
               width 32px
               height 16px
               font-size 16px
               font-family PingFangSC-Medium,PingFang SC
               font-weight 500
               color rgba(255,255,255,1)
               line-height 16px
               margin-top 20px;
               margin-left 20px;
           }
           .warn-result{
               height:14px;
               font-size:14px;
               font-family:PingFangSC-Regular,PingFang SC;
               font-weight:400;
               color:rgba(255,255,255,1);
               line-height:14px;
               position: absolute;
               left: 20px;
               bottom: 22px;
               // 已处理和已忽略的样式
               .dealed{
                   cursor pointer
               }
           }
       }

       .left-container:hover {
           box-shadow: 0 4px 15px 6px #d7dbe0;
       }
       .sort-card:hover {
           box-shadow: 0 4px 15px 6px #d7dbe0
       }
       .sort-card {
           box-shadow 0 1px 6px #CDD0D4
           background-color #fff
           text-align center
           height 170px
           border-radius 4px
           .card-img {
               cursor pointer
               width 80px
               margin 70px auto
           }
           .card-word{
               font-size:14px;
               font-family:PingFangSC-Regular,PingFang SC;
               font-weight:400;
               color:rgba(93,141,228,1);
               line-height:14px;
               padding-top : 10px;
           }
       }

   }
</style>
