<template>
  <a-row class="chart-box" :span="7" id="bloodPressureBox">
      <div class="new-chart-box">
        <div id="bloodPressure" class="chart"></div>
        <a-tooltip class="question-icon">
          <template slot='title'>
            {{ $t('dashboard.bloodPie') }}
          </template>
          <a-icon type="question-circle"/>
        </a-tooltip>
      </div>
      <div>
        <a-row v-for="(item,i) of people" :key="i" type="flex" justify="space-between" class="line">
          <a-col  :span="14" class="left">
            <img :src="item.headImg?item.headImg:defaultPic" alt="">
            {{item.userName}}
          </a-col>
          <a-col  :span="8" class="right">{{item.value}}mmHg</a-col>
        </a-row>
        <a-row class="more" >
          <a href="javascript:void(0);"
             @click="showMore"
             class="more-icon">
            {{ $t('dashboard.viewMore') }}
          </a>
        </a-row>
        <a-modal v-model="visible"
                 :footer="null"
                 :title="$t('dashboard.bloodPieTitle')"
                 :bodyStyle="bodyStyle"
        >
          <chart-modal :data="data" :unit="unit"></chart-modal>
        </a-modal>
      </div>
  </a-row>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import defaultPic from "../../statics/img/default.png";
import ChartModal from "../modals/chartmodal/index";

export default {
  components: { ChartModal },
  data() {
    return {
      alias: {
        bp_def: this.$t('dashboard.bloodAlias.bp_def'),
        bp_one: this.$t('dashboard.bloodAlias.bp_one'),
        bp_two: this.$t('dashboard.bloodAlias.bp_two'),
        bp_three: this.$t('dashboard.bloodAlias.bp_three'),
        bp_four: this.$t('dashboard.bloodAlias.bp_four'),
        bp_five: this.$t('dashboard.bloodAlias.bp_five'),
        bp_six: this.$t('dashboard.bloodAlias.bp_six')
      },
      data: [], // 所有人
      people: [], // 前三个人
      defaultPic,
      visible: false, // 是否显示弹窗
      bodyStyle: { // modal的样式
        height: '480px'
      },
      unit: 'mmHg',
    }
  },
  computed: {
    lang() {
      return this.$i18n.locale
    }
  },
  watch: {
    lang() {
      this.alias = {
        bp_def: this.$t('dashboard.bloodAlias.bp_def'),
        bp_one: this.$t('dashboard.bloodAlias.bp_one'),
        bp_two: this.$t('dashboard.bloodAlias.bp_two'),
        bp_three: this.$t('dashboard.bloodAlias.bp_three'),
        bp_four: this.$t('dashboard.bloodAlias.bp_four'),
        bp_five: this.$t('dashboard.bloodAlias.bp_five'),
        bp_six: this.$t('dashboard.bloodAlias.bp_six')
      }
    }
  },
  methods: {
    make(title, seriesName, bp, width) {
      document.getElementById('bloodPressureBox').style.width = width;
      let myChart = echarts.init(document.getElementById('bloodPressure'));
      let { options, color } = this.dealData(bp);
      let data = bp.bpHomePageData;
      // 降序排一下
      data.sort((x, y) => {
        return y.value - x.value;
      });
      // 将区间值写在一个字段
      data.forEach(e => {
        e.value = `${e.systolicPressure}/${e.diastolicPressure}`;
      });
      // 保存所有人
      this.data = data;
      // 取前3项展示到列表
      this.people = data.slice(0, 3);

      myChart.setOption({
        title: {
          left: 5,
          text: title,
        },
        backgroundColor: '#fbfbfb',
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            name: seriesName,
            type: 'pie',
            radius: '55%',
            data: options,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        color
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    dealData(data) {
      let options = [];
      let color = [];
      const detailColor = {
        bp_def: '#D9D9D9',
        bp_one: '#635CF6',
        bp_two: '#68A5FF',
        bp_three: '#72EDBF',
        bp_four: '#FF88A3',
        bp_five: '#FF558A',
        bp_six: '#741976'
      };
      Object.keys(data).forEach(item => {
        if (data[item] > 0) {
          options.push({
            name: this.alias[item],
            value: data[item]
          });
          color.push(detailColor[item])
        }
      });
      return { options, color };
    },
    // 显示弹窗
    showMore() {
      this.visible = true
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/common/stylus/common.styl"
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
