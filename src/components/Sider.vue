<template>
  <div style="position: fixed; min-width: 256px;">
    <a-menu
      :selectedKeys="section"
      mode="inline"
      :inlineCollapsed="collapsed"
      class="menu"
    >
      <a-menu-item key="index" @click="jumpTo('/')" class="menu-item">
        <a-icon :component="data" />
        <span>{{ $t("dashboard.name") }}</span>
      </a-menu-item>

      <a-menu-item key="healthanalysis" @click="jumpTo('/healthanalysis')" class="menu-item">
        <a-icon :component="healthAnalysis" />
        <span>{{ $t("healthanalysis.name") }}</span>
      </a-menu-item>

      <a-menu-item key="dealwarn" @click="jumpTo('/dealwarn')" class="menu-item">
        <a-icon :component="dealWarn" />
        <span>{{ $t("dealwarn.name") }}</span>
      </a-menu-item>

      <a-menu-item key="organization" @click="jumpTo('/organization')" class="menu-item">
        <a-icon :component="organization" />
        <span>{{ $t("organization.name") }}</span>
      </a-menu-item>

      <a-menu-item key="organizationmember" @click="jumpTo('/organizationmember')" class="menu-item">
        <a-icon :component="orgMember" />
        <span>{{ $t("organizationmember.name") }}</span>
      </a-menu-item>
<!--          暂时隐藏-->
<!--      <a-menu-item key="equipmentmanage" @click="jumpTo('/equipmentmanage')" class="menu-item">-->
<!--        <a-icon :component="equipment" />-->
<!--        <span>设备管理</span>-->
<!--      </a-menu-item>-->

      <a-menu-item key="warnconfig" @click="jumpTo('/warnconfig')" class="menu-item">
        <a-icon :component="warnConfig" />
        <span>{{ $t("setting.name") }}</span>
      </a-menu-item>

    </a-menu>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mixin from '../common/js/mixin'
import dealWarn from '../statics/img/sider/dealwarn.svg'
import healthAnalysis from '../statics/img/sider/healthanalysis.svg'
import data from '../statics/img/sider/data.svg'
import organization from '../statics/img/sider/organization.svg'
import orgMember from '../statics/img/sider/orgmember.svg'
import warnConfig from '../statics/img/sider/warnconfig.svg'
import equipment from '../statics/img/sider/equipment.svg'

export default {
  mixins: [mixin],
  created() {
  },
  data() {
    return {
      collapsed: false,
      dealWarn,
      healthAnalysis,
      data,
      organization,
      orgMember,
      warnConfig,
      equipment
    }
  },
  methods: {
    toggleCollapsed() {
      // 切换菜单伸缩
      this.collapsed = !this.collapsed
    }
  },
  computed: {
    ...mapGetters([
      'section'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .menu-item
    background-color: #0050B3!important // 这行覆盖了menu的默认样式
  .menu
    background-color: #0050B3
    color: #fff
    width 100%
    border-right 1px solid #0050B3
  .ant-menu-item-selected
    color: #fff
    background:linear-gradient(270deg,rgba(0,138,255,1) 0%,rgba(2,91,185,1) 41%,rgba(0,80,179,1) 100%);
  .side-children
    .side-title
      font-size 30px
</style>
