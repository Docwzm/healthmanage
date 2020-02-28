<template>
  <div class="main">
    <!--顶部个人信息-->
    <a-row class="background">
      <a-row class="top" type="flex" justify="space-between">
        <a-col :span="3">
          <img src="../../../statics/img/gold.png" alt="">
        </a-col>
        <a-col class="detail" :span="18">
          <div class="name">姓名: XXX</div>
          <div class="gender">
            <span>性别 : 男</span>
            <span>年龄 : 32岁</span>
            <span>电话 : 18616701531</span>
          </div>
        </a-col>
        <a-col :span="3" style="text-align: right">
          <a href="javascript:void(0);" @click="hideModal()">返回</a>
        </a-col>
      </a-row>
    </a-row>
    <!--中间健康指数-->
    <a-row class="middle">
      <a-row class="first"><span class="score">80</span>分健康指数</a-row>
      <a-row class="second">
        <span class="small-icon" >i</span>
        最近分析建议:需要尽快就医
      </a-row>
    </a-row>
    <!--下面图表-->
    <a-row class="bottom">
      <a-radio-group @change="handleChange" defaultValue="heartRate">
        <a-radio-button value="heartRate">心率</a-radio-button>
        <a-radio-button value="step">步数</a-radio-button>
        <a-radio-button value="sleep">睡眠</a-radio-button>
        <a-radio-button value="weight">体重</a-radio-button>
      </a-radio-group>
      <a-row >
        <a-range-picker @change="onDateChange"
                        class="date-picker"
                        :locale="rangePlaceholder"
        />
      </a-row>
      <div class="chart" id="chart">

      </div>
    </a-row>
  </div>
</template>

<script>
export default {
  mounted() {
    this.makeTable();
  },
  data() {
    return {
      rangePlaceholder: {
        lang: {
          rangePlaceholder: ["开始日期", "截止日期"] // 自定义日期选择初始文字
        }
      }
    }
  },
  methods: {
    // 隐藏弹窗
    hideModal() {
      this.$emit('hideModal');
    },
    // 图表变更
    handleChange(e) {
    },
    // 日期变更
    onDateChange() {

    },
    // 生成图表
    makeTable() {
      let myChart = this.$echarts.init(document.getElementById('chart'));
      myChart.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }]
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main{
    // 设置个顶部背景色
    .background{
      height 137px
      background:rgba(243,243,243,1);
    }
    //头部
    .top{
      margin 25px
      .detail{
        display flex
        flex-direction column
        color rgba(0,0,0,0.6)
        font-size 12px
        .name{
          height 40px
          line-height 40px
        }
        .gender{
          height 40px
          line-height 40px
          span{
            margin-right 25px
          }
        }
      }
      img{
        width 44px
        height 44px
        margin-top 15px
      }
    }
    // 中间健康指数部分
    .middle{
      margin -30px 25px
      height:113px;
      background:linear-gradient(270deg,rgba(180,221,255,1) 0%,rgba(90,179,255,1) 29%,rgba(55,144,255,1) 100%);
      border-radius:8px;
      // 第一行
      .first{
        color #fff
        font-size 16px
        margin 0 0 0 20px
        vertical-align bottom
        //那个大的分数
        .score{
          font-size 40px
          padding-right 10px
        }
      }
      // 第二行
      .second{
        height 35px
        line-height 35px
        width 430px
        margin 0 20px
        padding-left 30px
        color #4697E6
        background rgba(254,254,255,1)
        border-radius 4px
        opacity 0.88
        position relative
        // 小i
        .small-icon{
          width 15px
          height 15px
          line-height 14px
          font-size 12px
          padding-left 6px
          position absolute
          left 10px
          top 10px
          color rgba(254,254,255,1)
          border-radius 50%
          background-color #4697E6
        }
      }
    }
    // 下边图表部分
    .bottom{
      margin 60px 25px 0 25px
      // 日期选择
      .date-picker{
        width 238px
        margin 10px 0
      }
      .chart{
        height 150px
      }
    }
  }
</style>
