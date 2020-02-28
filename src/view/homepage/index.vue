<template>
    <div class="main">
      <a-row type="flex" class="top-row">
        <a-cascader :options="options" @change="onOrgChange"
                    :placeholder="$t('organization.chooseOrg')"
                    :defaultValue="defaultOrg"
                    class="org-select"
                    size="large"
        />
        <warn :repetWarn="repetWarn"/>
      </a-row>
      <a-row class="warn-total-title">{{ $t('dashboard.warnSummary') }}</a-row>
      <data-card v-if="indexCardData.length !== 0" :indexCardData="indexCardData" :undeal="undeal" :deal="deal" :ignore="ignore"/>

      <div class="warn-details">
        <warn-details v-if="matchIndicator.length !== 0" :matchIndicator="matchIndicator"/>
      </div>


      <div class="health-index">
        <health-index :score="score"
                      :one="level_percent_one"
                      :two="level_percent_two"
                      :three="level_percent_three"
                      :four="level_percent_four"
                      :five="level_percent_five"
                      :undeal="undeal"
                      :deal="deal"
                      :ignore="ignore"
                      :loading="topLoading"
                      ref="healthIndex"
                      @sortHealthIndex="sortHealthIndex"
        />
      </div>

      <div class="health-data">
        <a-spin :spinning="spinning" size="large">
          <data-chart ref="dataChart"
                      @changeCalendar="changeCalendar"
                      :pageHomeConfParams="pageHomeConfParams"
          />
        </a-spin>
      </div>
    </div>
</template>

<script>
import DataChart from '@/components/datachart/index'
import HealthIndex from '@/components/healthindex'
import Warn from '@/components/warn'
import mixin from '../../common/js/mixin'
import { homepageShow, homeWarn } from '../../api/homepage'
import { groupList } from '../../api/organization'
import { getWarnConf } from '../../api/warn'
import DataCard from '@/components/modals/datacard/index'
import WarnDetails from '@/view/warnDetails/index'


