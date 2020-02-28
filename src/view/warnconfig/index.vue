<template>
  <div class="main">
    <a-spin :spinning="spinning">
      <!--图表显示配置-->
      <a-row class="content-container">
        <a-row class="warn-title" type="flex" justify="space-between">
          <a-col>
            {{ $t('setting.dataAnalysis') }}
          </a-col>
          <a-col>
            <a-button type="primary" @click="save">{{ $t('setting.save') }}</a-button>
          </a-col>
        </a-row>
        <a-row class="chart-conf-container" type="flex" justify="space-around">
          <a-col :span="3" v-for="(item, key) in pageHomeConfParams" :key="key" class="home-conf-item">
            <a-row>
              <a-icon :component="item===1 ? picList[key] : darkPicList[key]" />
            </a-row>

            <a-row class="detail-conf">
              <a-checkbox @change="homeConfChange(key, item)"
                          :defaultChecked="item===1">
                {{homeType[key]}}
              </a-checkbox>
            </a-row>
          </a-col>
        </a-row>
      </a-row>
<!--      to-do 暂时隐藏-->
      <!--预警配置-->
<!--      <a-row class="content-container">-->
<!--        <a-row class="warn-title" type="flex" justify="space-between">-->
<!--          <a-col>-->
<!--            预警条件设置-->
<!--          </a-col>-->
<!--          <a-col>-->
<!--            <a-button type="primary" @click="save">保存</a-button>-->
<!--          </a-col>-->
<!--        </a-row>-->

<!--        <a-row class="config-content">-->
<!--          &lt;!&ndash;监控指标&ndash;&gt;-->
<!--          <a-col :span="6" class="config" v-for="(item, key) in warnSet" :key="key">-->
<!--            <a-row class="config-title" type="flex" justify="space-between">-->
<!--              <a-col>{{type[item.healthType]}}</a-col>-->
<!--              <a-col>-->
<!--                <a-switch-->
<!--                  :defaultChecked="item.status===1"-->
<!--                  @change="statusChange($event, key)"-->
<!--                  checkedChildren="开" unCheckedChildren="关"/>-->
<!--              </a-col>-->
<!--            </a-row>-->

<!--            <a-row class="config-bottom">-->
<!--              <a-row class="line">-->
<!--                <a-col :span="8">{{judge(item.healthType) ? '>=' : '<=' }}</a-col>-->
<!--                <a-col :span="16">-->
<!--                  <a-input-->
<!--                           :defaultValue="item.expression[0].value"-->
<!--                           @change="expressionChange($event, key, 'value')"-->
<!--                  >-->
<!--                  </a-input>-->
<!--                </a-col>-->
<!--              </a-row>-->

<!--              <a-row class="line">-->
<!--                <a-col :span="8">周期/天</a-col>-->
<!--                <a-col :span="16">-->
<!--                  <a-input-->
<!--                           :defaultValue="item.expression[0].period"-->
<!--                           @change="expressionChange($event, key, 'period')"-->
<!--                  >-->
<!--                  </a-input>-->
<!--                </a-col>-->
<!--              </a-row>-->

<!--              <a-row class="line">-->
<!--                <a-col :span="8">频率/次</a-col>-->
<!--                <a-col :span="16">-->
<!--                  <a-input-->
<!--                           :defaultValue="item.expression[0].frequency"-->
<!--                           @change="expressionChange($event, key, 'frequency')"-->
<!--                  >-->
<!--                  </a-input>-->
<!--                </a-col>-->
<!--              </a-row>-->
<!--            </a-row>-->

<!--          </a-col>-->
<!--        </a-row>-->

