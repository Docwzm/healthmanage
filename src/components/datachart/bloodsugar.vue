<template>
  <a-row class="chart-box" :span="7" id="bloodSugarBox">
    <div class="new-chart-box">
      <div id="bloodSugar" class="chart"></div>
      <a-tooltip class="question-icon">
        <template slot='title'>
          {{ $t('dashboard.sugarPie') }}
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
        <a-col  :span="8" class="right">{{item.value}}mmol/L</a-col>
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
               :title="$t('dashboard.sugarPieTitle')"
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
        bs_def: this.$t('dashboard.sugarAlias.bs_def'),
        bs_zero: this.$t('dashboard.sugarAlias.bs_zero'),
        bs_one: this.$t('dashboard.sugarAlias.bs_one'),
        bs_two: this.$t('dashboard.sugarAlias.bs_two'),
        bs_three: this.$t('dashboard.sugarAlias.bs_three'),
        bs_four: this.$t('dashboard.sugarAlias.bs_four')
      },
      data: [], // 所有人
      people: [], // 前三个人
      defaultPic,
      visible: false, // 是否显示弹窗
      bodyStyle: { // modal的样式
        height: '480px'
      },
      unit: 'mmol/L',
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
        bs_def: this.$t('dashboard.sugarAlias.bs_def'),
        bs_zero: this.$t('dashboard.sugarAlias.bs_zero'),
        bs_one: this.$t('dashboard.sugarAlias.bs_one'),
        bs_two: this.$t('dashboard.sugarAlias.bs_two'),
        bs_three: this.$t('dashboard.sugarAlias.bs_three'),
        bs_four: this.$t('dashboard.sugarAlias.bs_four')
      }
    }
  },
  methods: {
    make(title, seriesName, bs, width) {
      document.getElementById('bloodSugarBox').style.width = width;
      let myChart = echarts.init(document.getElementById('bloodSugar'));
      let { data, color } = this.dealData(bs);

      let datas = bs.bsHomePageData;
      // 降序排一下
      datas.sort((x, y) => {
        return y.value - x.value;
      });
      // 将区间值写在一个字段
      datas.forEach(e => {
        e.value = e.glucoseConcentration;
      });
      // 保存所有人
      this.data = datas;
      // 取前3项展示到列表
      this.people = datas.slice(0, 3);
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
            data,
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
      // 生成详细的数据
      let detail = [];
      let color = [];
      const detailColor = {
        bs_def: '#D9D9D9',
        bs_zero: '#6B64FA',
        bs_one: '#59DCF8',
        bs_two: '#8AFFA0',
        bs_three: '#FF904D',
        bs_four: '#E05248'
      };
      Object.keys(data).forEach(item => {
        if (data[item] > 0) {
          detail.push({
            name: this.alias[item],
            value: data[item]
          });
          color.push(detailColor[item]);
        }
      });
      return {
        data: detail,
        color
      };
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
