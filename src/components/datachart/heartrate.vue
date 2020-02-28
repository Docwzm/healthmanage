<template>
  <a-row class="chart-box" :span="7" id="heartRateBox">
    <div class="new-chart-box">
      <div id="heartRate" class="chart"></div>
      <a-tooltip class="question-icon">
        <template slot='title'>
            {{ $t('dashboard.ehrd') }}
        </template>
        <a-icon type="question-circle" />
      </a-tooltip>
    </div>
    <div>
<!--      <a-row class="chart-title">-->
<!--        极限心率累计时长-->
<!--      </a-row>-->
      <a-row v-for="(item,i) of people" :key="i" type="flex" justify="space-between" class="line">
        <a-col  :span="14" class="left">
          <img :src="item.headImg?item.headImg:defaultPic" alt="">
          {{item.userName}}
        </a-col>
        <a-col  :span="8" class="right">{{item.value}}{{ $t('dashboard.minute')}}</a-col>
      </a-row>
      <a-row class="more" >
        <a href="javascript:void(0);"
           @click="showMore"
            class="more-icon">
          {{ $t('dashboard.viewMore') }}
        </a>
      </a-row>
    </div>
    <a-modal v-model="visible"
             :footer="null"
             :title="$t('dashboard.extremeTimeTitle')"
             :bodyStyle="bodyStyle"
    >
      <chart-modal :data="data" :unit="$t('dashboard.minute')"></chart-modal>
    </a-modal>
  </a-row>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import ChartModal from '../../components/modals/chartmodal'
import defaultPic from '../../statics/img/default.png'

export default {
  components: { ChartModal },
  mounted() {
  },
  props: {

  },
  data() {
    return {
      defaultPic,
      data: [], // 所有人
      people: [], // 前三个人
      visible: false, // 是否显示弹窗
      bodyStyle: { // modal的样式
        height: '480px'
      },
      unit: '分钟',
      count: this.$t('dashboard.count'),
      minute: this.$t('dashboard.minute')
    }
  },
  methods: {
    // 展示图表
    make(title, xAxis, yAxis, data, width) {
      document.getElementById('heartRateBox').style.width = width;
      // 降序排一下
      data.sort((x, y) => {
        return y.value - x.value;
      });
      // 保存所有人
      this.data = data;
      // 取前3项展示到列表
      this.people = data.slice(0, 3);
      // echart图表数据
      let options = [];
      data.forEach(item => {
        options.push([item.count, item.value])
      });
      // 极限心率累计时长
      let myChart = echarts.init(document.getElementById('heartRate'));
      // 绘制图表
      let that = this;
      myChart.setOption({
        title: {
          left: 5,
          text: title,
        },
        backgroundColor: '#fbfbfb',
        xAxis: {
          name: xAxis // x轴文字
        },
        grid: {
          width: '60%',
          left: 'center'
        },
        yAxis: {
          name: yAxis // y轴文字
        },
        tooltip: {
          formatter (e) {
            return `${e.data[0]} ${that.count} ${e.data[1]} ${that.minute}`
          }
        },
        series: [{
          symbolSize: 15,
          data: options,
          type: 'scatter',
          itemStyle: {
            normal: { color: "#3BA0FF" }
          }
        }]
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    // 显示弹窗
    showMore() {
      this.visible = true
    }
  },
  computed: {
    lang() {
      return this.$i18n.locale
    }
  },
  watch: {
    lang() {
      this.count = this.$t('dashboard.count');
      this.minute = this.$t('dashboard.minute');
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
    color: rgba(0,0,0,0.25);
    cursor pointer
  }
</style>
