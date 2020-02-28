<template>
  <a-row class="main-datachart">
    <a-row type="flex" justify="space-between" class="top">
      <a-col :span="5" class="unit-title">{{ $t('dashboard.healthData') }}</a-col>
      <a-col :span="18" class="date-choose">
        <ul>
          <li :class="{active: active==='day'}">
            <span class="change-day" @click="changeDay('day')">{{ $t('dashboard.today') }}</span>
          </li>
          <li :class="{active: active==='week'}">
            <span class="change-day" @click="changeDay('week')">{{ $t('dashboard.week') }}</span>
          </li>
          <li :class="{active: active==='month'}">
            <span class="change-day" @click="changeDay('month')">{{ $t('dashboard.month') }}</span>
          </li>
          <li>
            <a-range-picker @change="onChange" style="width: 230px" />
          </li>
        </ul>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-between" class="chart-row">
      <heart-rate ref="heartRate" v-if="pageHomeConfParams.exeTime"></heart-rate>
      <average-step ref="averageStep" v-if="pageHomeConfParams.step"></average-step>
      <average-sleep ref="averageSleep" v-if="pageHomeConfParams.sleep"></average-sleep>
      <m-pulse ref="mpluse" v-if="pageHomeConfParams.silentHeart"></m-pulse>
    </a-row>

    <a-row type="flex" justify="space-between" class="chart-row">
      <blood-pressure ref="bloodPressure" v-if="pageHomeConfParams.bp"></blood-pressure>
      <blood-sugar ref="bloodSugar" v-if="pageHomeConfParams.bs"></blood-sugar>
    </a-row>

    <a-row class="chart-row">
      <height-weight :listData="listData" ref="weight" v-if="pageHomeConfParams.weight" @sortBodyIndex="sortBodyIndex"
      ></height-weight>
    </a-row>
  </a-row>
</template>

<script>
import HeartRate from './heartrate'
import AverageStep from './averagestep'
import AverageSleep from './averagesleep'
import MPulse from './mpulse'
import BloodPressure from './bloodpressure'
import BloodSugar from './bloodsugar'
import HeightWeight from './heightweight'


export default {
  created() {
  },
  props: {
    pageHomeConfParams: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      active: 'week',
      listData: []
    }
  },
  methods: {
    // 极限心率
    makeHeartRate(data, width) {
      if (this.pageHomeConfParams.exeTime) {
        let title = this.$t('dashboard.extremeTimeTitle');
        let xAxis = this.$t('dashboard.times');
        let yAxis = this.$t('dashboard.durationTime');
        this.$refs.heartRate.make(title, xAxis, yAxis, data, width);
      }
    },
    // 个人日平均步数
    makeAverageStep(step, stepPic, width) {
      let title = this.$t('dashboard.averageStepTitle');
      let xAxis = this.$t('dashboard.date');
      let yAxis = this.$t('dashboard.steps');
      if (this.pageHomeConfParams.step) {
        this.$refs.averageStep.make(title, xAxis, yAxis, step, stepPic, width)
      }
    },
    // 平均睡眠
    makeAverageSleep(sleep, sleepPic, width) {
      let title = this.$t('dashboard.averageScoresTitle');
      let xAxis = this.$t('dashboard.date');
      let yAxis = this.$t('dashboard.people');
      if (this.pageHomeConfParams.sleep) {
        this.$refs.averageSleep.make(title, xAxis, yAxis, sleep, sleepPic, width)
      }
    },
    // 晨脉极值
    makeMPluse(heart, heartPic, width) {
      let title = this.$t('dashboard.moriningPluseCount');
      let xAxis = this.$t('dashboard.date');
      let yAxis = this.$t('dashboard.morningPluseExtremeTitle');
      if (this.pageHomeConfParams.silentHeart) {
        this.$refs.mpluse.make(title, xAxis, yAxis, heart, heartPic, width)
      }
    },
    // 血压饼图
    makeBloodPressure(bp, width) {
      let title = this.$t('dashboard.bloodPieTitle');
      let seriesName = this.$t('dashboard.bloodPressure');
      if (this.pageHomeConfParams.bp) {
        this.$refs.bloodPressure.make(title, seriesName, bp, width)
      }
    },
    // 血糖饼图
    makeBloodSugar(bs, width) {
      let title = this.$t('dashboard.sugarPieTitle');
      let seriesName = this.$t('dashboard.bloodSugar');
      if (this.pageHomeConfParams.bs) {
        this.$refs.bloodSugar.make(title, seriesName, bs, width)
      }
    },
    // 身高体重图
    makeWeight(weight) {
      let title = this.$t('dashboard.heightWeightScatterTitle');
      let xAxis = this.$t('dashboard.weight');
      let yAxis = this.$t('dashboard.height');
      let weightData = this.$t('dashboard.weight');
      let heightData = this.$t('dashboard.height');
      let unit = {
        weight: this.$t('dashboard.weightUnit'),
        height: this.$t('dashboard.heightUnit')
      };
      if (this.pageHomeConfParams.weight) {
        // 健康指数列表默认降序排列
        weight.sort((x, y) => {
          return y.bmi - x.bmi;
        });
        this.listData = weight;
        this.$refs.weight.make(title, xAxis, yAxis, weight, weightData, heightData, unit);
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
    onChange(e, time) {
      let start = new Date(`${time[0]} 00:00:00`).getTime();
      let end = new Date(`${time[1]} 23:59:59`).getTime();
      this.$emit('changeCalendar', start, end);
      this.active = 'none'
    },
    // 身体指数排序
    sortBodyIndex(desc) {
      let data = JSON.parse(JSON.stringify(this.listData));
      if (desc) {
        data.sort((x, y) => {
          return y.bmi - x.bmi;
        })
      } else {
        data.sort((x, y) => {
          return x.bmi - y.bmi;
        })
      }
      this.listData = data;
    }
  },
  components: {
    HeartRate,
    AverageStep,
    AverageSleep,
    MPulse,
    BloodPressure,
    BloodSugar,
    HeightWeight
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/common.styl"
  ul,li{list-style:none}
  .main-datachart{
    padding-bottom 20px
    .top{
      height 55px
      line-height 55px
      border-bottom 1px solid #E9E9E9
      .date-choose{
        .active{
          color: #1890FF
        }
        ul{
          display flex
          float right
          width 450px
          li:nth-child(-n+4){
            width 50px
          }
          li:last-child{
            padding 0 20px
          }
        }
      }
    }
    .change-day{
      cursor pointer
    }
    .chart-row{
      padding 0 32px
      margin 10px 0
    }

  }

</style>
