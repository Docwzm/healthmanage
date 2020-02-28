<template>
  <a-row type="flex" justify="space-between">
    <a-col class="heightWeight-box">
      <div class="new-chart-box">
        <div id="heightWeight" class="heightWeight-chart chart"></div>
        <a-tooltip class="question-icon">
          <template slot='title'>
            {{ $t('dashboard.heightWeight') }}
          </template>
          <a-icon type="question-circle"/>
        </a-tooltip>
      </div>
    </a-col>
    <a-col class="right-box">
      <a-row class="index-title" type="flex" justify="space-between">
        <a-col>{{ $t('dashboard.bodyIndex') }}</a-col>
        <a-col>
          <svg class="icon" aria-hidden="true" @click="sortData">
            <use :xlink:href="desc?'#icon-desc':'#icon-desc1'"></use>
          </svg>
        </a-col>
      </a-row>
      <a-row class="content-box">
        <a-row class="index-line" type="flex" justify="space-between" v-for="(item, key) in listData" :key="key">
          <a-col>
            <img :src="item.headImg?item.headImg:defaultPic" alt="" class="head-img">
            {{item.userName}}
          </a-col>
          <a-col class="score">
            {{item.bmi}}
          </a-col>
        </a-row>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import ecStat from 'echarts-stat'
import defaultPic from "../../statics/img/default.png";

export default {
  props: {
    listData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      desc: true,
      defaultPic
    }
  },
  methods: {
    make(title, xAxis, yAxis, weight, weightData, heightData, unit) {
      let myChart = echarts.init(document.getElementById('heightWeight'));
      let data = [];
      weight.forEach(item => {
        data.push([item.weight, item.height]);
      });
      let myRegression = ecStat.regression('linear', data);
      myRegression.points.sort((a, b) => {
        return a[0] - b[0];
      });
      myChart.setOption({
        title: {
          left: 5,
          text: title,
        },
        backgroundColor: '#fbfbfb',
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            return `${heightData}: ${params.value[1]} ${unit.height}</br> ${weightData}: ${params.value[0]} ${unit.weight}`;
          },
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          name: xAxis,
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
        },
        yAxis: {
          name: yAxis,
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
        },
        grid: {
          // top: 'middle'
        },
        series: [{
          name: 'scatter',
          type: 'scatter',
          label: {
            emphasis: {
              show: true,
              position: 'left',
              textStyle: {
                color: 'blue',
                fontSize: 16
              }
            }
          },
          data,
          itemStyle: {
            normal: { color: "#3BA0FF" }
          },
        },
        // {
        //   name: 'line',
        //   type: 'line',
        //   showSymbol: false,
        //   data: myRegression.points,
        //   color: ['#000'],
        //   markPoint: {
        //     itemStyle: {
        //       normal: {
        //         color: 'transparent'
        //       }
        //     },
        //     label: {
        //       normal: {
        //         show: true,
        //         position: 'left',
        //         formatter: myRegression.expression,
        //         textStyle: {
        //           color: '#333',
        //           fontSize: 14
        //         }
        //       }
        //     },
        //     data: [{
        //       coord: myRegression.points[myRegression.points.length - 1]
        //     }]
        //   }
        // }
        ]
      })
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    // 健康指数的升序和降序
    sortData() {
      this.desc = !this.desc;
      this.$emit('sortBodyIndex', this.desc);
    },
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/common/stylus/common.styl"
  .heightWeight-box{
    width 60%
    margin 0 auto
  }
  .content-box{
    margin-right 7px
    height 340px
    overflow-y scroll
  }
  .left-box{
    width 60%
    padding-left $padding
  }
  //左侧右边列表
  .right-box{
    width calc(40%)
    //健康指数标题
    .index-title{
      height 38px
      line-height 38px
      background-color rgba(19,194,194,0.06)
      padding 0 24px
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(0,0,0,0.65);
      margin-top 34px
      .icon {
        width: 1em;
        height: 1em;
        fill: currentColor;
        overflow: hidden;
        cursor pointer
        vertical-align middle
      }
    }
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
  .heightWeight-title{
    background-color: rgba(247,247,247,1)
    height 55px
    line-height 55px
    padding-left 16px
  }
  .heightWeight-chart{
    height 400px
    margin 0 auto
  }

  .new-chart-box{
    position relative
    margin-top $padding
    .question-icon{
      position absolute
      z-index 100
      top 5px
      right 15px
      color #48c597
    }
  }
  .more-icon{
    color: rgba(0,0,0,0.25);
    cursor pointer
  }
</style>
