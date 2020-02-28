<template>
  <a-row class="chart-box"  :span="7" id="averageSleepBox">
    <div class="new-chart-box">
      <div id="averageSleep" class="chart"></div>
      <a-tooltip class="question-icon">
        <template slot='title'>
            {{ $t('dashboard.averageScores') }}
        </template>
        <a-icon type="question-circle"/>
      </a-tooltip>
    </div>
    <div>
<!--      <a-row class="chart-title">-->
<!--        平均睡眠分数-->
<!--        <a-icon type="question-circle" class="question-icon"/>-->
<!--      </a-row>-->
      <a-row v-for="(item, key) in people" :key="key" type="flex" justify="space-between" class="line">
        <a-col :span="12" class="left">
          <img :src="item.headImg?item.headImg:defaultPic" alt="">
          {{item.userName}}
        </a-col>
        <a-col :span="12" class="right">
          {{item.value}} {{ $t('dashboard.stepScores') }}
        </a-col>
      </a-row>
      <a-row class="more">
        <a href="javascript:void(0);"
           @click="showMore"
           class="more-icon">
            {{ $t('dashboard.viewMore') }}
        </a>
      </a-row>
    </div>
    <a-modal v-model="visible"
             :footer="null"
             :title="$t('dashboard.averageScoresTitle')"
             :bodyStyle="bodyStyle"
    >
      <chart-modal :data="data" :unit="$t('dashboard.stepScores')"></chart-modal>
    </a-modal>
  </a-row>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import ChartModal from '../../components/modals/chartmodal'
import defaultPic from '../../statics/img/default.png'

export default {
  components: { ChartModal },
  mounted() {
  },
  data() {
    return {
      defaultPic,
      data: [], // 所有的数据
      people: [], // 前3条
      bodyStyle: { // modal的样式
        height: '480px'
      },
      visible: false,
      unit: '分',
      pass: this.$t('dashboard.pass'),
      failed: this.$t('dashboard.failed'),
      ren: this.$t('dashboard.sleepRen')
    }
  },
  methods: {
    make(title, xAxis, yAxis, sleep, sleepPic, width) {
      document.getElementById('averageSleepBox').style.width = width;
      sleepPic.sort((x, y) => {
        return x.time - y.time;
      });
      // 降序排一下
      sleep.sort((x, y) => {
        return y.value - x.value;
      });
      // 保存所有人
      this.data = sleep;
      // 取前3项展示到列表
      this.people = sleep.slice(0, 3);

      // 平均睡眠分数
      let myChart = echarts.init(document.getElementById('averageSleep'));
      let options = [];
      let data1 = [];
      let data2 = [];
      let that = this;
      sleepPic.forEach(item => {
        let date = new Date(item.time);
        options.push(`${date.getMonth() + 1}.${date.getDate()}`);
        data1.push(item.sleepHigh)
        data2.push(-item.sleepLow)
      });

      myChart.setOption({
        backgroundColor: '#fbfbfb',
        title: {
          left: 5,
          text: title,
        },
        tooltip: {},
        xAxis: {
          data: options,
          name: xAxis,
        },
        yAxis: {
          name: yAxis,
          splitArea: { show: false },
          axisLabel: {
            formatter (value) {
              return Math.abs(value)
            }
          }
        },
        grid: {
          width: '60%',
          left: 'center'
        },
        series: [
          {
            itemStyle: {
              normal: { color: "#3BA0FF" }
            },
            name: `${that.pass}`,
            type: 'bar',
            stack: 'one',
            data: data1,
            tooltip: {
              formatter (e) {
                return `${e.name}  ${that.pass} ${Math.abs(e.value)} ${that.ren}`
              }
            }
          },
          {
            legendHoverLink: false,
            itemStyle: {
              normal: { color: "#F2637B" }
            },
            name: `${that.failed}`,
            type: 'bar',
            stack: 'one',
            data: data2,
            tooltip: {
              formatter (e) {
                return `${e.name}  ${that.failed} ${Math.abs(e.value)} ${that.ren}`
              }
            }
          }
        ]
      })
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    // 查看更多
    showMore() {
      this.visible = true;
    }
  },
  computed: {
    lang() {
      return this.$i18n.locale
    }
  },
  watch: {
    lang() {
      this.pass = this.$t('dashboard.pass');
      this.failed = this.$t('dashboard.failed');
      this.ren = this.$t('dashboard.ren');
    }
  },

}
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/common.styl"
  .new-chart-box{
    position relative
    .question-icon{
      position absolute
      z-index 100
      top 5px
      right 15px
      color #48c597
    }
  }
  .more-icon{
    color rgba(0,0,0,0.25)
    cursor pointer
  }
</style>
