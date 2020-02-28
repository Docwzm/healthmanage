<template>
  <a-row class="main-datachart">
    <a-row type="flex" justify="space-between" class="top">
      <a-col :span="5" class="unit-title">{{ $t('dashboard.warnDetails') }}</a-col>
      <div>
        <div class="warn-tab">
<!--            <a-radio-group buttonStyle="solid" defaultValue="value" @change="onChange" v-model="value" v-for="(type, key) in chartType" :key="key">-->
<!--              <a-radio-button :value="key">{{type}}</a-radio-button>-->
<!--            </a-radio-group>-->
          <a-radio-group defaultValue="0" buttonStyle="solid">
            <a-radio-button value="0" @click="onChange(matchIndicator[0].healthType)">{{ $t(matchIndicator[0].title) }}</a-radio-button>
            <a-radio-button value="1" @click="onChange(matchIndicator[1].healthType)">{{ $t(matchIndicator[1].title) }}</a-radio-button>
            <a-radio-button value="2" @click="onChange(matchIndicator[2].healthType)">{{ $t(matchIndicator[2].title) }}</a-radio-button>
            <a-radio-button value="3" @click="onChange(matchIndicator[3].healthType)">{{ $t(matchIndicator[3].title) }}</a-radio-button>
          </a-radio-group>
        </div>
      </div>
    </a-row>
    <div class="view-more">
        <a-button type="primary" size="small" @click.native="jumpTo('/dealwarn')">{{ $t('dashboard.viewMore') }}</a-button>
    </div>
    <a-row type="flex" justify="space-between" class="chart-row">
      <abnormal-chart class="left-chart" v-if="abnormalData.length !== 0" :abnormalData="abnormalData"  v-bind:healthType="healthType"></abnormal-chart>
      <level-chart class="right-chart" v-if="levelData.length !==0" :levelData="levelData" v-bind:healthType="healthType"></level-chart>
    </a-row>
  </a-row>
</template>

<script>
import AbnormalChart from './abnormalChart'
import LevelChart from './levelChart'
import mixin from '../../common/js/mixin'
import { getWarnChartData } from '../../api/warn'


export default {
  mixins: [mixin],
  props: {
    matchIndicator: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      value: '0',
      abnormalData: [],
      levelData: [],
      healthType: '',
      temp: 'chart'
    }
  },
  mounted() {
    this.getChartData(this.matchIndicator[0].healthType);
  },
  computed: {
    lang() {
      return this.$i18n.locale
    }
  },
  watch: {
    lang() {
      this.getChartData(this.healthType);
    }
  },
  methods: {
    getChartData(data) {
      getWarnChartData(data).then(res => {
        this.abnormalData = [];
        this.levelData = [];
        this.healthType = res.healthType;
        this.gradeData(res.scenePic, 1, this.healthType);
        this.gradeData(res.gradePic, 2, this.healthType);
      }).catch(err => {
        this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
      })
    },
    gradeData(array, type, healthType) {
      if (type === 1) {
        let result = [];
        switch (healthType) {
          case 1:
            array.map(e => {
              return result.push({
                name: this.$t(`dashboard.bloodP[${e.level}]`), value: e.count, level: e.level
              });
            });
            break;
          case 2:
            array.map(e => {
              return result.push({
                name: e.warnTagContext, value: e.count, level: e.level
              });
            });
            break;
          case 3:
            array.map(e => {
              return result.push({
                name: this.$t(`dashboard.heartR[${e.level}]`), value: e.count, level: e.level
              });
            });
            break;
          case 4:
            array.map(e => {
              return result.push({
                name: e.warnTagContext, value: e.count, level: e.level
              });
            });
            break;
          case 5:
            array.map(e => {
              return result.push({
                name: this.$t(`dashboard.sleepD[${e.level}]`), value: e.count, level: e.level
              });
            });
            break;
          case 6:
            array.map(e => {
              return result.push({
                name: this.$t(`dashboard.morningP[${e.level}]`), value: e.count, level: e.level
              });
            });
            break;
          default:
            break;
        }
        this.abnormalData = result;
      }
      if (type === 2) {
        let result = [];
        if (array.length === 0) {
          result.push({ name: this.$t('dashboard.noData'), value: 0, level: 0 });
        } else {
          array.map(e => {
            return result.push({ name: this.$t(`dashboard.level[${e.level}]`), value: e.count, level: e.level });
          });
        }
        this.levelData = result;
      }
    },
    // 日期变化时调用
    changeDay(type) {
      // 修改当前高亮文字
      this.active = type;
      let date = new Date();
      let month = date.getMonth();
      let start = '';
      let end = this.formatDay(date.getDate(), date.getMonth() + 1, date.getFullYear(), '23:59:59');
      // 当天
      if (type === 'day') {
        // 今日
        start = this.formatDay(date.getDate(), date.getMonth() + 1, date.getFullYear(), '00:00:00');
      } else if (type === 'week') {
        // 本周
        let weekday = date.getDay() || 7; // 当前星期几
        let firstDay = new Date(date - (weekday - 1) * 24 * 60 * 60 * 1000);
        start = this.formatDay(firstDay.getDate(), firstDay.getMonth() + 1, firstDay.getFullYear(), '00:00:00');
      } else if (type === 'month') {
        // 本月
        start = this.formatDay(1, date.getMonth() + 1, date.getFullYear(), '00:00:00');
      } else {
        return
      }
      this.$emit('changeCalendar', start, end);
    },
    // 日期转成标准格式
    formatDay (day, month, year, tail) {
      let date = `${year}-${month}-${day} ${tail}`;
      return new Date(date).getTime();
    },
    onChange(type) {
      this.getChartData(type);
    }
  },
  components: {
    AbnormalChart,
    LevelChart
  }
}
</script>

<style lang="stylus" scoped>
    @import "~@/common/stylus/common.styl"
    ul,li{list-style:none}
  .main-datachart{
    height 347px
    .top{
      height 55px
      line-height 55px
      border-bottom 1px solid #E9E9E9
      .warn-tab {
         padding-right: 24px;
      }
    }
    .view-more {
      float right
      padding-right 32px
      padding-top 15px
    }
    .chart-row{
      width 100%;
      padding-top 10px;
      .left-chart {
          width 50%
          padding-left 30px;
          padding-right 10px;
      }
      .right-chart {
          width 50%
          padding-right 30px
          padding-left 10px;
      }
    }

  }

</style>
