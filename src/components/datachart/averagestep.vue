<template>
  <a-row class="chart-box" :span="7" id="averageStepBox">
    <div class="new-chart-box">
      <div id="averageStep" class="chart"></div>
      <a-tooltip class="question-icon">
        <template slot='title'>
            {{ $t('dashboard.averageStep') }}
        </template>
        <a-icon type="question-circle"/>
      </a-tooltip>
    </div>
    <div>
<!--      <a-row class="chart-title">-->
<!--        个人日平均步数-->
<!--      </a-row>-->
      <a-row v-for="(item,i) in people" :key="i" type="flex" justify="space-between" class="line">
        <a-col :span="12" class="left">
          <img :src="item.headImg?item.headImg:defaultPic" alt="">
          {{item.userName}}
        </a-col>
        <a-col :span="12" class="right">
          {{item.value}} {{ $t('dashboard.step') }}
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
             :title="$t('dashboard.averageStepTitle')"
             :bodyStyle="bodyStyle"
             :destroyOnClose="destroyOnClose"
    >
      <chart-modal :data="data" :unit="$t('dashboard.step')"></chart-modal>
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
import mixin from '../../common/js/mixin'

export default {
  mixins: [mixin],
  components: { ChartModal },
  created() {

  },
  data() {
    return {
      defaultPic,
      data: [],
      people: [], // 前三个人
      visible: false,
      bodyStyle: { // modal的样式
        height: '480px'
      },
      unit: '步',
      destroyOnClose: true, // 每次打开modal强制重新渲染
      avage: this.$t('dashboard.avage'),
      step: this.$t('dashboard.step')
    }
  },
  methods: {
    make(title, xAxis, yAxis, step, stepPic, width) {
      document.getElementById('averageStepBox').style.width = width;
      stepPic.sort((x, y) => {
        return x.time - y.time;
      });
      // 降序排一下
      step.sort((x, y) => {
        return y.value - x.value;
      });
      // 保存所有人
      this.data = step;
      // 取前3项展示到列表
      this.people = step.slice(0, 3);
      let x = [];
      let y = [];
      stepPic.forEach(item => {
        let date = new Date(item.time);
        x.push(`${date.getMonth() + 1}.${date.getDate()}`)
        y.push(item.value)
      });
      // 个人日平均步数
      let myChart = echarts.init(document.getElementById('averageStep'));
      let that = this;
      myChart.setOption({
        backgroundColor: '#fbfbfb',
        title: {
          left: 5,
          text: title,
        },
        xAxis: {
          name: xAxis,
          type: 'category',
          data: x
        },
        yAxis: {
          name: yAxis,
          type: 'value',
          axisLabel: {
            formatter (value) {
              if (value % 1000 === 0) {
                return `${value / 1000}k`
              } else {
                return `${(value / 1000).toFixed(1)}k`
              }
            }
          }
        },
        tooltip: {
          formatter (e) {
            return `${e.name} ${that.avage} ${e.data} ${that.step}`
          }
        },
        grid: {
          width: '60%',
          left: 'center'
        },
        series: [{
          data: y,
          type: 'bar',
          color: ['#3BA0FF']
        }]
      });
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
      this.avage = this.$t('dashboard.avage');
      this.step = this.$t('dashboard.step');
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