export default {
  mixins: [mixin],
  data() {
    return {
      topLoading: true, // 上边的loading
      pageHomeConfParams: {}, // 首页的配置
      undeal: 0, // 未处理
      deal: 0, // 已处理
      ignore: 0, // 已忽略
      repetWarn: {}, // 红色预警部分
      options: [], // 级联选择
      selectedGroupId: '', // 选中的组织机构
      defaultOrg: ['all'],
      score: [],
      level_percent_one: 0,
      level_percent_two: 0,
      level_percent_three: 0,
      level_percent_four: 0,
      level_percent_five: 0,
      start: '', // 开始日期
      end: '', // 结束日期
      spinning: false,
      interval: '',
      line1Width: '',
      line2Width: '',
      indexCardData: [],
      warnTab: {
        1: { title: 'dashboard.bloodPressure', backImg: require('../../statics/img/home/bpressure.png') },
        2: { title: 'dashboard.bloodSugar', backImg: require('../../statics/img/home/bsugar.png') },
        3: { title: 'dashboard.heartRate', backImg: require('../../statics/img/home/hrate.png') },
        4: { title: 'dashboard.steps', backImg: require('../../statics/img/home/step.png') },
        5: { title: 'dashboard.sleep', backImg: require('../../statics/img/home/sleep.png') },
        6: { title: 'dashboard.morningPulse', backImg: require('../../statics/img/home/mpluse.png') },
        7: { title: 'dashboard.body', backImg: require('../../statics/img/home/body.png') }
      },
      matchIndicator: []
    }
  },
  created() {
    // 获取哪些图表不显示
    this.getConfParams();
    // 首页健康预警实时更新
    this.interval = setInterval(() => {
      this.getWarn();
    }, 10000);
    this.getWarn();
    this.getOrg();
  },
  beforeDestroy() {
    // 页面销毁前清除定时器
    clearInterval(this.interval)
  },
  computed: {
    lang() {
      return this.$i18n.locale
    }
  },
  watch: {
    lang() {
      this.fetch();
      this.getOrg();
    }
  },
  methods: {
    // 获取首页图表配置
    getConfParams() {
      getWarnConf().then(res => {
        let conf = res.pageHomeConfParams;
        let line1 = 0;
        let line2 = 0;
        let line3 = 0;
        let a = conf.bp === 1 && ++line2;
        a = conf.bs === 1 && ++line2;
        a = conf.exeTime === 1 && ++line1;
        a = conf.silentHeart === 1 && ++line1;
        a = conf.sleep === 1 && ++line1;
        a = conf.step === 1 && ++line1;
        a = conf.weight === 1 && ++line3;
        this.line1Width = this.getWidthRate(line1);
        this.line2Width = this.getWidthRate(line2);
        this.pageHomeConfParams = res.pageHomeConfParams;
        this.fetch();
      }).catch(err => {
        this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
      })
    },
    // 获取百分比
    getWidthRate(num) {
      switch (num) {
        case 1:
          return '100%';
        case 2:
          return '48%';
        case 3:
          return '30%';
        case 4:
          return '23%';
        default:
          return '100%';
      }
    },
    // 获取预警信息
    getWarn() {
      homeWarn().then(res => {
        this.matchIndicator = [];
        this.indexCardData = [];
        this.getWarnTab(res.warnTab);
        this.indexData(res.warnTab);
        this.deal = res.deal;
        this.undeal = res.undeal;
        this.ignore = res.ignore;
        let repetWarn = res.repetWarn;
        repetWarn.headImg = repetWarn.headImg.slice(0, 3); // 最多取3张头像
        this.repetWarn = repetWarn;
      })
    },
    getWarnTab (array) {
      array.map(e => {
        this.warnTab[e.healthType].healthType = e.healthType;
        return this.matchIndicator.push(this.warnTab[e.healthType]);
      });
      return this.matchIndicator;
    },
    indexData(array) {
      array.map(e => {
        this.warnTab[e.healthType].undeal = e.undeal;
        return this.indexCardData.push(this.warnTab[e.healthType]);
      });
      return this.indexCardData;
    },
    // 初始化页面
    fetch() {
      this.spinning = true;
      let params = {};
      if (this.selectedGroupId !== '') {
        params.groupId = this.selectedGroupId;
      }
      if (this.start) {
        params.start = this.start;
      }
      if (this.end) {
        params.end = this.end;
      }
      homepageShow(params).then(res => {
        this.initHealth(res.score);
        this.initCharts(res);
        this.spinning = false;
        if (this.topLoading) {
          this.topLoading = false;
        }
      })
    },
    // 获取企业组织结构
    getOrg() {
      groupList({}).then(res => {
        const list = res.groupList;
        let options = [{
          value: 'all',
          label: this.$t('dashboard.all')
        }];
        // 列表内容
        list.forEach(item => {
          let tmp = {
            value: item.groupId,
            label: item.name === '未分配' ? this.$t('organization.unassigned') : item.name
          };
          if (item.child.length > 0) {
            tmp.children = [];
            item.child.forEach(item1 => {
              tmp.children.push({
                value: item1.groupId,
                label: item1.name
              })
            });
          }
          options.push(tmp)
        });
        this.options = options
      })
    },
    // 组织机构发生变化
    onOrgChange(val) {
      const groupId = JSON.parse(JSON.stringify(val)).pop();
      if (groupId === 'all') {
        this.selectedGroupId = '';
      } else {
        this.selectedGroupId = groupId
      }
      this.topLoading = true;
      this.fetch()
    },
    // 渲染健康指数部分
    initHealth(data) {
      let title = this.$t('dashboard.dau');
      let seriesName = this.$t('dashboard.healthIndex');
      if (data.healthScord.length !== 0) {
        let score = JSON.parse(JSON.stringify(data.healthScord));
        // 健康指数列表默认降序排列
        score.sort((x, y) => {
          return y.value - x.value;
        });
        this.score = score;
        let scorePeople = [
          { value: data.level_five, name: `0-60 ${this.$t('dashboard.scores')}` },
          { value: data.level_four, name: `60-70 ${this.$t('dashboard.scores')}` },
          { value: data.level_three, name: `70-80 ${this.$t('dashboard.scores')}` },
          { value: data.level_two, name: `80-90 ${this.$t('dashboard.scores')}` },
          { value: data.level_one, name: `90-100 ${this.$t('dashboard.scores')}` }
        ];
        let sumPeople = data.healthScord.length;
        this.level_percent_one = (data.level_one / sumPeople * 100).toFixed();
        this.level_percent_two = (data.level_two / sumPeople * 100).toFixed();
        this.level_percent_three = (data.level_three / sumPeople * 100).toFixed();
        this.level_percent_four = (data.level_four / sumPeople * 100).toFixed();
        this.level_percent_five = 100 - this.level_percent_one
          - this.level_percent_two - this.level_percent_three
          - this.level_percent_four;
        this.$refs.healthIndex.health(title, seriesName, scorePeople, sumPeople)
      } else {
        this.score = [];
        this.$refs.healthIndex.health(title, seriesName, [], 0);
      }
    },
    // 初始列表
    initCharts(res) {
      this.$refs.dataChart.makeHeartRate(res.exeTime ? res.exeTime : [], this.line1Width);
      this.$refs.dataChart.makeAverageStep(res.step ? res.step : [], res.stepPic ? res.stepPic : [], this.line1Width);
      this.$refs.dataChart.makeAverageSleep(res.sleep ? res.sleep : [], res.sleepPic ? res.sleepPic : [], this.line1Width);
      this.$refs.dataChart.makeMPluse(res.silentHeart ? res.silentHeart : [], res.heartPic ? res.heartPic : [], this.line1Width);
      this.$refs.dataChart.makeBloodPressure(res.bp ? res.bp : {}, this.line2Width);
      this.$refs.dataChart.makeBloodSugar(res.bs ? res.bs : {}, this.line2Width);
      this.$refs.dataChart.makeWeight(res.weight ? res.weight : []);
    },
    // 改变日历
    changeCalendar(start, end) {
      this.start = start;
      this.end = end;
      this.fetch();
    },
    // 健康指数排序
    sortHealthIndex(desc) {
      let score = JSON.parse(JSON.stringify(this.score));
      if (desc) {
        score.sort((x, y) => {
          return y.value - x.value;
        })
      } else {
        score.sort((x, y) => {
          return x.value - y.value;
        })
      }
      this.score = score;
    }
  },
  components: {
    DataChart,
    HealthIndex,
    Warn,
    DataCard,
    WarnDetails
  }
}
</script>

<style lang="stylus" scoped>
  .main{
    margin 24px
    .top-row{
      height 40px
      line-height 40px
      margin-bottom 24px
      z-index 100
    }
    .org-select{
      width 200px
      margin-right 32px
    }
    .health-container {
      display flex
      justify-content space-around
    }
    .health-data{
      margin-top 24px
      background-color: #fff
    }
    .warn-details {
      margin-top 24px
      background-color: #fff
    }
    .health-index {
      margin-top 24px
    }
    .warn-total-title {
      font-size 16px
      font-family PingFangSC-Medium,PingFang SC
      font-weight 500
      color rgba(0,0,0,0.85)
      line-height 24px
      padding-bottom 17px
      width 100px
    }
    .clear{
      clear both
    }
  }
</style>
