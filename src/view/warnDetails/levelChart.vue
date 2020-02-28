<template>
  <div class="warnchart-box" id="levelChartBox">
    <div class="new-chart-box">
      <div id="levelChart" class="warn-chart"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

export default {
  props: ['levelData', 'healthType'],
  mounted() {
    this.make();
  },
  data() {
    return {
      colorType: {
        1: [{ 0: '#36CBCB' }, { 1: '#FFE305' }, { 2: '#FF8D11' }, { 3: '#FF0210' }],
        2: [{ 0: '#36CBCB' }, { 1: '#FFE305' }, { 2: '#FF8D11' }, { 3: '#FF0210' }],
        3: [{ 0: '#36CBCB' }, { 1: '#FFE305' }, { 2: '#FF8D11' }, { 3: '#FF0210' }],
        4: [{ 0: '#36CBCB' }, { 1: '#FFE305' }, { 2: '#FF8D11' }, { 3: '#FF0210' }],
        5: [{ 0: '#36CBCB' }, { 1: '#FFE305' }, { 2: '#FF8D11' }, { 3: '#FF0210' }],
        6: [{ 0: '#36CBCB' }, { 1: '#FFE305' }, { 2: '#FF8D11' }, { 3: '#FF0210' }],
        7: [{ 0: '#36CBCB' }, { 1: '#FFE305' }, { 2: '#FF8D11' }, { 3: '#FF0210' }]
      },
      color: [],
      textTitle: this.$t('dashboard.subGText'),
      myChart: ''
    }
  },
  watch: {
    healthType: {
      handler(newValue, oldValue) {
        this.healthType = newValue;
        this.make();
      },
      deep: true
    },
    levelData: {
      handler(newValue) {
        this.levelData = newValue;
        this.matchColor(this.levelData);
        this.make();
      },
      deep: true
    }
  },
  methods: {
    matchColor(array) {
      let result = [];
      array.map(e => {
        if (e.name === '无异常数据') {
          this.textTitle = this.$t('dashboard.noData');
        } else {
          this.textTitle = this.$t('dashboard.subGText');
        }
        return this.colorType[this.healthType].map(f => {
          if (f[e.level]) {
            return result.push(f[e.level]);
          }
        })
      });
      this.color = result;
    },
    make() {
      this.matchColor(this.levelData);
      this.myChart = echarts.init(document.getElementById('levelChart'));
      this.myChart.setOption({
        color: this.color,
        backgroundColor: '#F7F7F7',
        title: {
          text: this.$t(`dashboard.type[${this.healthType}]`),
          textStyle: {
            color: '#000000',
            fontSize: 13,
            fontFamily: 'PingFangSC-Regular,PingFang SC',
            fontWeight: 400,
          },
          x: 'center',
          y: 'center',
          itemGap: 80,
          subtext: this.textTitle,
          subtextStyle: {
            fontFamily: 'PingFangSC-Regular,PingFang SC',
            fontSize: 14,
            color: '#000000'
          },
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c}",
          position: ['50%', '50%']
        },
        legend: {
          selectedMode: false,
          orient: "vartical",
          right: "16",
          bottom: '16',
          icon: "circle",
          itemHeight: 12,
          itemWidth: 12,
          itemGap: 12,
          data: this.levelData,
          // tooltip: {
          //   show: true,
          // }
        },
        series: [
          {
            name: this.$t(`dashboard.type[${this.healthType}]`),
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false
            },
            data: this.levelData
          }
        ]
      });
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    }
  }
}
</script>

<style scoped lang="stylus">
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
    color: rgba(0,0,0,0.25);
    cursor pointer
  }
</style>