<!--      </a-row>-->

      <!--手机列表-->
      <a-row class="content-container">
        <a-row class="warn-title" type="flex" justify="space-between">
          <a-col>
            {{ $t('setting.warnMessage') }}
            <span class="text-notice">{{ $t('setting.surPlusMessage') }} (200/300)</span>
          </a-col>
          <a-col>
            <a-button type="primary" @click="save">{{ $t('setting.save') }}</a-button>
          </a-col>
        </a-row>

        <a-row class="phone-content">
          <a-row class="line" v-for="(item, key) in phoneList"
                 :key="key"
                 style="margin: 20px 0;"
          >
            <a-input style="width: 150px" :defaultValue="item.phone"
                     @change="phoneChange($event, key)"
            />
            <a-switch :defaultChecked="item.status===1"
                      @change="phoneSwitch($event, key)"
                      :checkedChildren="$t('setting.on')" :unCheckedChildren="$t('setting.off')"
            />
          </a-row>
        </a-row>
      </a-row>
    </a-spin>

  </div>
</template>

<script>
import { getWarnConf, saveWarnConf } from "../../api/warn";
import mixin from '../../common/js/mixin';
import mpluse from '../../statics/img/config/mpluse.svg'
import sleep from '../../statics/img/config/sleep.svg'
import heartRate from '../../statics/img/config/heartrate.svg'
import bp from '../../statics/img/config/bp.svg'
import bs from '../../statics/img/config/bs.svg'
import step from '../../statics/img/config/step.svg'
import weight from '../../statics/img/config/weight.svg'
import darkMpluse from '../../statics/img/config/dark-mpluse.svg'
import darkSleep from '../../statics/img/config/dark-sleep.svg'
import darkHeartRate from '../../statics/img/config/dark-heartrate.svg'
import darkBp from '../../statics/img/config/dark-bp.svg'
import darkBs from '../../statics/img/config/dark-bs.svg'
import darkStep from '../../statics/img/config/dark-step.svg'
import darkWeight from '../../statics/img/config/dark-weight.svg'

