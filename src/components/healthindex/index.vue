<template>
  <div>
    <a-row class="health-container" type="flex" justify="space-between">
      <!--左侧部分-->
        <a-col  class="left-container">
          <a-spin :spinning="loading">
            <a-row class="bmi-container" type="flex" justify="space-between">
              <a-col class="title">
                <span class="unit-title">{{ $t('dashboard.healthIndex') }}</span>
                {{ $t('dashboard.updateTime') }} {{ currentTime }}
              </a-col>
              <a-col class="more" @click="jumpTo('healthanalysis')">{{ $t('dashboard.viewMore') }}</a-col>
            </a-row>

            <a-row class="bmi-detail" type="flex" justify="space-between">
              <a-col  class="left-box">
                <!--图表-->
                <div id="health" class="health"></div>
                <!--分数详情-->
                <a-row type="flex" justify="space-around" style="padding-left: 5px">
                  <a-col class="score-res"><span class="point color1"></span><span class="score-range">0-60 {{ $t('dashboard.scores') }} </span> | {{five}}%</a-col>
                  <a-col class="score-res"><span class="point color2"></span><span class="score-range">60-70 {{ $t('dashboard.scores') }} </span> | {{four}}%</a-col>
                  <a-col class="score-res"><span class="point color3"></span><span class="score-range">70-80 {{ $t('dashboard.scores') }} </span> | {{three}}%</a-col>
                </a-row>
                <a-row type="flex" justify="space-around" style="padding-left: 5px">
                  <a-col class="score-res"><span class="point color4"></span><span class="score-range">80-90 {{ $t('dashboard.scores') }} </span> | {{two}}%</a-col>
                  <a-col class="score-res"><span class="point color5"></span><span class="score-range">90-100 {{ $t('dashboard.scores') }} </span> | {{one}}%</a-col>
                  <a-col class="score-res"></a-col>
                </a-row>
              </a-col>
              <a-col class="right-box">
                <a-row class="index-title" type="flex" justify="space-between">
                  <a-col>{{ $t('dashboard.healthIndex') }}</a-col>
                  <a-col>
                    <svg class="icon" aria-hidden="true" @click="sortData">
                      <use :xlink:href="desc?'#icon-desc':'#icon-desc1'"></use>
                    </svg>
                  </a-col>
                </a-row>
                <a-row class="content-box">
                  <a-row class="index-line" type="flex" justify="space-between" v-for="(item, key) in score" :key="key">
                    <a-col>
                      <img :src="item.headImg?item.headImg:defaultPic" alt="" class="head-img">
                      {{item.userName}}
                    </a-col>
                    <a-col class="score">
                      {{item.value}} {{$t('dashboard.scores')}}
                    </a-col>
                  </a-row>
                </a-row>
              </a-col>
            </a-row>
          </a-spin>
        </a-col>
    </a-row>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import mixin from '../../common/js/mixin'
import '../../common/js/iconfont'
import defaultPic from '../../statics/img/default.png'

export default {
  mixins: [mixin],
  props: {
    loading: {
      type: Boolean
    },
    score: {
      type: Array,
      default: []
    },
    one: {
      default: 0
    },
    two: {
      default: 0
    },
    three: {
      default: 0
    },
    four: {
      default: 0
    },
    five: {
      default: 0
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
  data() {
    return {
      desc: true,
      defaultPic
    }
  },
  methods: {
    // 健康指数饼图
    health(title, seriesName, detail, sumPeople) {
      let myChart = echarts.init(document.getElementById('health'));
      myChart.setOption({
        title: {
          text: title,
          textStyle: {
            color: 'rgba(0,0,0,0.3)',
            fontSize: 10,
            align: 'center'
          },
          x: 'center',
          y: '35%',
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: seriesName,
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'center',
                color: '#6b6b6b',
                formatter: `{b|${sumPeople}}{c| ${this.$t('dashboard.ren')}}`,
                rich: { // 为中间文字添加样式
                  b: {
                    paddingTop: 2,
                    fontSize: 18,
                    color: '#666'
                  },
                  c: {
                    paddingTop: 2,
                    fontSize: 18,
                    color: '#c2c2c2'
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: detail
          }
        ],
        color: ['#3BA0FF', '#4DCB73', '#F2637B', '#36CBCB', '#FAD337']
      })
    },
    // 健康指数的升序和降序
    sortData() {
      this.desc = !this.desc;
      this.$emit('sortHealthIndex', this.desc);
    },
    // 跳转
    jumpToDeal(type) {
      this.$router.push({ name: 'dealwarn', params: { type } });
    }
  },
  computed: {
    currentTime() {
      let date = new Date();
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
  }

}
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/common.styl"
  $margin=24px
  $padding=32px
  // iconfont样式
  .icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
    cursor pointer
    vertical-align middle
  }
  .health-container
    .left-container
      width 100%
      background-color: #fff
  .bmi-container,.warn-title{
    display: flex
    justify-content space-between
    height 55px
    line-height 55px
    border-bottom 1px solid rgba(233,233,233,1)
    .title{
      font-size 14px
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#939393;
    }
    .more{
      font-weight:500;
      color:#1890FF;
      padding-right $padding
      cursor pointer
    }
  }

  .bmi-detail{
    height 246px
    .health{
      height 180px
    }
    //健康指数标题
    .index-title{
      height 38px
      line-height 38px
      background-color rgba(19,194,194,0.06)
      padding 0 24px
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(0,0,0,0.65);
      margin-top 24px
    }
    // 下面的6个小方块
    .score-res{
      width 125px
      font-size 14px
      display flex
      height 20px
      line-height 20px
      //分数区域
      .score-range{
        padding-left 3px
      }
      .point{
        width 8px
        height 8px
        border-radius 50%
        margin 5px 0 0 2px
      }
      .color1{
        background-color: #3BA0FF
      }
      .color2{
        background-color: #4DCB73
      }
      .color3{
        background-color: #F2637B
      }
      .color4{
        background-color: #36CBCB
      }
      .color5{
        background-color: #FAD337
      }
    }
    .content-box{
      margin-right 7px
      height 140px
      overflow-y scroll
    }
    .left-box{
      width 60%
      padding-left $padding
    }
    //左侧右边列表
    .right-box{
      width calc(40%)
      padding-right $padding
      .index-line{
        padding 0 24px
        height 37px
        line-height 37px
        border-bottom 1px solid #E9E9E9
        .head-img{
          width 24px
          height 24px
          border-radius 50%
          margin-right 8px
          vertical-align middle
        }
        .score{
          text-align right
        }
      }
    }
  }
</style>
