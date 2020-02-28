<template>
  <div class="warnchart-box" id="abnormalChartBox">
    <div class="new-chart-box">
      <div id="abnormalChart" class="warn-chart">
      </div>
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
  props: ['abnormalData', 'healthType'],
  data() {
    return {
      colorType: {
        1: [{ 0: '#B4B4B4' }, { 1: '#FFC0C0' }, { 2: '#FFE4E6' }, { 3: '#FF9996' }, { 4: '#FF5752' }],
        2: [],
        3: [{ 0: '#B4B4B4' }, { 1: '#EDDEE1' }, { 2: '#E08F98' }, { 3: '#FF6B79' }, { 4: '#FF4355' }],
        4: [],
        5: [{ 0: '#B4B4B4' }, { 1: '#D2ECFF' }, { 2: '#B4B4B4' }],
        6: [{ 0: '#B4B4B4' }, { 1: '#D9E6F3' }, { 2: '#34A9FE' }],
        7: [{ 0: '#B4B4B4' }, { 1: '#D4FADC' }]
      },
      color: [],
      textTitle: this.$t('dashboard.subText'),
      people: this.$t('dashboard.ren'),
      myChart: ''
    }
  },
  mounted() {
    this.matchColor(this.abnormalData);
    this.make();
  },
  watch: {
    healthType: {
      handler(newValue, oldValue) {
        this.healthType = newValue;
        this.make();
      },
      deep: true
    },
    abnormalData: {
      handler(newValue) {
        this.abnormalData = newValue;
        this.matchColor(this.abnormalData);
        this.make();
      },
      deep: true
    }
  },
  methods: {
    matchColor(array) {
      let result = [];
      array.map(e => {
        this.textTitle = this.$t('dashboard.subText');
        this.people = this.$t('dashboard.ren');
        return this.colorType[this.healthType].map(f => {
          if (f[e.level]) {
            return result.push(f[e.level]);
          }
        })
      });
      this.color = result;
    },
    make() {
      this.myChart = echarts.init(document.getElementById('abnormalChart'));
      this.myChart.setOption({
        color: this.color,
        backgroundColor: '#F7F7F7',
        title: {
          text: this.$t(`dashboard.type[${this.healthType}]`),
          textStyle: {
            color: '#000000',
            fontSize: 13,
            fontFamily: 'PingFangSC-Regular,PingFang SC',
            fontWeight: 400
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
          formatter: `{a} <br/>{b} {c} ${this.people} {d}%`,
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
          data: this.abnormalData,
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
            data: this.abnormalData
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