export default {
  mixins: [mixin],
  created() {
    this.fetch();
  },
  data() {
    return {
      sleep,
      picList: {
        bp,
        bs,
        exeTime: heartRate,
        silentHeart: mpluse,
        sleep,
        step,
        weight
      },
      darkPicList: {
        bp: darkBp,
        bs: darkBs,
        exeTime: darkHeartRate,
        silentHeart: darkMpluse,
        sleep: darkSleep,
        step: darkStep,
        weight: darkWeight
      },
      pageHomeConfParams: {}, // 首页配置
      phoneList: [], // 预警短信手机列表
      warnSet: [], // 预警配置
      type: {
        1: '血压',
        2: '血糖',
        3: '极限心率',
        4: '平均步数',
        5: '睡眠分数',
        6: '晨脉极值',
        7: '身高体重'
      },
      homeType: {
        bp: this.$t('setting.bloodPressure'),
        bs: this.$t('setting.bloodSugar'),
        exeTime: this.$t('setting.heartRate'),
        silentHeart: this.$t('setting.morningPulse'),
        sleep: this.$t('setting.sleep'),
        step: this.$t('setting.steps'),
        weight: this.$t('setting.heightWeight')
      },
      spinning: false,
      bigger: [1, 2, 3, 6] // 预警条件是大于的健康类型
    }
  },
  methods: {
    fetch() {
      this.spinning = true;
      getWarnConf().then(res => {
        this.pageHomeConfParams = res.pageHomeConfParams
        this.phoneList = this.dealPhoneList(res.phoneList);
        this.warnSet = this.dealWarnSet(res.warnSet);
        this.spinning = false;
      }).catch(err => {
        this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
        this.spinning = false;
      });
    },
    // 配合后端预警条件写死7条
    dealWarnSet(warnSet) {
      let defaultWarnSet = [
        {
          healthType: 1,
          status: 0,
          expression: [{
            min: 0, max: 0, value: 0, period: 0, frequency: 0
          }]
        },
        {
          healthType: 2,
          status: 0,
          expression: [{
            min: 0, max: 0, value: 0, period: 0, frequency: 0
          }]
        },
        {
          healthType: 6,
          status: 0,
          expression: [{
            min: 0, max: 0, value: 0, period: 0, frequency: 0
          }]
        },
        {
          healthType: 3,
          status: 0,
          expression: [{
            min: 0, max: 0, value: 0, period: 0, frequency: 0
          }]
        },
        {
          healthType: 5,
          status: 0,
          expression: [{
            min: 0, max: 0, value: 0, period: 0, frequency: 0
          }]
        },
        {
          healthType: 7,
          status: 0,
          expression: [{
            min: 0, max: 0, value: 0, period: 0, frequency: 0
          }]
        },
        {
          healthType: 4,
          status: 0,
          expression: [{
            min: 0, max: 0, value: 0, period: 0, frequency: 0
          }]
        }
      ];
      return defaultWarnSet.map(item => {
        let tmp = { ...item };
        warnSet.forEach(item1 => {
          if (item.healthType === item1.healthType) {
            tmp = { ...item1 }
          }
        });
        return tmp;
      });
    },
    // 配合后端短信写死2条
    dealPhoneList(phoneList) {
      while (phoneList.length < 2) {
        phoneList.push({ status: 0, phone: "" })
      }
      return phoneList;
    },
    // 首页配置变化
    homeConfChange(key, val) {
      this.pageHomeConfParams[key] = val ? 0 : 1;
    },
    // 监控开关switch变化
    statusChange(e, key) {
      this.warnSet[key].status = e ? 1 : 0;
    },
    // 配置项的input变化
    expressionChange(e, key, index) {
      this.warnSet[key].expression[0][index] = e.target.value;
    },
    // 手机号变化
    phoneChange(e, key) {
      this.phoneList[key].phone = e.target.value;
    },
    // 手机号开关
    phoneSwitch(e, key) {
      this.phoneList[key].status = e ? 1 : 0;
    },
    save() {
      let params = {
        warnSet: this.warnSet,
        phoneList: this.phoneList,
        pageHomeConfParams: this.pageHomeConfParams
      };
      saveWarnConf(params).then(res => {
        this.showNotice(`${this.$t('systemNotice.otherNotice[8]')}`);
        this.fetch();
      }).catch(err => {
        this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
      })
    },
    // 判断是大于还是小于
    judge(val) {
      return this.bigger.indexOf(val) > -1
    }
  },
  computed: {
    lang() {
      return this.$i18n.locale
    }
  },
  watch: {
    lang() {
      this.homeType = {
        bp: this.$t('setting.bloodPressure'),
        bs: this.$t('setting.bloodSugar'),
        exeTime: this.$t('setting.heartRate'),
        silentHeart: this.$t('setting.morningPulse'),
        sleep: this.$t('setting.sleep'),
        step: this.$t('setting.steps'),
        weight: this.$t('setting.heightWeight')
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/common.styl"
  .main{
    // 每个容器
    .content-container{
      background-color #fff
      border-radius 4px
    }
    .chart-conf-container{
      padding 32px

    }
    .home-conf-item{
      margin-bottom 10px
      text-align center
      .icon{
        width 32px
        height 32px
      }
      .detail-conf{
        margin-top 10px
      }
    }
    // 标题
    .warn-title{
      height 55px
      line-height 55px
      font-size 16px
      padding 0 30px
      font-weight 500
      color rgba(0,0,0,0.85)
      border-bottom 1px solid #E9E9E9
    }
    // 配置内容的容器
    .config-content{
      padding 32px
    }
    .phone-content{
      padding 32px
    }
    // 配置标题
    .config-title{
      height 55px
      line-height 55px
      background-color: #EDF9FF
      padding 0 24px
      font-size 16px
      font-family PingFangSC-Medium
      font-weight 500
      color rgba(0,0,0,0.85)
    }
    .config-bottom{
      background-color: #fbfbfb
    }
    // 短信通知
    .text-notice{
      font-size 14px
      color #1890FF
      font-weight 400
      margin-left 10px
    }
    // 每一小行
    .line{
      height 35px
      line-height 35px
      padding 0 24px
      font-size 14px
      margin 10px 0
    }
    .config{
      padding 0 10px
      margin-bottom 15px
    }

  }
</style>
