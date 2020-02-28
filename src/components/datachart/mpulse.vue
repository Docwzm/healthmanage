<template>
  <a-row class="chart-box" :span="7" id="mPulseBox">
    <div class="new-chart-box">
      <div id="mPulse" class="chart"></div>
      <a-tooltip class="question-icon">
        <template slot='title'>
          {{ $t('dashboard.morningPluseExtreme') }}
        </template>
        <a-icon type="question-circle" />
      </a-tooltip>
    </div>
    <a-row v-for="(item, key) in people" :key="key" type="flex" justify="space-between" class="line">
      <a-col :span="12" class="left">
        <img :src="item.headImg?item.headImg:defaultPic" alt="">
        {{item.userName}}
      </a-col>
      <a-col :span="12" class="right">{{item.value}}</a-col>
    </a-row>
    <a-row class="more">
      <a href="javascript:void(0);"
         @click="showMore"
         class="more-icon">
      {{ $t('dashboard.viewMore') }}
      </a>
    </a-row>
    <a-modal v-model="visible"
             :footer="null"
             :title="$t('dashboard.morningPluseExtremeTitle')"
             :bodyStyle="bodyStyle"
    >
      <chart-modal :data="data" :unit="unit"></chart-modal>
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
  data() {
    return {
      defaultPic,
      data: [],
      people: [],
      visible: false,
      bodyStyle: { // modal的样式
        height: '480px'
      },
      unit: '',
      total: this.$t('dashboard.total'),
      xia: this.$t('dashboard.xia'),
      ren: this.$t('dashboard.ren')
    }
  },
  methods: {
    make(title, xAxis, yAxis, heart, heartPic, width) {
      document.getElementById('mPulseBox').style.width = width;
      // 降序排一下
      heart.sort((x, y) => {
        return y.value - x.value;
      });
      // 保存所有人
      this.data = heart;
      // 取前3项展示到列表
      this.people = heart.slice(0, 3);

      // 处理图表数据
      heartPic.sort((x, y) => {
        return x.time - y.time;
      });
      let detail = [];
      let options = [];
      heartPic.forEach((item, key) => {
        // x轴日期
        let date = new Date(item.time);
        options.push(`${date.getMonth() + 1}.${date.getDate()}`);
        // 计算每个点多少人
        let countArr = {};
        item.silentHeart.forEach(i => {
          if (countArr[i.value]) {
            countArr[i.value]++;
          } else {
            countArr[i.value] = 1
          }
        });
        // 详细数据
        item.silentHeart.forEach(item1 => {
          detail.push([key, item1.value, countArr[item1.value]])
        })
      });
      let myChart = echarts.init(document.getElementById('mPulse'));
      let that = this;
      myChart.setOption({
        backgroundColor: '#fbfbfb',
        grid: {
          width: '60%',
          left: 'center'
        },
        tooltip: {
          formatter (e) {
            return `${e.data[1]} ${that.xia} ${that.total}: ${e.data[2]} ${that.ren}`
          }
        },
        title: {
          left: 5,
          text: title,
        },
        xAxis: {
          scale: true,
          name: xAxis,
          type: 'category',
          data: options
        },
        yAxis: {
          scale: true,
          name: yAxis
        },
        series: [{
          type: 'scatter',
          data: detail,
          itemStyle: {
            normal: { color: "#3BA0FF" }
          },
        }]
      })
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    // 显示弹窗
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
      this.total = this.$t('dashboard.total');
      this.xia = this.$t('dashboard.xia');
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
    color: rgba(0,0,0,0.25)
    cursor pointer
  }
</style>
